import { ICONS_LENGTH } from '@/components/Stage/icons';
import { createStore } from 'solid-js/store';

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

function cloneDropsInfos(data: DropInfo[] = dropsInfos): DropInfo[] {
  return data.map((info) => ({
    hover: info.hover,
    position: {
      top: info.position.top,
      left: info.position.left,
      width: info.position.width,
      height: info.position.height,
    },
  }));
}

// This is needed to mark the positions as stale if the `ResizeObserver` timeout got cleared before
// updating the positions (i.e. when the stage is unmounted).
let shouldInitPositions: boolean;

let currentStageHeight = NaN,
  currentStageWidth = NaN;

export function startStageAnimation(stage: HTMLDivElement): () => void {
  let initPositionsTimeoutId: number | undefined;

  const initPositionsObserver = new ResizeObserver(() => {
    clearTimeout(initPositionsTimeoutId);

    shouldInitPositions = true;

    initPositionsTimeoutId = setTimeout(
      () => {
        currentStageHeight = stage.offsetHeight;
        currentStageWidth = stage.offsetWidth;
        initializePositions(stage);
        shouldInitPositions = false;
      },
      // initialize immediately in the first run
      initPositionsTimeoutId === undefined ? 0 : 100,
    ) as unknown as number;
  });
  initPositionsObserver.observe(stage);

  const animationInterval = setInterval(() => {
    const { speed: dropSpeed } = dropsSettings;

    if (shouldInitPositions || dropSpeed === 0) {
      // if an initialization is pending, or drop speed is 0, don't move the drops
      return;
    }

    const clonedDropsInfos = cloneDropsInfos();

    for (let i = 0; i < ICONS_LENGTH; i++) {
      const info = clonedDropsInfos[i]!;

      if (info.hover) {
        continue;
      }

      const { top, left, width, height } = info.position;

      let newTop = top + dropSpeed;
      if (newTop >= currentStageHeight) {
        newTop = -height;
      }

      let move = true;
      // do not move the drop if moving it would cause it to overlap with another stopped drop.
      for (let j = 0; j < ICONS_LENGTH; j++) {
        if (i === j) {
          // skip checking the same drop
          continue;
        }
        const otherInfo = clonedDropsInfos[j]!;
        if (doPositionsOverlap({ top: newTop, left, width, height }, otherInfo.position)) {
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

    setDropsInfos(clonedDropsInfos);
  });

  return () => {
    initPositionsObserver.disconnect();
    clearTimeout(initPositionsTimeoutId);
    clearInterval(animationInterval);
  };
}

let lastInitStageWidth = NaN,
  lastInitStageHeight = NaN;

function initializePositions(stage: HTMLDivElement) {
  if (currentStageWidth === lastInitStageWidth && currentStageHeight === lastInitStageHeight) {
    return;
  }

  lastInitStageWidth = currentStageWidth;
  lastInitStageHeight = currentStageHeight;

  const clonedDropsInfos = cloneDropsInfos();

  for (let i = 0; i < ICONS_LENGTH; i++) {
    const drop = stage.children[i] as SVGSVGElement;

    const width = drop.clientWidth,
      height = drop.clientHeight;

    const topMax = currentStageHeight - height,
      leftMax = currentStageWidth - width;

    let top = NaN,
      left = NaN;
    // keep initializing a random position until it does not overlap with previously initialized ones
    // eslint-disable-next-line no-constant-condition
    while (true) {
      top = Math.random() * topMax;
      left = Math.random() * leftMax;

      let overlaps = false;
      for (let j = i - 1; j >= 0; j--) {
        if (doPositionsOverlap({ top, left, width, height }, clonedDropsInfos[j]!.position)) {
          overlaps = true;
          break;
        }
      }
      if (!overlaps) {
        break;
      }
    }

    clonedDropsInfos[i]!.position = { top, left, width, height };
  }

  setDropsInfos(clonedDropsInfos);
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
