import { combineReducers } from 'redux';
import blogPostsReducer from './blogPosts';
import rainDropsReducer from './rainDrops';

const rootReducer = combineReducers({
  blogPosts: blogPostsReducer,
  rainDrops: rainDropsReducer,
});

export default rootReducer;
