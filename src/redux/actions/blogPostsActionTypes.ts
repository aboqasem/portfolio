import { IBlogPost } from '../../common/types';

export const BLOG_POSTS_LOADING = 'BLOG_POSTS_LOADING';
export const BLOG_POSTS_FAIL = 'BLOG_POSTS_FAIL';
export const BLOG_POSTS_SUCCESS = 'BLOG_POSTS_SUCCESS';

export type BlogPosts = IBlogPost[];

export interface BlogPostsLoading {
  type: typeof BLOG_POSTS_LOADING;
}

export interface BlogPostsFail {
  type: typeof BLOG_POSTS_FAIL;
}

export interface BlogPostsSuccess {
  type: typeof BLOG_POSTS_SUCCESS;
  payload: IBlogPost[];
}

export type BlogPostsDispatchTypes = BlogPostsLoading | BlogPostsFail | BlogPostsSuccess;
