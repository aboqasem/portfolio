import React from 'react';
import { Link } from 'react-router-dom';
import { IBlogPost } from '../common/types';
import AvatarLink from './AvatarLink';

interface IProps {
  blogPost: IBlogPost;
}

const BlogPostPreview = (props: IProps): JSX.Element => {
  const { _id: id, title, img, createdAt: d } = props.blogPost;

  return (
    <div className="w-full overflow-hidden rounded-lg shadow-lg">
      <Link to={`/blog/${id}`}>
        <div className="w-full h-52 md:h-28">
          <img
            className="object-cover h-full w-full"
            src={img || `https://dummyimage.com/300x200/000000/E1DFDC&text=${title}`}
            alt={title}
          />
        </div>
      </Link>

      <article className="p-4">
        <header className="pb-4">
          <p className="text-lg">
            <Link className="no-underline hover:underline text-black" to={`/blog/${id}`}>
              {title}
            </Link>
          </p>
        </header>

        <footer className="flex items-center justify-between">
          <AvatarLink />
          <p className="text-gray-700 text-sm">{`${d.toDateString()}`}</p>
        </footer>
      </article>
    </div>
  );
};

export default BlogPostPreview;
