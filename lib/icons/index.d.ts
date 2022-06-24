import { Component, JSX } from 'solid-js';

export type Icon = Component<
  JSX.IntrinsicElements['svg'] & {
    title?: string;
  }
>;
