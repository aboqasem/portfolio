import { ICONS_LENGTH } from '@/components/stages/DropsStage/icons';
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
