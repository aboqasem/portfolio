import { RootState } from './types';
import { IBlogPostsState } from './blogPosts';
import { IRainDropsState } from './rainDrops';
import { ICommonDataState } from './commonData';

export const selectBlogPostsState = (state: RootState): IBlogPostsState => state.blogPosts;

export const selectRainDropsState = (state: RootState): IRainDropsState => state.rainDrops;

export const selectCommonDataState = (state: RootState): ICommonDataState => state.commonData;
