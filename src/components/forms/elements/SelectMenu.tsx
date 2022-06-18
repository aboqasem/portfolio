import { IS_DEV } from '@/constants/shared';
import { memo } from '@/utils/react/memo';
import { Listbox, Transition } from '@headlessui/react';
import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HiCheck, HiSelector } from 'react-icons/hi';

export type SelectMenuOptions<T extends string = string> = {
  [value in T]?: {
    label: string;
    icon?: React.ReactNode;
  };
};

export interface SelectMenuProps<T extends string = string> {
  label: string;
  options: SelectMenuOptions<T>;
  name?: string;
  defaultValue?: T;
  value?: T | '';
  onChange?: (value: T) => void;
  disabled?: boolean;
}

export const SelectMenu = memo(function SelectMenu<T extends string = string>({
  label,
  name,
  options,
  defaultValue,
  value: controlledValue,
  onChange: onChangeProp,
  disabled,
}: SelectMenuProps<T>) {
  const isControlled = useRef(controlledValue !== undefined);

  if (IS_DEV) {
    if (isControlled.current !== (controlledValue !== undefined)) {
      console.error(
        Error(
          `${SelectMenu.name} switched from ${
            isControlled.current ? 'controlled' : 'uncontrolled'
          } to ${!!controlledValue ? 'controlled' : 'uncontrolled'} behavior`,
        ),
      );
    }
  }

  const optionsValues = useMemo(() => {
    return Object.keys(options) as T[];
  }, [options]);

  const hasOptions = !!optionsValues.length;
  disabled = disabled || !hasOptions || !onChangeProp;

  const [selectedValue, setSelectedValue] = useState(defaultValue ?? optionsValues[0]);

  const selectedOption = useMemo(() => {
    const value = isControlled.current ? controlledValue : selectedValue;

    return value ? options[value] : undefined;
  }, [controlledValue, options, selectedValue]);

  const onChange = useCallback(
    (value: T) => {
      if (!isControlled.current) {
        setSelectedValue(value);
      }
      onChangeProp?.(value);
    },
    [onChangeProp],
  );

  useEffect(() => {
    if (
      !isControlled.current &&
      optionsValues.length &&
      (!selectedValue || !optionsValues.includes(selectedValue))
    ) {
      onChange(optionsValues[0]!);
    }
  }, [options, optionsValues, onChange, selectedValue]);

  return (
    <Listbox
      name={name}
      value={isControlled.current ? controlledValue : selectedValue}
      onChange={onChange}
      disabled={disabled}
    >
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">
            {label}
          </Listbox.Label>

          <div className="relative mt-1">
            <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white border rounded-md shadow-sm cursor-default dark:bg-black border-zinc-300 focus:outline-none dark:text-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-zinc-100 disabled:text-zinc-600 dark:disabled:bg-zinc-900 dark:disabled:text-zinc-400 dark:disabled:border-zinc-400">
              <span className="flex items-center">
                {selectedOption?.icon}

                <span className="block ml-3 truncate">
                  {selectedOption?.label ?? (!disabled ? 'Select' : '​')}
                </span>
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 ml-3 pointer-events-none">
                <HiSelector className="w-5 h-5 text-zinc-400" aria-hidden />
              </span>
            </Listbox.Button>

            <Transition
              show={!disabled && open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg dark:bg-black max-h-56 ring-1 ring-black ring-opacity-5 dark:ring-zinc-300 focus:outline-none sm:text-sm">
                {optionsValues.map((value) => {
                  const option = options[value]!;

                  return (
                    <Listbox.Option
                      key={value}
                      className={({ active }) =>
                        `${
                          active ? 'text-white bg-blue-600' : 'text-zinc-900 dark:text-white'
                        } cursor-default select-none relative py-2 pl-3 pr-9`
                      }
                      value={value}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            {option.icon}

                            <span
                              className={`${
                                selected ? 'font-semibold' : 'font-normal'
                              } ml-3 block truncate`}
                            >
                              {option.label}
                            </span>
                          </div>

                          {selected ? (
                            <span
                              className={`${
                                active ? 'text-white' : 'text-blue-600'
                              } absolute inset-y-0 right-0 flex items-center pr-4`}
                            >
                              <HiCheck className="w-5 h-5" aria-hidden />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  );
                })}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
});
