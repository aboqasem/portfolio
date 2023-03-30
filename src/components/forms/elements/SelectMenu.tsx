import { createEffect, createMemo, createSignal, createUniqueId, DEV, For } from 'solid-js';
import type { JSX } from 'solid-js/jsx-runtime';

export type SelectMenuOptions<T extends string = string> = { value: T; label: string }[];

export interface SelectMenuProps<T extends string = string> {
  id?: string;
  label: string;
  options: SelectMenuOptions<T>;
  name?: string;
  defaultValue?: T;
  value?: T;
  onChange?: (value: T) => void;
  disabled?: boolean;
}

export const SelectMenu = <T extends string = string>(props: SelectMenuProps<T>): JSX.Element => {
  const id = createMemo(() => props.id ?? createUniqueId());

  // eslint-disable-next-line solid/reactivity
  const isControlled = props.value !== undefined;
  if (DEV) {
    createEffect(() => {
      if (isControlled !== (props.value !== undefined)) {
        console.error(
          Error(
            `${SelectMenu.name} switched from ${isControlled ? 'controlled' : 'uncontrolled'} to ${
              props.value ? 'controlled' : 'uncontrolled'
            } behavior`,
          ),
        );
      }
    });
  }

  const [selectedValue, setSelectedValue] = createSignal(
    // eslint-disable-next-line solid/reactivity
    isControlled ? props.value : props.defaultValue ?? props.options[0]?.value,
  );

  const isDisabled = () => props.disabled || !props.options.length || !props.onChange;

  const handleChange = (value: T) => {
    if (!isControlled) {
      setSelectedValue(() => value);
    }
    props.onChange?.(value);
  };

  return (
    <div>
      <label for={id()} class="block text-sm font-medium text-zinc-700 dark:text-zinc-100">
        {props.label}
      </label>

      <select
        id={id()}
        name={props.name}
        disabled={isDisabled()}
        class="block w-full py-2 pl-3 pr-10 mt-1 text-base bg-white rounded-md border-zinc-300 dark:bg-black dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-zinc-100 disabled:text-zinc-600 dark:disabled:bg-zinc-900 dark:disabled:text-zinc-400 dark:disabled:border-zinc-400"
        onInput={({ currentTarget: { value } }) => {
          handleChange(value as T);
        }}
      >
        <For each={props.options}>
          {(option) => (
            <option
              value={option.value}
              selected={(isControlled ? props.value : selectedValue()) === option.value}
            >
              {option.label}
            </option>
          )}
        </For>
      </select>
    </div>
  );
};
