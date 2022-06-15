import { StageSettings } from '@/components/Settings/Stage';
import { memo } from '@/utils/react/memo';
import { useState } from 'react';
import { FiSettings } from 'react-icons/fi';

export const Settings = memo(function Settings() {
  const [isShown, setIsShown] = useState(false);

  const hint = `${isShown ? 'Hide' : 'Show'} settings`;

  return (
    <div
      className={`absolute top-0 motion-safe:transition-[right] flex items-start mt-2 ${
        isShown ? 'right-0' : `-right-[12rem]`
      }`}
    >
      <button
        type="button"
        title={hint}
        className="inline-flex items-center p-3 text-blue-600 bg-blue-100 border border-r-0 border-transparent group focus:ring-inset rounded-l-xl hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => setIsShown((show) => !show)}
      >
        <FiSettings className="w-6 h-6 group motion-safe:group-hover:animate-[spin_2s_linear_infinite]" />
        <span className="sr-only">{hint}</span>
      </button>

      <div className="w-[12rem] border rounded-bl-xl divide-y bg-white">
        <StageSettings disabled={!isShown} />
      </div>
    </div>
  );
});
