/* eslint-disable no-restricted-syntax */
import { IBlogPost } from '../../common/types';
import { BlogPosts } from '../actions/blogPostsActionTypes';
import { IBlogPostsState } from '../reducers/blogPostsReducer';

export const blogPostEquals = (l: IBlogPost, r: IBlogPost): boolean => {
  return (
    l.id === r.id &&
    l.title === r.title &&
    l.content === r.content &&
    l.img === r.img &&
    l.createdAt.getTime() === r.createdAt.getTime()
  );
};

export const blogPostsEquals = (l: BlogPosts, r: BlogPosts): boolean => {
  if (l === r) {
    return true;
  }
  if (l.size !== r.size) {
    return false;
  }

  // leave value comparison to the next loop because the main thing is the id, and the time complexity will still be O(n)
  for (const [k] of l) {
    if (!r.has(k)) {
      return false;
    }
  }

  // now compare values because all ids are equal
  for (const [k, v] of l) {
    if (!blogPostEquals(v, r.get(k) as IBlogPost /* we are sure this exists because of the above for-of loop */)) {
      return false;
    }
  }

  return true;
};

export const blogPostsStateEquals = (l: IBlogPostsState, r: IBlogPostsState): boolean => {
  return l.areLoading === r.areLoading && blogPostsEquals(l.blogPosts, r.blogPosts);
};
