import { combineReducers } from 'redux';
import blogPostsReducer from './blogPostsReducer';

const rootReducer = combineReducers({
  blogPosts: blogPostsReducer,
});

export default rootReducer;
