import { RootState } from './types';
import { IBlogPostsState } from './blogPosts';

export const selectBlogPostsState = (state: RootState): IBlogPostsState => state.blogPosts;
