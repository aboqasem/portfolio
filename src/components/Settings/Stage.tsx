import { RangeSlider } from '@/components/forms/elements/RangeSlider';
import { isSettingsDisabled } from '@/components/Settings';
import { dropsSettings } from '@/components/Stage/store';
import { Component, createEffect, createSignal } from 'solid-js';

const [minDropSpeed, maxDropSpeed] = [0, 3];

export const StageSettings: Component = () => {
  const [dropSpeed, setDropSpeed] = createSignal(
    (() => {
      const storedDropSpeed = +(localStorage.getItem('dropSpeed') ?? NaN);
      if (!isNaN(storedDropSpeed)) {
        // set to the locally stored value if it's a number (clamped to the range)
        return Math.max(minDropSpeed, Math.min(maxDropSpeed, storedDropSpeed));
      }

      // otherwise assume it's 0 if the user prefers reduced motion, or 1 if they don't
      return window.matchMedia('(prefers-reduced-motion)').matches ? 0 : 1;
    })(),
  );

  createEffect(() => {
    const speed = dropSpeed();

    dropsSettings.speed = speed;
    localStorage.setItem('dropSpeed', speed.toString());
  });

  return (
    <div class="p-2">
      <RangeSlider
        id="stage-drop-speed"
        label="Drop speed"
        min={minDropSpeed}
        max={maxDropSpeed}
        step={0.2}
        value={dropSpeed()}
        disabled={isSettingsDisabled()}
        onInput={({ currentTarget: { valueAsNumber } }) => {
          setDropSpeed(valueAsNumber);
        }}
      />
    </div>
  );
};
