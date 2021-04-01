import Head from 'next/head';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BlogPostPreview, Center, Loading } from '@/components';
import { selectBlogPostsState } from '@/store';
import { blogPostsStateEquals, fetchBlogPosts } from '@/store/blogPosts';

const Blog = () => {
  const dispatch = useDispatch();
  const { areLoading, blogPosts } = useSelector(selectBlogPostsState, blogPostsStateEquals);

  useEffect(() => {
    if (!areLoading && blogPosts.size === 0) {
      dispatch(fetchBlogPosts());
    }
  }, []);

  if (areLoading) return <Loading />;

  return (
    <>
      <Head>
        <title>Blog — Mohammad Al Zouabi</title>
        <meta name="description" content="Mohammad Al Zouabi's blog" />
      </Head>

      <Center>
        {blogPosts.size ? (
          <div className="grid grid-cols-1 gap-4">
            {Array.from(blogPosts).map(([id, post]) => {
              return <BlogPostPreview key={id} blogPost={post} />;
            })}
          </div>
        ) : (
          <p className="text-4xl text-center">No Posts Yet</p>
        )}
      </Center>
    </>
  );
};

export default Blog;
