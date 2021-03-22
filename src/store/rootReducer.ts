import { combineReducers } from 'redux';
import blogPostsReducer from './blogPosts';

const rootReducer = combineReducers({
  blogPosts: blogPostsReducer,
});

export default rootReducer;
