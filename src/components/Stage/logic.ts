import { ICONS_LENGTH } from '@/components/Stage/icons';
import type { DropPosition } from '@/store/stage';
import { dropsInfos, dropSpeed, setDropsInfos } from '@/store/stage';
import { createEffect } from 'solid-js';

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
        requestAnimationFrame(() => {
          currentStageHeight = stage.offsetHeight;
          currentStageWidth = stage.offsetWidth;
          initializePositions(stage);
          shouldInitPositions = false;
        });
      },
      // initialize immediately in the first run
      initPositionsTimeoutId === undefined ? 0 : 100,
    ) as unknown as number;
  });
  initPositionsObserver.observe(stage);

  let shouldAnimate = true;

  let animationFrameId = requestAnimationFrame(start);

  function start() {
    updatePositions();
    if (shouldAnimate) {
      animationFrameId = requestAnimationFrame(start);
    }
  }

  return () => {
    cancelAnimationFrame(animationFrameId);
    initPositionsObserver.disconnect();
    clearTimeout(initPositionsTimeoutId);
    shouldAnimate = false;
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
    const drop = stage.children[i] as HTMLDivElement;

    const width = drop.offsetWidth,
      height = drop.offsetHeight;

    const topMax = currentStageHeight - height,
      leftMax = currentStageWidth - width;

    let top = NaN,
      left = NaN,
      retries = 500;

    // keep initializing a random position until it does not overlap with previously initialized ones
    while (--retries >= 0) {
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

let _dropSpeedRef = dropSpeed();

createEffect(() => {
  _dropSpeedRef = dropSpeed();
});

function updatePositions() {
  const dropSpeed = _dropSpeedRef;

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

    const top = info.position.top,
      left = info.position.left,
      width = info.position.width,
      height = info.position.height;

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

function cloneDropsInfos() {
  return dropsInfos.map((info) => ({
    hover: info.hover,
    position: {
      top: info.position.top,
      left: info.position.left,
      width: info.position.width,
      height: info.position.height,
    },
  }));
}
