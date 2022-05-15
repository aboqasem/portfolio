import { icons } from '@/components/Stage/icons';
import { memo } from '@/utils/react/memo';
import { RefObject, useEffect, useReducer, useRef } from 'react';

type DropPosition = { top: number; left: number; width: number; height: number };

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

const LENGTH = icons.length;

const positions: DropPosition[] = new Array(LENGTH).fill(null).map(() => ({
  // We want to hide the icons until they are given random positions. But to access
  // `clientWidth` and `clientHeight` we have to place the element in the DOM.
  // So we place the element in the DOM but out of the viewport.
  top: Number.MIN_SAFE_INTEGER,
  // `-0` is to force `Double` representation (https://v8.dev/blog/react-cliff)
  left: -0,
  width: -0,
  height: -0,
}));

function usePositions(stageRef: RefObject<HTMLDivElement>): DropPosition[] {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    // refs are always available in effects
    const stage = stageRef.current!;

    initializePositions(stage);
    forceUpdate();
  }, [stageRef]);

  return positions;
}

function initializePositions(stage: HTMLDivElement) {
  const { offsetWidth: stageWidth, offsetHeight: stageHeight } = stage;

  for (let i = 0; i < LENGTH; i++) {
    const drop = stage.children[i] as SVGSVGElement;

    const width = drop.clientWidth,
      height = drop.clientHeight;

    let top: number = NaN,
      left: number = NaN;
    do {
      top = Math.random() * (stageHeight - height);
      left = Math.random() * (stageWidth - width);
    } while (
      // every other drop should be placed in a different position
      !positions.every((other) => {
        return (
          // the drop is above the other drop
          top + height < other.top ||
          // or the drop is below the other drop
          top > other.top + other.height ||
          // or the drop is before the other drop
          left + width < other.left ||
          // or the drop is after the other drop
          left > other.left + other.width
        );
      })
    );

    positions[i]!.width = width;
    positions[i]!.height = height;
    positions[i]!.top = top;
    positions[i]!.left = left;
  }
}
