import { combineReducers } from 'redux';

import blogPostsReducer from './blogPosts';
import commonDataReducer from './commonData';
import rainDropsReducer from './rainDrops';

const rootReducer = combineReducers({
  blogPosts: blogPostsReducer,
  rainDrops: rainDropsReducer,
  commonData: commonDataReducer,
});

export default rootReducer;
