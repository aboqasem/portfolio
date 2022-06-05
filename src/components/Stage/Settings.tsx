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
  const [isShown, setIsShown] = useState(false);

  const [dropSpeed, setDropSpeed] = useState(() => {
    const storedDropSpeed = +(
      (IS_BROWSER ? localStorage.getItem('stageSettings.dropSpeed') : null) ?? NaN
    );

    if (!isNaN(storedDropSpeed)) {
      return storedDropSpeed;
    }

    const allowMotion = IS_BROWSER && !window.matchMedia('(prefers-reduced-motion)').matches;

    return allowMotion ? 1 : 0;
  });

  useEffect(() => {
    stageSettings.dropSpeed = dropSpeed;

    localStorage.setItem('stageSettings.dropSpeed', dropSpeed.toString());
  }, [dropSpeed]);

  return (
    <div
      className={`absolute top-0 transition-[right] motion-reduce:!transition-none flex items-start mt-2 ${
        isShown ? 'right-0' : `-right-[10rem]`
      }`}
    >
      <button
        type="button"
        className="p-2 border border-r-0 bg-stone-50 group group-hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-linen-800 rounded-l-xl"
        onClick={() => setIsShown((show) => !show)}
      >
        <FiSettings className="text-lg group group-hover:animate-[spin_2s_linear_infinite] group-focus:animate-[spin_2s_linear_infinite] motion-reduce:!animate-none" />
        <span className="sr-only">{isShown ? 'Hide' : 'Show'} stage settings</span>
      </button>

      <div className={`w-[10rem] p-2 border bg-stone-50 rounded-bl-xl`}>
        <RangeSlider
          id="stage-drop-speed"
          label="Drop speed"
          min={0}
          max={3}
          step={0.2}
          value={dropSpeed}
          disabled={!isShown}
          onChange={({ target: { valueAsNumber } }) => {
            setDropSpeed(valueAsNumber);
          }}
        />
      </div>
    </div>
  );
});
