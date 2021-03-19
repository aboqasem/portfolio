import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import store from './redux/store';
import { fetchBlogPosts } from './redux/actions/blogPostsActions';
import { IBlogPostsState } from './redux/reducers/blogPostsReducer';
import { BlogPostsDispatchTypes } from './redux/actions/blogPostsActionTypes';

// fetch blog posts on app mount for faster loading
(store.dispatch as ThunkDispatch<IBlogPostsState, void, BlogPostsDispatchTypes>)(fetchBlogPosts());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
