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

const positionsOverlap = (a: DropPosition, b: DropPosition): boolean => {
  const doNotOverlap =
    // the the drop is before the other drop
    a.left + a.width < b.left ||
    // or the drop is after the other drop
    a.left > b.left + b.width ||
    // or drop is above the other drop
    a.top + a.height < b.top ||
    // or the drop is below the other drop
    a.top > b.top + b.height;

  return !doNotOverlap;
};

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

const prefersReducedMotionMedia =
  typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion)') : null;
let prefersReducedMotion = !!prefersReducedMotionMedia?.matches;
prefersReducedMotionMedia?.addEventListener('change', (e) => {
  prefersReducedMotion = e.matches;
});

let mouseX = NaN,
  mouseY = NaN;

const onMouseMove = (e: MouseEvent) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
};
const onMouseLeave = () => {
  mouseX = NaN;
  mouseY = NaN;
};

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

    const interval = setInterval(() => {
      if (prefersReducedMotion || shouldUpdate) {
        return;
      }

      for (let i = 0; i < LENGTH; i++) {
        const position = positions[i]!;

        // do not move the drop if the mouse is hovering over it
        if (
          mouseX >= position.left &&
          mouseX <= position.left + position.width &&
          mouseY >= position.top &&
          mouseY <= position.top + position.height
        ) {
          continue;
        }

        let newTop = position.top + 1;
        if (newTop >= stage.offsetHeight) {
          newTop = -position.height;
        }

        let move = true;
        // do not move the drop if moving it would cause it to overlap with another stopped drop
        for (let j = 0; j < LENGTH; j++) {
          if (i === j) {
            // skip the drop that is being moved
            continue;
          }
          const movedPosition = positions[j]!;
          if (positionsOverlap({ ...position, top: newTop }, movedPosition)) {
            // the drop is going to overlap with another drop{
            move = false;
            break;
          }
        }
        if (!move) {
          continue;
        }

        position.top = newTop;
      }
      forceUpdate();
    }, 15);

    stage.addEventListener('mousemove', onMouseMove);
    stage.addEventListener('mouseleave', onMouseLeave);

    return () => {
      stage.removeEventListener('mouseleave', onMouseLeave);
      onMouseLeave();
      stage.removeEventListener('mousemove', onMouseMove);
      observer.disconnect();
      clearTimeout(timeout);
      clearInterval(interval);
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
      // any of the drops is overlapping with another drop
      positions.some((other) => positionsOverlap({ top, left, width, height }, other))
    );

    positions[i]!.width = width;
    positions[i]!.height = height;
    positions[i]!.top = top;
    positions[i]!.left = left;

    cb?.();
  }
}
