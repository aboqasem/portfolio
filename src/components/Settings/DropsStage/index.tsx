import type { Component } from "solid-js";
import { RangeSlider } from "@/components/forms/elements/RangeSlider";
import { isSettingsDisabled } from "@/components/Settings";
import {
	dropsSpeed,
	dropsSpeedStep,
	maxDropsSpeed,
	minDropsSpeed,
	setDropsSpeed,
} from "@/components/Settings/DropsStage/store";

export const DropsStageSettings: Component = () => {
	return (
		<div class="p-2">
			<RangeSlider
				label="Drops speed"
				min={minDropsSpeed}
				max={maxDropsSpeed}
				step={dropsSpeedStep}
				value={dropsSpeed()}
				disabled={isSettingsDisabled()}
				onInput={({ currentTarget: { valueAsNumber } }) => {
					setDropsSpeed(valueAsNumber);
				}}
			/>
		</div>
	);
};
