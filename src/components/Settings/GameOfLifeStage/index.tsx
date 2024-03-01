import { isSettingsDisabled } from "@/components/Settings";
import {
	cellsTickSpeed,
	maxTickSpeed,
	minTickSpeed,
	setCellsTickSpeed,
	tickSpeedStep,
} from "@/components/Settings/GameOfLifeStage/store";
import { RangeSlider } from "@/components/forms/elements/RangeSlider";
import type { Component } from "solid-js";

export const GameOfLifeStageSettings: Component = () => {
	return (
		<div class="p-2">
			<RangeSlider
				label="Tick speed"
				min={minTickSpeed}
				max={maxTickSpeed}
				step={tickSpeedStep}
				value={cellsTickSpeed()}
				disabled={isSettingsDisabled()}
				onInput={({ currentTarget: { valueAsNumber } }) => {
					setCellsTickSpeed(valueAsNumber);
				}}
			/>
		</div>
	);
};
