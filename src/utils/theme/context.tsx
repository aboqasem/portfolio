import { Theme } from '@/utils/theme/configure-theme';
import { createContext, useContext } from 'react';

export type ThemeContextValue = Readonly<{
  /**
   * The current theme. `undefined` in SSR.
   */
  theme?: Theme;
  /**
   * Set the current theme to the provided one. If a theme is not provided, uses the local theme. Does nothing in SSR.
   */
  setTheme: (theme?: Theme) => void;
}>;

export const ThemeContext = createContext<ThemeContextValue>({
  theme: undefined,
  setTheme: () => {},
});

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}
