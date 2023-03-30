import { RangeSlider } from '@/components/forms/elements/RangeSlider';
import { isSettingsDisabled } from '@/components/Settings';
import { dropSpeed, dropSpeedStep, maxDropSpeed, minDropSpeed, setDropSpeed } from '@/store/stage';
import type { Component } from 'solid-js';

export const StageSettings: Component = () => {
  return (
    <div class="p-2">
      <RangeSlider
        label="Drop speed"
        min={minDropSpeed}
        max={maxDropSpeed}
        step={dropSpeedStep}
        value={dropSpeed()}
        disabled={isSettingsDisabled()}
        onInput={({ currentTarget: { valueAsNumber } }) => {
          setDropSpeed(valueAsNumber);
        }}
      />
    </div>
  );
};
