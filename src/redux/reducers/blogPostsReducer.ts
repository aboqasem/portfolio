import {
  BlogPosts,
  BlogPostsDispatchTypes,
  BLOG_POSTS_FAIL,
  BLOG_POSTS_LOADING,
  BLOG_POSTS_SUCCESS,
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

    case BLOG_POSTS_FAIL:
      return {
        areLoading: false,
        blogPosts: state.blogPosts,
      };

    case BLOG_POSTS_SUCCESS:
      return {
        areLoading: false,
        blogPosts: action.payload,
      };

    default:
      return state;
  }
};

export default blogPostsReducer;
