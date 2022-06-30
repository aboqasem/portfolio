import { ICONS_LENGTH } from '@/components/Stage/icons';
import { createStore, produce } from 'solid-js/store';

type DropPosition = { top: number; left: number; width: number; height: number };

type DropInfo = {
  position: DropPosition;
  hover: boolean;
};

export const dropsSettings = {
  speed: 0,
};

export const [dropsInfos, setDropsInfos] = createStore<DropInfo[]>(
  new Array(ICONS_LENGTH).fill(null).map(() => ({
    position: {
      // We want to hide the icons until they are given random positions. But to access
      // `clientWidth` and `clientHeight` we have to place the element in the DOM.
      // So we place the element in the DOM but out of the viewport.
      top: Number.MIN_SAFE_INTEGER,
      left: 0,
      width: 0,
      height: 0,
    },
    hover: false,
  })),
);

// This is needed to mark the positions as stale if the `ResizeObserver` timeout got cleared before
// updating the positions (i.e. when the stage is unmounted).
let shouldUpdate = true;

export function startStageAnimation(stage: HTMLDivElement): () => void {
  if (shouldUpdate) {
    initializePositions(stage);
    shouldUpdate = false;
  }

  let updateTimeout: any;
  const observer = new ResizeObserver(() => {
    if (updateTimeout === undefined) {
      // ignore the first resize event that is triggered when the stage is mounted
      updateTimeout = null;
      return;
    }

    clearTimeout(updateTimeout);
    shouldUpdate = true;
    updateTimeout = setTimeout(() => {
      initializePositions(stage);
      shouldUpdate = false;
    }, 100);
  });
  observer.observe(stage);

  const animationInterval = setInterval(() => {
    if (shouldUpdate || dropsSettings.speed === 0) {
      // if an update is pending, or drop speed is 0, don't move the drops
      return;
    }

    setDropsInfos(
      produce((dropsInfos) => {
        for (let i = 0; i < ICONS_LENGTH; i++) {
          const info = dropsInfos[i]!;

          if (info.hover) {
            continue;
          }

          let newTop = info.position.top + dropsSettings.speed;
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
            const otherInfo = dropsInfos[j]!;
            if (doPositionsOverlap({ ...info.position, top: newTop }, otherInfo.position)) {
              // the drop is going to overlap with another drop{
              move = false;
              break;
            }
          }
          if (!move) {
            continue;
          }

          info!.position.top = newTop;
        }
      }),
    );
  }, 15);

  return () => {
    observer.disconnect();
    clearTimeout(updateTimeout);
    clearInterval(animationInterval);
  };
}

let lastStageWidth = NaN,
  lastStageHeight = NaN;

function initializePositions(stage: HTMLDivElement) {
  const { offsetWidth: stageWidth, offsetHeight: stageHeight } = stage;

  if (stageWidth === lastStageWidth && stageHeight === lastStageHeight) {
    return;
  }

  lastStageWidth = stageWidth;
  lastStageHeight = stageHeight;

  setDropsInfos(
    produce((dropsInfos) => {
      for (let i = 0; i < ICONS_LENGTH; i++) {
        const drop = stage.children[i] as SVGSVGElement;

        const width = drop.clientWidth,
          height = drop.clientHeight;

        const topMax = stageHeight - height,
          leftMax = stageWidth - width;

        let top = NaN,
          left = NaN;
        // keep initializing a random position until it does not overlap with previously initialized ones
        // eslint-disable-next-line no-constant-condition
        while (true) {
          top = Math.random() * topMax;
          left = Math.random() * leftMax;

          let overlaps = false;
          for (let j = i - 1; j >= 0; j--) {
            if (doPositionsOverlap({ top, left, width, height }, dropsInfos[j]!.position)) {
              overlaps = true;
              break;
            }
          }
          if (!overlaps) {
            break;
          }
        }

        dropsInfos[i]!.position = { top, left, width, height };
      }
    }),
  );
}

function doPositionsOverlap(a: DropPosition, b: DropPosition): boolean {
  return !(
    // prettier-ignore
    // the drop is before the other drop
    a.left + a.width < b.left ||
    // the drop is after the other drop
    a.left > b.left + b.width ||
    // the drop is above the other drop
    a.top + a.height < b.top ||
    // the drop is below the other drop
    a.top > b.top + b.height
  );
}
