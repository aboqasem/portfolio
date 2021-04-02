import { GetStaticProps } from 'next';
import Head from 'next/head';

import { kApiUrl } from '@/common/constants';
import { ApiBlogPosts, BlogPosts } from '@/common/types';
import { BlogPostPreview, Center } from '@/components';

interface IProps {
  posts: ApiBlogPosts;
}

const Blog = ({ posts }: IProps) => {
  const blogPosts: BlogPosts = posts.map((post) => ({
    ...post,
    img: post.img || `https://dummyimage.com/300x200/000000/E1DFDC&text=${post.title}`,
    createdAt: new Date(post.createdAt),
  }));

  return (
    <>
      <Head>
        <title>Blog — Mohammad Al Zouabi</title>
        <meta name="description" content="Mohammad Al Zouabi's blog" />
      </Head>

      <Center>
        {blogPosts.length ? (
          <div className="grid grid-cols-1 gap-4">
            {blogPosts.map((blogPost) => {
              return <BlogPostPreview key={blogPost.id} blogPost={blogPost} />;
            })}
          </div>
        ) : (
          <p className="text-4xl text-center">No Posts Yet</p>
        )}
      </Center>
    </>
  );
};

export const getStaticProps: GetStaticProps<IProps> = async () => {
  let res: Response;
  try {
    res = await fetch(`${kApiUrl}posts`);
  } catch (e) {
    return { props: { posts: [] }, revalidate: 600 };
  }

  const apiPosts: ApiBlogPosts = await res.json();
  const posts: ApiBlogPosts = apiPosts.map((post) => ({
    ...post,
    // unescape escaped newlines if any, `replaceAll` does not work on the server
    content: post.content.replace(/\\n/g, '\n'),
  }));
  return { props: { posts }, revalidate: 3600 };
};

export default Blog;
