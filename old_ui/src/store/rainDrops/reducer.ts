import { RainDropsDispatchTypes, RAIN_DROPS_INIT } from './actionTypes';
import { IRainDropsState } from './types';

const initialState: IRainDropsState = {
  areInitialized: false,
  rainDrops: [],
};

const rainDropsReducer = (state = initialState, action: RainDropsDispatchTypes): IRainDropsState => {
  switch (action.type) {
    case RAIN_DROPS_INIT:
      return {
        areInitialized: true,
        rainDrops: action.payload,
      };

    default:
      return state;
  }
};

export default rainDropsReducer;
