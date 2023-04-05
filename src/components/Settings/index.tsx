import { ModeSettings } from '@/components/Settings/Mode';
import { Mode, mode } from '@/components/Settings/Mode/store';
import { ThemeSettings } from '@/components/Settings/Theme';
import FiSettings from '@lib/icons/fi/FiSettings';
import type { Component } from 'solid-js';
import { createEffect, createMemo, createSignal, lazy, Show, Suspense } from 'solid-js';

const GameOfLifeStageSettings = lazy(() =>
  import('@/components/Settings/GameOfLifeStage').then((m) => ({
    default: m.GameOfLifeStageSettings,
  })),
);
const DropsStageSettings = lazy(() =>
  import('@/components/Settings/DropsStage').then((m) => ({
    default: m.DropsStageSettings,
  })),
);

const SettingsElementSkeleton: Component = () => {
  return (
    <div class="p-2 animate-pulse">
      <div class="h-4 bg-zinc-300 dark:bg-zinc-700 rounded w-full" />

      <div class="mt-1 h-7 bg-zinc-300 dark:bg-zinc-700 rounded" />
    </div>
  );
};

export const [isSettingsDisabled, setIsSettingsDisabled] = createSignal(true);

const width = '12rem';

export const Settings: Component = () => {
  const [isShown, setIsShown] = createSignal(false);

  const hint = createMemo(() => `${isShown() ? 'Hide' : 'Show'} settings`);

  createEffect(() => {
    setIsSettingsDisabled(!isShown());
  });

  return (
    <div
      style={{ '--settings-width': width }}
      class={`fixed top-2 motion-safe:transition-[right] flex items-start animate-bounce-x [animation-iteration-count:2] ${
        isShown() ? 'right-0' : `-right-[--settings-width]`
      }`}
    >
      <button
        type="button"
        title={hint()}
        class="-left-12 absolute inline-flex items-center p-3 text-blue-600 bg-blue-100 border border-r-0 border-transparent group focus:ring-inset rounded-l-xl hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-zinc-100"
        onClick={() => setIsShown((show) => !show)}
      >
        <FiSettings class="w-6 h-6 group motion-safe:group-hover:animate-[spin_2s_linear_infinite]" />
        <span class="sr-only">{hint()}</span>
      </button>

      <div class="w-[--settings-width] border rounded-bl-xl divide-y dark:divide-zinc-500 bg-white dark:bg-zinc-950 dark:border-zinc-500">
        <ThemeSettings />

        <ModeSettings />

        <Show when={mode() === Mode.GameOfLife}>
          <Suspense fallback={<SettingsElementSkeleton />}>
            <GameOfLifeStageSettings />
          </Suspense>
        </Show>
        <Show when={mode() === Mode.Drops}>
          <Suspense fallback={<SettingsElementSkeleton />}>
            <DropsStageSettings />
          </Suspense>
        </Show>
      </div>
    </div>
  );
};
