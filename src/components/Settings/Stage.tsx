import { RangeSlider } from '@/components/forms/elements/RangeSlider';
import { dropsSettings } from '@/components/Stage/infos';
import { IS_BROWSER } from '@/constants/shared';
import { memo } from '@/utils/react/memo';
import { useEffect, useState } from 'react';

const [minDropSpeed, maxDropSpeed] = [0, 3];

export interface StageSettingsProps {
  disabled?: boolean;
}

export const StageSettings = memo(function StageSettings({ disabled }: StageSettingsProps) {
  const [dropSpeed, setDropSpeed] = useState(() => {
    if (!IS_BROWSER) {
      // set to 0 in SSR
      return 0;
    }

    const storedDropSpeed = +(localStorage.getItem('dropSpeed') ?? NaN);

    if (!isNaN(storedDropSpeed)) {
      // set to the locally stored value if it's a number (clamped to the range)
      return Math.max(minDropSpeed, Math.min(maxDropSpeed, storedDropSpeed));
    }

    // otherwise assume it's 0 if the user prefers reduced motion, or 1 if they don't
    return window.matchMedia('(prefers-reduced-motion)').matches ? 0 : 1;
  });

  useEffect(() => {
    dropsSettings.speed = dropSpeed;

    localStorage.setItem('dropSpeed', dropSpeed.toString());
  }, [dropSpeed]);

  return (
    <div className="p-2">
      <RangeSlider
        id="stage-drop-speed"
        label="Drop speed"
        min={minDropSpeed}
        max={maxDropSpeed}
        step={0.2}
        value={dropSpeed}
        disabled={disabled}
        onChange={({ target: { valueAsNumber } }) => {
          setDropSpeed(valueAsNumber);
        }}
      />
    </div>
  );
});
