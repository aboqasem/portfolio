import { IBlogPost } from '../../common/types';

export const BLOG_POSTS_LOADING = 'BLOG_POSTS_LOADING';
export const BLOG_POSTS_FAIL = 'BLOG_POSTS_FAIL';
export const BLOG_POSTS_SUCCESS = 'BLOG_POSTS_SUCCESS';

export type BlogPosts = Map<string, IBlogPost>;

interface IBlogPostsLoading {
  type: typeof BLOG_POSTS_LOADING;
}

interface IBlogPostsFail {
  type: typeof BLOG_POSTS_FAIL;
}

interface IBlogPostsSuccess {
  type: typeof BLOG_POSTS_SUCCESS;
  payload: BlogPosts;
}

export type BlogPostsDispatchTypes = IBlogPostsLoading | IBlogPostsFail | IBlogPostsSuccess;
