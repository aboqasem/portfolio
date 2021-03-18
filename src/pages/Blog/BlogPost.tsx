import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import { blogPosts } from '../../common/data';
import Center from '../../components/Center';
import AvatarLink from '../../components/AvatarLink';

const BlogPost = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find(({ _id: i }) => i === id);

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
          <Center>
            <article className="prose prose-lg sm:prose-xl">
              <ReactMarkdown>{post.content || ''}</ReactMarkdown>
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
