import { dropsSpeed } from "@/components/Settings/DropsStage/store";
import { ICONS_LENGTH } from "@/components/stages/DropsStage/icons";
import type { DropInfo, DropPosition } from "@/components/stages/DropsStage/store";
import { dropsInfos, setDropsInfos } from "@/components/stages/DropsStage/store";
import { createEffect } from "solid-js";

// This is needed to mark the positions as stale if the `ResizeObserver` timeout got cleared before
// updating the positions (i.e. when the stage is unmounted).
let shouldInitPositions: boolean;

let currentStageHeight = NaN;
let currentStageWidth = NaN;

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

let lastInitStageWidth = NaN;
let lastInitStageHeight = NaN;

function initializePositions(stage: HTMLDivElement) {
  if (currentStageWidth === lastInitStageWidth && currentStageHeight === lastInitStageHeight) {
    return;
  }

  lastInitStageWidth = currentStageWidth;
  lastInitStageHeight = currentStageHeight;

  const clonedDropsInfos = cloneDropsInfos();

  // assume all drops are squares and have the same size
  const width = (stage.children[0] as HTMLDivElement).offsetWidth;
  const height = width;

  for (let i = 0; i < ICONS_LENGTH; i++) {
    const topMax = currentStageHeight - height;
    const leftMax = currentStageWidth - width;

    let retries = 500;

    const position = { top: NaN, left: NaN, width, height };
    clonedDropsInfos[i]!.position = position;

    // keep initializing a random position until it does not overlap with previously initialized ones
    while (--retries >= 0) {
      position.top = Math.floor(Math.random() * topMax);
      position.left = Math.floor(Math.random() * leftMax);

      let overlaps = false;
      for (let j = i - 1; j >= 0; j--) {
        if (doPositionsOverlap(position, clonedDropsInfos[j]!.position)) {
          overlaps = true;
          break;
        }
      }
      if (!overlaps) {
        break;
      }
    }
  }

  setDropsInfos(clonedDropsInfos);
}

let _dropSpeedRef = dropsSpeed();

createEffect(() => {
  _dropSpeedRef = dropsSpeed();
});

function updatePositions() {
  const dropSpeed = _dropSpeedRef;

  if (shouldInitPositions || dropSpeed === 0) {
    // if an initialization is pending, or drop speed is 0, don't move the drops
    return;
  }

  const clonedDropsInfos = cloneDropsInfos();

  // assume all drops are squares and have the same size
  const width = clonedDropsInfos[0]!.position.width;
  const height = width;

  for (let i = 0; i < ICONS_LENGTH; i++) {
    const info = clonedDropsInfos[i]!;

    if (info.hover) {
      continue;
    }

    const top = info.position.top;
    const left = info.position.left;

    let newTop = top + dropSpeed;
    if (newTop >= currentStageHeight) {
      newTop = -height;
    }
    const newPosition: DropPosition = { top: newTop, left, width, height };

    let move = true;
    // do not move the drop if moving it would cause it to overlap with another stopped drop.
    for (let j = 0; j < ICONS_LENGTH; j++) {
      if (i === j) {
        // skip checking the same drop
        continue;
      }
      const otherInfo = clonedDropsInfos[j]!;
      if (doPositionsOverlap(newPosition, otherInfo.position)) {
        // the drop is going to overlap with another drop
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
    a.left + a.width < b.left /* the drop is before the other drop */ ||
    a.left > b.left + b.width /* the drop is after the other drop */ ||
    a.top + a.height < b.top /* the drop is above the other drops */ ||
    /* the drop is below the other drop */
    a.top > b.top + b.height
  );
}

function cloneDropsInfos(): DropInfo[] {
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
