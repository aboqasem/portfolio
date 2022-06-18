import { IS_BROWSER } from '@/constants/shared';
import { configureTheme, Theme } from '@/utils/theme/configure-theme';
import { ThemeContext, ThemeContextValue } from '@/utils/theme/context';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';

interface ThemeProviderProps {
  children: React.ReactNode | ((value: ThemeContextValue) => React.ReactNode);
}

export const ThemeProvider = memo(function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, _setTheme] = useState<Theme | undefined>();

  const setTheme: (newTheme?: React.SetStateAction<Theme | undefined>) => void = useCallback(
    (newTheme) => {
      _setTheme((currTheme) =>
        configureTheme(typeof newTheme === 'function' ? newTheme(currTheme) : newTheme),
      );
    },
    [],
  );

  const contextValue = useMemo(() => ({ theme, setTheme } as const), [theme, setTheme]);

  useEffect(() => {
    const prefersDarkQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleQueryChange = function () {
      setTheme();
    };

    handleQueryChange();

    prefersDarkQuery.addEventListener('change', handleQueryChange);
    return () => {
      prefersDarkQuery.removeEventListener('change', handleQueryChange);
    };
  }, [setTheme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {typeof children === 'function' ? children(contextValue) : children}
    </ThemeContext.Provider>
  );
});
