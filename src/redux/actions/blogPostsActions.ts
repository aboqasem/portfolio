import { Dispatch } from 'redux';
import { IBlogPostDB } from '../../common/types';
import {
  BlogPostsDispatchTypes,
  BLOG_POSTS_FAIL,
  BLOG_POSTS_LOADING,
  BLOG_POSTS_SUCCESS,
} from './blogPostsActionTypes';

// eslint-disable-next-line import/prefer-default-export
export const fetchBlogPosts = () => async (dispatch: Dispatch<BlogPostsDispatchTypes>): Promise<void> => {
  try {
    dispatch({
      type: BLOG_POSTS_LOADING,
    });
    const res = await fetch('https://api-aboqasem.herokuapp.com/posts');
    const posts: IBlogPostDB[] = await res.json();
    dispatch({
      type: BLOG_POSTS_SUCCESS,
      payload: posts.map((post) => ({
        ...post,
        // eslint-disable-next-line no-underscore-dangle
        id: post._id,
        createdAt: new Date(post.createdAt),
      })),
    });
  } catch (e) {
    dispatch({
      type: BLOG_POSTS_FAIL,
    });
  }
};
