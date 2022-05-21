import { RangeSlider } from '@/components/forms/elements/RangeSlider';
import { IS_BROWSER } from '@/constants/shared';
import { memo } from '@/utils/react/memo';
import { useEffect, useState } from 'react';
import { FiSettings } from 'react-icons/fi';

export const stageSettings = {
  dropSpeed: -0,
};

export interface StageSettingsProps {}

export const StageSettings = memo(function StageSettings(_: StageSettingsProps) {
  const [show, setShow] = useState(true);

  const [dropSpeed, setDropSpeed] = useState(() => {
    const allowMotion = IS_BROWSER && !window.matchMedia('(prefers-reduced-motion)').matches;

    return allowMotion ? 1 : 0;
  });

  useEffect(() => {
    stageSettings.dropSpeed = dropSpeed;
  }, [dropSpeed]);

  return (
    <div className="absolute top-0 right-0 flex items-start mt-2">
      <button
        type="button"
        className="p-2 bg-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-dallas rounded-l-xl"
        onClick={() => setShow((show) => !show)}
      >
        <FiSettings className="text-lg" />
        <span className="sr-only">Stage Settings</span>
      </button>

      {show && (
        <div className="p-2 bg-white rounded-bl-xl">
          <RangeSlider
            id="stage-drop-speed"
            label="Drop speed"
            min={0}
            max={3}
            step={0.2}
            value={dropSpeed}
            onChange={({ target: { valueAsNumber } }) => {
              setDropSpeed(valueAsNumber);
            }}
          />
        </div>
      )}
    </div>
  );
});
