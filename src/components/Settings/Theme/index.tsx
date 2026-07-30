import type { Component } from "solid-js";
import type { SelectMenuOptions } from "@/components/forms/elements/SelectMenu";
import { SelectMenu } from "@/components/forms/elements/SelectMenu";
import { isSettingsDisabled } from "@/components/Settings";
import { setTheme, Theme, theme } from "@/components/Settings/Theme/store";

const themeOptions: SelectMenuOptions<Theme> = [
	{ id: 0, value: Theme.Light, label: "💡 Light" },
	{ id: 1, value: Theme.Dark, label: "🌙 Dark" },
	{ id: 2, value: Theme.System, label: "🖥 System" },
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
