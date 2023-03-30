import { Background } from '@/components/Background';
import { Home } from '@/pages';
import type { Component } from 'solid-js';

export const App: Component = () => {
  return (
    <>
      <Background />

      <Home />
    </>
  );
};
