import { icons } from '@/components/Stage/icons';
import { memo } from '@/utils/react/memo';
import { useEffect, useRef } from 'react';

export const Stage = memo(function Stage() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const { offsetWidth: stageWidth, offsetHeight: stageHeight } = stage;

    const positions: [top: number, left: number, width: number, height: number][] = new Array(
      icons.length,
    );

    for (let i = 0, len = stage.children.length; i < len; i++) {
      const drop = stage.children[i] as SVGSVGElement;

      const width = drop.clientWidth,
        height = drop.clientHeight;

      let top: number, left: number;
      do {
        top = Math.random() * (stageHeight - height);
        left = Math.random() * (stageWidth - width);
      } while (
        // check if the drop overlaps with any previous drop
        positions.some(([t, l, w, h]) => {
          if (left + width < l || left > l + w) {
            // if the drop is before or after the previous drop on the x axis
            return false;
          }
          if (top + height < t || top > t + h) {
            // if the drop is above or below the previous drop on the y axis
            return false;
          }
          // else they overlap
          return true;
        })
      );
      positions[i] = [top, left, width, height];

      drop.style.top = `${top}px`;
      drop.style.left = `${left}px`;
    }
  }, []);

  return (
    <div ref={stageRef} className="relative inset-0 w-full h-full">
      {icons.map((Icon, idx) => (
        <Icon
          key={idx}
          // We want to hide the icons until they are given random positions. But to access
          // `clientWidth` and `clientHeight` we have to place the element in the DOM.
          // So we place the element in the DOM but out of the viewport using -top-[current height]
          className="absolute -top-6 text-2xl sm:-top-[1.875rem] sm:text-3xl md:-top-9 md:text-4xl"
        />
      ))}
    </div>
  );
});
