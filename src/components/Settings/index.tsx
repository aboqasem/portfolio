import { StageSettings } from '@/components/Settings/Stage';
import { memo } from '@/utils/react/memo';
import { useState } from 'react';
import { FiSettings } from 'react-icons/fi';

export const Settings = memo(function Settings() {
  const [isShown, setIsShown] = useState(false);

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
        <span className="sr-only">{isShown ? 'Hide' : 'Show'} settings</span>
      </button>

      <div className={`w-[10rem] border bg-stone-50 rounded-bl-xl divide-y`}>
        <StageSettings disabled={!isShown} />
      </div>
    </div>
  );
});
