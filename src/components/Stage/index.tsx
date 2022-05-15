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

// This is needed to mark the positions as stale if the timeout got cleared before
// updating the positions (e.g. when the stage is unmounted).
let shouldUpdate = true;

function usePositions(stageRef: RefObject<HTMLDivElement>): DropPosition[] {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    // refs are always available in effects
    const stage = stageRef.current!;

    if (shouldUpdate) {
      initializePositions(stage, forceUpdate);
      shouldUpdate = false;
    }

    let timeout: any;
    const observer = new ResizeObserver(() => {
      if (timeout === undefined) {
        // ignore the first resize event that is triggered when the stage is mounted
        timeout = null;
        return;
      }

      clearTimeout(timeout);
      shouldUpdate = true;
      timeout = setTimeout(() => {
        initializePositions(stage, forceUpdate);
        shouldUpdate = false;
      }, 100);
    });
    observer.observe(stage);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `RefObject`s don't change
  }, []);

  return positions;
}

let lastStageWidth = NaN,
  lastStageHeight = NaN;

function initializePositions(stage: HTMLDivElement, cb?: () => void) {
  const { offsetWidth: stageWidth, offsetHeight: stageHeight } = stage;

  if (stageWidth === lastStageWidth && stageHeight === lastStageHeight) {
    return;
  }

  lastStageWidth = stageWidth;
  lastStageHeight = stageHeight;

  for (let i = 0; i < LENGTH; i++) {
    const drop = stage.children[i] as SVGSVGElement;

    const width = drop.clientWidth,
      height = drop.clientHeight;

    const topMax = stageHeight - height,
      leftMax = stageWidth - width;

    let top: number = NaN,
      left: number = NaN;
    do {
      top = Math.random() * topMax;
      left = Math.random() * leftMax;
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

    cb?.();
  }
}
