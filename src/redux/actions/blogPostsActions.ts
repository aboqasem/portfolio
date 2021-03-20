import { Dispatch } from 'redux';
import { IBlogPostDB } from '../../common/types';
import { kApiUrl } from '../../constants';
import {
  BlogPostsDispatchTypes,
  BLOG_POSTS_FAIL,
  BLOG_POSTS_LOADING,
  BLOG_POSTS_SUCCESS,
} from './blogPostsActionTypes';

export const fetchBlogPosts = () => async (dispatch: Dispatch<BlogPostsDispatchTypes>): Promise<void> => {
  try {
    dispatch({
      type: BLOG_POSTS_LOADING,
    });

    const res = await fetch(`${kApiUrl}posts`);
    const posts: IBlogPostDB[] = await res.json();

    dispatch({
      type: BLOG_POSTS_SUCCESS,
      payload: new Map(
        posts.map((post) => [
          post._id,
          {
            ...post,
            id: post._id,
            // unescape newlines escaped by mongodb
            content: post.content.replaceAll('\\n', '\n'),
            createdAt: new Date(post.createdAt),
          },
        ]),
      ),
    });
  } catch (e) {
    dispatch({
      type: BLOG_POSTS_FAIL,
    });
  }
};
