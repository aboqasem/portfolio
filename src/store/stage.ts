import { ICONS_LENGTH } from '@/components/Stage/icons';
import type { Setter } from 'solid-js';
import { createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';

export type DropPosition = {
  top: number;
  left: number;
  width: number;
  height: number;
};

export type DropInfo = {
  position: DropPosition;
  hover: boolean;
};

const DROP_SPEED_KEY = 'dropSpeed';

export const minDropSpeed = 0;

export const maxDropSpeed = 6;

export const dropSpeedStep = maxDropSpeed / 10;

const defaultDropSpeed = window.matchMedia('(prefers-reduced-motion)').matches
  ? 0
  : dropSpeedStep * 4;

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

const [dropSpeed, _setDropSpeed] = createSignal<number>(storeDropSpeed());

// @ts-expect-error
const setDropSpeed: Setter<number> = (value) => {
  return _setDropSpeed((prev) => storeDropSpeed(typeof value === 'function' ? value(prev) : value));
};

export { dropSpeed, setDropSpeed };

function storeDropSpeed(speed?: number): number {
  if (typeof speed !== 'number' || isNaN(speed)) {
    const storedDropSpeed = +(localStorage.getItem(DROP_SPEED_KEY) ?? NaN);

    speed = isNaN(storedDropSpeed) ? defaultDropSpeed : storedDropSpeed;
  }

  speed = Math.max(minDropSpeed, Math.min(maxDropSpeed, speed));

  localStorage.setItem(DROP_SPEED_KEY, speed.toString());

  return speed;
}
