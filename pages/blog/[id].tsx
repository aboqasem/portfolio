import markdownToTxt from 'markdown-to-txt';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import ReactMarkdown from 'react-markdown';

import { kApiUrl } from '@/common/constants';
import { ApiBlogPosts, IApiBlogPost, IBlogPost } from '@/common/types';
import { AvatarLink, Center } from '@/components';

interface IProps {
  post: IApiBlogPost;
}

const BlogPost = ({ post }: IProps) => {
  const { title, content, img, createdAt }: IBlogPost = {
    ...post,
    img: post.img || `https://dummyimage.com/700x200/000000/E1DFDC&text=${post.title}`,
    createdAt: new Date(post.createdAt),
  };
  const pureContent = markdownToTxt(content);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={pureContent} />
        <meta property="og:title" content={title} />
        <meta property="og:image" content={img} />
        <meta property="og:description" content={pureContent} />
      </Head>

      <div className="pb-20">
        <img className="object-cover w-screen h-64" src={img} alt={title} />

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

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  const res = await fetch(`${kApiUrl}posts`);
  const apiPosts: ApiBlogPosts = await res.json();
  const paths = apiPosts.map(({ id }) => ({ params: { id } }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<IProps> = async ({ params }) => {
  const id = params?.id as string;

  const res = await fetch(`${kApiUrl}posts/${id}`);
  const apiPost: IApiBlogPost = await res.json();
  const post: IApiBlogPost = {
    ...apiPost,
    // unescape escaped newlines if any
    content: apiPost.content.replace(/\\n/g, '\n'),
  };

  return { props: { post } };
};

export default BlogPost;
