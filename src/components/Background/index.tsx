import { Settings } from '@/components/Settings';
import { Stage } from '@/components/Stage';
import { Component } from 'solid-js';

export const Background: Component = () => {
  return (
    <div class="fixed inset-0 z-0 w-screen h-screen">
      <Stage />

      <Settings />
    </div>
  );
};
