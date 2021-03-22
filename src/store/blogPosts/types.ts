import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

export interface IBlogPost {
  id: string;
  img?: string;
  title: string;
  content: string;
  createdAt: Date;
}

export interface IBlogPostDB {
  _id: string;
  img?: string;
  title: string;
  content: string;
  createdAt: string;
}

export type BlogPosts = Map<string, IBlogPost>;

export interface IBlogPostsState {
  areLoading: boolean;
  blogPosts: BlogPosts;
}

export type BlogPostsThunk<ReturnType = void> = ThunkAction<ReturnType, IBlogPostsState, unknown, Action<string>>;
