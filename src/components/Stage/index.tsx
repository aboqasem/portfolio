import { icons } from '@/components/Stage/icons';
import { useDropsInfos } from '@/components/Stage/infos';
import { memo } from '@/utils/react/memo';
import { useRef } from 'react';

export const Stage = memo(function Stage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const dropsInfos = useDropsInfos(stageRef);

  return (
    <div ref={stageRef} className="absolute inset-0 w-full h-full">
      {icons.map((icon, i) => {
        const dropInfo = dropsInfos[i]!;

        return (
          <icon.Icon
            key={i}
            title={icon.desc}
            className="absolute w-6 h-6 select-none sm:w-8 sm:h-8 xl:w-9 xl:h-9 md:text-4xl text-zinc-900"
            style={{
              top: dropInfo!.position.top,
              left: dropInfo!.position.left,
            }}
            onMouseOver={() => {
              dropInfo!.hover = true;
            }}
            onMouseOut={() => {
              dropInfo!.hover = false;
            }}
          />
        );
      })}
    </div>
  );
});
