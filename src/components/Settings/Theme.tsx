import { SelectMenu, SelectMenuOptions } from '@/components/forms/elements/SelectMenu';
import { memo } from '@/utils/react/memo';
import { Theme } from '@/utils/theme/configure-theme';
import { useTheme } from '@/utils/theme/context';
import { useEffect, useState } from 'react';
import { MdDarkMode, MdDesktopMac, MdLightMode } from 'react-icons/md';

export interface ThemeSettingsProps {
  disabled?: boolean;
}

const themeOptions: SelectMenuOptions<Theme> = {
  [Theme.Light]: {
    label: Theme.Light,
    icon: <MdLightMode aria-hidden />,
  },
  [Theme.Dark]: {
    label: Theme.Dark,
    icon: <MdDarkMode aria-hidden />,
  },
  [Theme.System]: {
    label: Theme.System,
    icon: <MdDesktopMac aria-hidden />,
  },
};

export const ThemeSettings = memo(function ThemeSettings({ disabled }: ThemeSettingsProps) {
  const { theme, setTheme } = useTheme();

  return (
    <div className="p-2">
      <SelectMenu
        label="Theme"
        value={theme ?? ''}
        options={themeOptions}
        onChange={setTheme}
        disabled={!theme || disabled}
      />
    </div>
  );
});
