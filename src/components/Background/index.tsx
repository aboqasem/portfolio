import { Mode, mode } from '@/components/Settings/Mode/store';
import type { Component } from 'solid-js';
import { lazy, Show } from 'solid-js';

const GameOfLifeStage = lazy(() =>
  import('@/components/stages/GameOfLifeStage').then((m) => ({ default: m.GameOfLifeStage })),
);
const DropsStage = lazy(() =>
  import('@/components/stages/DropsStage').then((m) => ({ default: m.DropsStage })),
);

export const Background: Component = () => {
  return (
    <div class="fixed inset-0 z-0 h-screen w-screen">
      <Show when={mode() === Mode.GameOfLife}>
        <GameOfLifeStage />
      </Show>
      <Show when={mode() === Mode.Drops}>
        <DropsStage />
      </Show>
    </div>
  );
};
