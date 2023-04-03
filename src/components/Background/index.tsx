import { Settings } from '@/components/Settings';
import { DropsStage } from '@/components/stages/DropsStage';
import type { Component } from 'solid-js';

export const Background: Component = () => {
  return (
    <div class="fixed inset-0 z-0 w-screen h-screen">
      <DropsStage />

      <Settings />
    </div>
  );
};
