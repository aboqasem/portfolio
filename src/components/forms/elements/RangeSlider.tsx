import type { Component } from 'solid-js';
import { createMemo, createUniqueId } from 'solid-js';
import type { JSX } from 'solid-js/jsx-runtime';

export type RangeSliderProps = JSX.IntrinsicElements['input'] & {
  label: string;
};

export const RangeSlider: Component<RangeSliderProps> = (props) => {
  const id = createMemo(() => props.id ?? createUniqueId());
  return (
    <div>
      <label for={id()} class="block text-sm font-medium text-zinc-900 dark:text-zinc-100">
        {props.label}
      </label>

      <div class="mt-1">
        <input
          type="range"
          class={`w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 accent-blue-500 ${props.class}`}
          {...props}
          id={id()}
        />
      </div>
    </div>
  );
};
