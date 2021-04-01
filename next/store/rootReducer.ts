import { combineReducers } from 'redux';
import blogPostsReducer from './blogPosts';
import rainDropsReducer from './rainDrops';
import commonDataReducer from './commonData';

const rootReducer = combineReducers({
  blogPosts: blogPostsReducer,
  rainDrops: rainDropsReducer,
  commonData: commonDataReducer,
});

export default rootReducer;
