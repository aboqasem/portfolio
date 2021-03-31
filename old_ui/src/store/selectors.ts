import { RootState } from './types';
import { IBlogPostsState } from './blogPosts';
import { IRainDropsState } from './rainDrops';

export const selectBlogPostsState = (state: RootState): IBlogPostsState => state.blogPosts;

export const selectRainDropsState = (state: RootState): IRainDropsState => state.rainDrops;
