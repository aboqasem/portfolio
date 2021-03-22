import { IBlogPost } from '../../common/types';

export const BLOG_POSTS_LOADING = 'BLOG_POSTS_LOADING';
export const BLOG_POSTS_FAILED = 'BLOG_POSTS_FAILED';
export const BLOG_POSTS_SUCCEEDED = 'BLOG_POSTS_SUCCEEDED';

export type BlogPosts = Map<string, IBlogPost>;

interface IBlogPostsLoading {
  type: typeof BLOG_POSTS_LOADING;
}

interface IBlogPostsFail {
  type: typeof BLOG_POSTS_FAILED;
}

interface IBlogPostsSuccess {
  type: typeof BLOG_POSTS_SUCCEEDED;
  payload: BlogPosts;
}

export type BlogPostsDispatchTypes = IBlogPostsLoading | IBlogPostsFail | IBlogPostsSuccess;
