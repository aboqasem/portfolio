import { RainDrops } from '../../components/Rain';
import { RainDropsDispatchTypes, RAIN_DROPS_INIT } from './actionTypes';

export const initializeRainDrops = (rainDrops: RainDrops): RainDropsDispatchTypes => {
  return {
    type: RAIN_DROPS_INIT,
    payload: rainDrops,
  };
};
