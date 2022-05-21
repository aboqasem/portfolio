import { icons } from '@/components/Stage/icons';
import { useInfos } from '@/components/Stage/infos';
import { memo } from '@/utils/react/memo';
import { useRef } from 'react';

export const Stage = memo(function Stage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const infos = useInfos(stageRef);

  return (
    <div ref={stageRef} className="absolute inset-0 w-full h-full">
      {icons.map((icon, i) => (
        <icon.Icon
          key={i}
          title={icon.desc}
          className="absolute text-2xl select-none sm:text-3xl md:text-4xl"
          style={{
            top: infos[i]!.position.top,
            left: infos[i]!.position.left,
          }}
          onMouseOver={() => {
            infos[i]!.hover = true;
          }}
          onMouseOut={() => {
            infos[i]!.hover = false;
          }}
        />
      ))}
    </div>
  );
});
