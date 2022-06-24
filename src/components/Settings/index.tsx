import { StageSettings } from '@/components/Settings/Stage';
import { ThemeSettings } from '@/components/Settings/Theme';
import FiSettings from '@lib/icons/fi/FiSettings';
import { Component, createEffect, createMemo, createSignal } from 'solid-js';

export const [isSettingsDisabled, setIsSettingsDisabled] = createSignal(false);

export const Settings: Component = () => {
  const [isShown, setIsShown] = createSignal(false);

  const hint = createMemo(() => `${isShown() ? 'Hide' : 'Show'} settings`);

  createEffect(() => {
    setIsSettingsDisabled(!isShown());
  });

  return (
    <div
      class={`absolute top-0 motion-safe:transition-[right] flex items-start mt-2 ${
        isShown() ? 'right-0' : `-right-[12rem]`
      }`}
    >
      <button
        type="button"
        title={hint()}
        class="inline-flex items-center p-3 text-blue-600 bg-blue-100 border border-r-0 border-transparent group focus:ring-inset rounded-l-xl hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-zinc-100"
        onClick={() => setIsShown((show) => !show)}
      >
        <FiSettings class="w-6 h-6 group motion-safe:group-hover:animate-[spin_2s_linear_infinite]" />
        <span class="sr-only">{hint()}</span>
      </button>

      <div class="w-[12rem] border rounded-bl-xl divide-y dark:divide-zinc-500 bg-white dark:bg-black dark:border-zinc-500">
        <ThemeSettings />

        <StageSettings />
      </div>
    </div>
  );
};
