import React from 'react';
import { Link } from 'react-router-dom';
import { IBlogPost, blogPostEquals } from '../store/blogPosts';
import AvatarLink from './AvatarLink';

interface IProps {
  blogPost: IBlogPost;
}

const BlogPostPreview = ({ blogPost: { id, title, img, createdAt } }: IProps): JSX.Element => {
  return (
    <div className="w-full overflow-hidden rounded-lg shadow-lg">
      <Link to={`/blog/${id}`}>
        <div className="w-full h-52 md:h-64">
          <img
            className="object-cover w-full h-full"
            src={img || `https://dummyimage.com/300x200/000000/E1DFDC&text=${title}`}
            alt={title}
          />
        </div>
      </Link>

      <article className="p-4 md:p-6">
        <header className="pb-4 md:pb-6">
          <p className="text-xl md:text-3xl">
            <Link className="text-black no-underline hover:underline" to={`/blog/${id}`}>
              {title}
            </Link>
          </p>
        </header>

        <footer className="flex items-center justify-between">
          <AvatarLink />
          <p
            className="text-sm text-gray-700 md:text-lg"
            title={createdAt.toString()}
          >{`${createdAt.toDateString()}`}</p>
        </footer>
      </article>
    </div>
  );
};

export default React.memo(BlogPostPreview, (prev, next) => blogPostEquals(prev.blogPost, next.blogPost));
