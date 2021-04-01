import '@/styles/globals.css';

import { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { Navbar } from '@/components';
import store from '@/store';
import { BlogPostsDispatchTypes, fetchBlogPosts, IBlogPostsState } from '@/store/blogPosts';

// fetch blog posts on app mount for faster loading
(store.dispatch as ThunkDispatch<IBlogPostsState, void, BlogPostsDispatchTypes>)(fetchBlogPosts());

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <title>Mohammad Al Zouabi</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <link href="/manifest.json" rel="manifest" />
        <meta content="Mohammad Al Zouabi's personal website." name="description" />
      </Head>

      <div className="font-serif">
        <Navbar />
        <Component {...pageProps} />
      </div>
    </Provider>
  );
};

export default MyApp;
