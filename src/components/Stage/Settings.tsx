import { RangeSlider } from '@/components/forms/elements/RangeSlider';
import { IS_BROWSER } from '@/constants/shared';
import { memo } from '@/utils/react/memo';
import { useEffect, useState } from 'react';

export const stageSettings = {
  dropSpeed: -0,
};

export interface StageSettingsProps {}

export const StageSettings = memo(function StageSettings(_: StageSettingsProps) {
  const [dropSpeed, setDropSpeed] = useState(() => {
    const allowMotion = IS_BROWSER && !window.matchMedia('(prefers-reduced-motion)').matches;

    return allowMotion ? 1 : 0;
  });

  useEffect(() => {
    stageSettings.dropSpeed = dropSpeed;
  }, [dropSpeed]);

  return (
    <div className="absolute top-0 right-0 p-2 mt-2 bg-white shadow-md rounded-tl-xl rounded-bl-xl">
      <RangeSlider
        id="stage-drop-speed"
        label="Speed"
        min={0}
        max={3}
        step={0.2}
        value={dropSpeed}
        onChange={({ target: { valueAsNumber } }) => {
          setDropSpeed(valueAsNumber);
        }}
      />
    </div>
  );
});
