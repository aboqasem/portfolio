import { kApiUrl } from '../../constants';
import { BLOG_POSTS_FAILED, BLOG_POSTS_LOADING, BLOG_POSTS_SUCCEEDED } from './actionTypes';
import { IBlogPostDB, BlogPostsThunk } from './types';

export const fetchBlogPosts = (): BlogPostsThunk => async (dispatch) => {
  try {
    dispatch({
      type: BLOG_POSTS_LOADING,
    });

    const res = await fetch(`${kApiUrl}posts`);
    const posts: IBlogPostDB[] = await res.json();

    dispatch({
      type: BLOG_POSTS_SUCCEEDED,
      payload: new Map(
        posts.map((post) => [
          post._id,
          {
            ...post,
            id: post._id,
            // unescape escaped newlines if any
            content: post.content.replaceAll('\\n', '\n'),
            createdAt: new Date(post.createdAt),
          },
        ]),
      ),
    });
  } catch (e) {
    dispatch({
      type: BLOG_POSTS_FAILED,
    });
  }
};
