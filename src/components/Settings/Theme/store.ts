import type { Setter } from 'solid-js';
import { createSignal } from 'solid-js';

const THEME_KEY = 'theme';

export enum Theme {
  Light = 'Light',
  Dark = 'Dark',
  System = 'System',
}

const [theme, _setTheme] = createSignal<Theme>(storeTheme());

const setTheme: Setter<Theme> = (value) => {
  return _setTheme((prev) => storeTheme(typeof value === 'function' ? value(prev) : value));
};

export { setTheme, theme };

function storeTheme(theme?: Theme): Theme {
  if (!theme) {
    const storedTheme = localStorage.getItem(THEME_KEY);

    theme = storedTheme === Theme.Light || storedTheme === Theme.Dark ? storedTheme : Theme.System;
  }

  document.documentElement.classList[
    theme === Theme.Dark ||
    (theme === Theme.System && window.matchMedia('(prefers-color-scheme: dark)').matches)
      ? 'add'
      : 'remove'
  ]('dark');

  localStorage.setItem(THEME_KEY, theme);

  return theme;
}
