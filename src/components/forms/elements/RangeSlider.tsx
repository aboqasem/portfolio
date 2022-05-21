import { memo } from '@/utils/react/memo';

export interface RangeSliderProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label: string;
}

export const RangeSlider = memo(function RangeSlider({ label, ...props }: RangeSliderProps) {
  return (
    <div>
      <label htmlFor={props.id} className="block text-sm font-medium text-gray-900">
        {label}
      </label>

      <div className="mt-1">
        <input
          type="range"
          className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-dallas accent-dallas ${props.className}`}
          {...props}
        ></input>
      </div>
    </div>
  );
});
