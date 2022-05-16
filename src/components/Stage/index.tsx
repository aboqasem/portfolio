import { icons } from '@/components/Stage/icons';
import { usePositions } from '@/components/Stage/positions';
import { memo } from '@/utils/react/memo';
import { useRef } from 'react';

export const Stage = memo(function Stage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const positions = usePositions(stageRef);

  return (
    <div ref={stageRef} className="relative inset-0 w-full h-full">
      {icons.map((Icon, i) => (
        <Icon
          key={i}
          className="absolute text-2xl sm:text-3xl md:text-4xl"
          style={{
            top: positions[i]!.top,
            left: positions[i]!.left,
          }}
        />
      ))}
    </div>
  );
});
