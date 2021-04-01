import { IBlogPostsState } from './blogPosts';
import { ICommonDataState } from './commonData';
import { IRainDropsState } from './rainDrops';
import { RootState } from './types';

export const selectBlogPostsState = (state: RootState): IBlogPostsState => state.blogPosts;

export const selectRainDropsState = (state: RootState): IRainDropsState => state.rainDrops;

export const selectCommonDataState = (state: RootState): ICommonDataState => state.commonData;
