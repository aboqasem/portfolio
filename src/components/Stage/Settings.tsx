import { RangeSlider } from '@/components/forms/elements/RangeSlider';
import { IS_BROWSER } from '@/constants/shared';
import { memo } from '@/utils/react/memo';
import { useEffect, useState } from 'react';
import { FiSettings } from 'react-icons/fi';

export const stageSettings = {
  dropSpeed: -0,
};

const [minDropSpeed, maxDropSpeed] = [0, 3];

export const StageSettings = memo(function StageSettings() {
  const [isShown, setIsShown] = useState(false);

  const [dropSpeed, setDropSpeed] = useState(() => {
    if (!IS_BROWSER) {
      // set to 0 in SSR
      return 0;
    }

    const storedDropSpeed = +(localStorage.getItem('stageSettings.dropSpeed') ?? NaN);

    if (!isNaN(storedDropSpeed)) {
      // set to the locally stored value if it's a number (clamped to the range)
      return Math.max(minDropSpeed, Math.min(maxDropSpeed, storedDropSpeed));
    }

    // otherwise assume it's 0 if the user prefers reduced motion, or 1 if they don't
    return window.matchMedia('(prefers-reduced-motion)').matches ? 0 : 1;
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
          min={minDropSpeed}
          max={maxDropSpeed}
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
