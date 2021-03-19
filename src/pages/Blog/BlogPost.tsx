import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Center from '../../components/Center';
import AvatarLink from '../../components/AvatarLink';
import { RootStore } from '../../redux/store';
import Loading from '../../components/Loading';

const BlogPost = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const { areLoading, blogPosts } = useSelector((state: RootStore) => state.blogPosts);
  const post = blogPosts.get(id);

  if (areLoading) return <Loading />;
  return (
    <>
      {post ? (
        <div className="pb-20">
          <img
            className="object-cover w-screen h-64"
            src={post.img || `https://dummyimage.com/700x200/000000/E1DFDC&text=${post.title}`}
            alt={post.title}
          />
          <div className="flex items-center justify-between py-4 px-10">
            <AvatarLink lg />
            <p className="text-gray-700 text-base md:text-lg">{`${post.createdAt.toDateString()}`}</p>
          </div>
          <hr className="border-gray-400 sm:pb-6 md:pb-8" />
          <Center>
            <article className="prose prose-lg sm:prose-xl">
              <ReactMarkdown>{`# ${post.title}\n${post.content}`}</ReactMarkdown>
            </article>
          </Center>
        </div>
      ) : (
        <Center>
          <p className="text-3xl text-center text-red-800 sm:text-5xl md:text-6xl">Post Not Found</p>
        </Center>
      )}
    </>
  );
};

export default BlogPost;
