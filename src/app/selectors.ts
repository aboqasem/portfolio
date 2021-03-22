import { IBlogPostsState } from './reducers/blogPostsReducer';
import { RootState } from './store';

export const selectBlogPostsState = (state: RootState): IBlogPostsState => state.blogPosts;
