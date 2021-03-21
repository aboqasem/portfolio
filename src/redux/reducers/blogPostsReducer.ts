import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {
  BlogPosts,
  BlogPostsDispatchTypes,
  BLOG_POSTS_FAILED,
  BLOG_POSTS_LOADING,
  BLOG_POSTS_SUCCEEDED,
} from '../actions/blogPostsActionTypes';

export interface IBlogPostsState {
  areLoading: boolean;
  blogPosts: BlogPosts;
}

const initialState: IBlogPostsState = {
  areLoading: false,
  blogPosts: new Map([]),
};

const blogPostsReducer = (state = initialState, action: BlogPostsDispatchTypes): IBlogPostsState => {
  switch (action.type) {
    case BLOG_POSTS_LOADING:
      return {
        areLoading: true,
        blogPosts: state.blogPosts,
      };

    case BLOG_POSTS_FAILED:
      return {
        areLoading: false,
        blogPosts: state.blogPosts,
      };

    case BLOG_POSTS_SUCCEEDED:
      return {
        areLoading: false,
        blogPosts: action.payload,
      };

    default:
      return state;
  }
};

export type BlogPostsThunk<ReturnType = void> = ThunkAction<ReturnType, IBlogPostsState, unknown, Action<string>>;

export default blogPostsReducer;
