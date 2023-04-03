import type { SelectMenuOptions } from '@/components/forms/elements/SelectMenu';
import { SelectMenu } from '@/components/forms/elements/SelectMenu';
import { isSettingsDisabled } from '@/components/Settings';
import { setTheme, Theme, theme } from '@/components/Settings/Theme/store';
import type { Component } from 'solid-js';

const themeOptions: SelectMenuOptions<Theme> = [
  { value: Theme.Light, label: '💡 Light' },
  { value: Theme.Dark, label: '🌙 Dark' },
  { value: Theme.System, label: '🖥 System' },
];

export const ThemeSettings: Component = () => {
  return (
    <div class="p-2">
      <SelectMenu
        label="Theme"
        value={theme()}
        options={themeOptions}
        onChange={setTheme}
        disabled={isSettingsDisabled()}
      />
    </div>
  );
};
