import type { Component } from "solid-js";
import type { SelectMenuOptions } from "@/components/forms/elements/SelectMenu";
import { SelectMenu } from "@/components/forms/elements/SelectMenu";
import { isSettingsDisabled } from "@/components/Settings";
import { Mode, mode, setMode } from "@/components/Settings/Mode/store";

const modeOptions: SelectMenuOptions<Mode> = [
	{ id: 0, value: Mode.GameOfLife, label: "👾 Game of Life" },
	{ id: 1, value: Mode.Drops, label: "🍃 Drops" },
];

export const ModeSettings: Component = () => {
	return (
		<div class="p-2">
			<SelectMenu
				label="Mode"
				value={mode()}
				options={modeOptions}
				onChange={setMode}
				disabled={isSettingsDisabled()}
			/>
		</div>
	);
};
