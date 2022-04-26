import { combineReducers } from 'redux';

import commonDataReducer from './commonData';
import rainDropsReducer from './rainDrops';

const rootReducer = combineReducers({
  rainDrops: rainDropsReducer,
  commonData: commonDataReducer,
});

export default rootReducer;
