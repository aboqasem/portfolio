import React from 'react';
import { blogPosts } from '../../common/data';
import BlogPostPreview from '../../components/BlogPostPreview';

const Blog = (): JSX.Element => {
  return (
    <>
      {blogPosts.length ? (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 md:gap-2">
          {blogPosts.map((p) => {
            const { _id: id } = p;
            return <BlogPostPreview key={id} blogPost={p} />;
          })}
        </div>
      ) : (
        <p className="text-4xl text-center">No Posts Yet</p>
      )}
    </>
  );
};

export default Blog;
