import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import ReactMarkdown from 'react-markdown';
import { useSelector } from 'react-redux';

import AvatarLink from '@/components/AvatarLink';
import Center from '@/components/Center';
import Loading from '@/components/Loading';
import { selectBlogPostsState } from '@/store';

const BlogPost = () => {
  const id = useRouter().query.id as string;

  const { areLoading, blogPosts } = useSelector(selectBlogPostsState);
  const post = blogPosts.get(id);

  if (areLoading) {
    return <Loading />;
  }

  if (!post) {
    return (
      <Center>
        <p className="text-3xl text-center text-red-800 sm:text-5xl md:text-6xl">Post Not Found</p>
      </Center>
    );
  }

  const { title, content, img, createdAt } = post;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={content} />
      </Head>

      <div className="pb-20">
        <img
          className="object-cover w-screen h-64"
          src={img || `https://dummyimage.com/700x200/000000/E1DFDC&text=${title}`}
          alt={title}
        />

        <div className="flex items-center justify-between px-10 py-4">
          <AvatarLink lg />
          <p
            className="text-base text-gray-700 md:text-lg"
            title={createdAt.toString()}
          >{`${createdAt.toDateString()}`}</p>
        </div>
        <hr className="pb-4 border-gray-400 sm:pb-6 md:pb-8" />

        <Center>
          <article className="prose prose-lg sm:prose-xl">
            <ReactMarkdown>{`# ${title}\n${content}`}</ReactMarkdown>
          </article>
        </Center>
      </div>
    </>
  );
};

export default BlogPost;
