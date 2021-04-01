import { RainDrops } from '../../components/Rain';
import { RAIN_DROPS_INIT, RainDropsDispatchTypes } from './actionTypes';

export const initializeRainDrops = (rainDrops: RainDrops): RainDropsDispatchTypes => {
  return {
    type: RAIN_DROPS_INIT,
    payload: rainDrops,
  };
};
