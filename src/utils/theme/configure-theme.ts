import { IS_BROWSER } from '@/constants/shared';

const THEME_KEY = 'theme';

export enum Theme {
  Light = 'Light',
  Dark = 'Dark',
  System = 'System',
}

export const themes = Object.values(Theme);

/**
 * @returns Local theme. `undefined` in SSR.
 */
export function getCurrentTheme(): Theme | undefined {
  if (!IS_BROWSER) {
    return;
  }

  const storedTheme = localStorage.getItem(THEME_KEY);

  if (storedTheme && (storedTheme === Theme.Dark || storedTheme === Theme.Light)) {
    return storedTheme;
  }

  return Theme.System;
}

/**
 * Configures the current theme to the provided one. Does nothing in SSR.
 *
 * @param theme @default getCurrentTheme()
 * @returns The configured theme. `undefined` in SSR.
 */
export function configureTheme(theme = getCurrentTheme()): Theme | undefined {
  if (!IS_BROWSER) {
    return;
  }

  if (theme === Theme.System) {
    localStorage.removeItem(THEME_KEY);
  } else {
    localStorage.setItem(THEME_KEY, theme!);
  }

  if (
    theme === Theme.Dark ||
    (theme === Theme.System && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  return theme;
}
