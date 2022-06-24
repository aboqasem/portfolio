import { createSignal, Setter } from 'solid-js';

const THEME_KEY = 'theme';

export enum Theme {
  Light = 'Light',
  Dark = 'Dark',
  System = 'System',
}

export const themes = Object.values(Theme);

export const [theme, _setTheme] = createSignal<Theme>(configureTheme());

// @ts-expect-error
export const setTheme: Setter<Theme> = (value) => {
  return _setTheme((prev) => configureTheme(typeof value === 'function' ? value(prev) : value));
};

function configureTheme(theme?: Theme): Theme {
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
