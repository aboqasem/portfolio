import { ICONS_LENGTH } from '@/components/Stage/icons';
import { stageSettings } from '@/components/Stage/Settings';
import { RefObject, useEffect, useReducer } from 'react';

type DropPosition = { top: number; left: number; width: number; height: number };

type DropInfo = {
  position: DropPosition;
  hover: boolean;
};

const infos: DropInfo[] = new Array(ICONS_LENGTH).fill(null).map(() => ({
  position: {
    // We want to hide the icons until they are given random positions. But to access
    // `clientWidth` and `clientHeight` we have to place the element in the DOM.
    // So we place the element in the DOM but out of the viewport.
    //
    // Also, `top` can be set to negative and decimal numbers. That is why we should initialize with `Double`
    // instead of `Smi` values for better performance: (https://v8.dev/blog/react-cliff)
    top: Number.MIN_SAFE_INTEGER,
    // `left` can be a decimal number.
    left: -0,
    // `width` and `height` are typically `Smi`.
    width: 0,
    height: 0,
  },
  hover: false,
}));

// This is needed to mark the positions as stale if the `ResizeObserver` timeout got cleared before
// updating the positions (i.e. when the stage is unmounted).
let shouldUpdate = true;

export function useInfos(stageRef: RefObject<HTMLDivElement>): DropInfo[] {
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

    const animationInterval = setInterval(() => {
      if (shouldUpdate || stageSettings.dropSpeed === 0) {
        // if an update is pending, or drop speed is 0, don't move the drops
        return;
      }

      for (let i = 0; i < ICONS_LENGTH; i++) {
        const info = infos[i]!;

        if (info.hover) {
          continue;
        }

        let newTop = info.position.top + stageSettings.dropSpeed;
        if (newTop >= stage.offsetHeight) {
          newTop = -info.position.height;
        }

        let move = true;
        // do not move the drop if moving it would cause it to overlap with another stopped drop.
        for (let j = 0; j < ICONS_LENGTH; j++) {
          if (i === j) {
            // skip checking the same drop
            continue;
          }
          const otherInfo = infos[j]!;
          if (doPositionsOverlap({ ...info.position, top: newTop }, otherInfo.position)) {
            // the drop is going to overlap with another drop{
            move = false;
            break;
          }
        }
        if (!move) {
          continue;
        }

        info.position.top = newTop;
      }
      forceUpdate();
    }, 15);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
      clearInterval(animationInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `RefObject`s don't change
  }, []);

  return infos;
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

  for (let i = 0; i < ICONS_LENGTH; i++) {
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
      infos.some((other) => doPositionsOverlap({ top, left, width, height }, other.position))
    );

    infos[i]!.position = { top, left, width, height };
  }

  cb?.();
}

function doPositionsOverlap(a: DropPosition, b: DropPosition): boolean {
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
}
