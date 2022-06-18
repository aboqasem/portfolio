import { memo } from '@/utils/react/memo';

export interface RangeSliderProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label: string;
}

export const RangeSlider = memo(function RangeSlider({ label, ...props }: RangeSliderProps) {
  return (
    <div>
      <label
        htmlFor={props.id}
        className="block text-sm font-medium text-zinc-900 dark:text-zinc-100"
      >
        {label}
      </label>

      <div className="mt-1">
        <input
          type="range"
          className={`w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 accent-blue-500 ${props.className}`}
          {...props}
        ></input>
      </div>
    </div>
  );
});
