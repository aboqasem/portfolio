import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BlogPostPreview from '../../components/BlogPostPreview';
import Center from '../../components/Center';
import { RootState } from '../../redux/store';
import Loading from '../../components/Loading';
import { fetchBlogPosts } from '../../redux/actions/blogPostsActions';

const Blog = (): JSX.Element => {
  const dispatch = useDispatch();
  const { areLoading, blogPosts } = useSelector((state: RootState) => state.blogPosts);

  useEffect(() => {
    if (!areLoading && blogPosts.size === 0) {
      dispatch(fetchBlogPosts());
    }

    document.title = 'Blog — Mohammad Al Zouabi';

    return () => {
      document.title = 'Mohammad Al Zouabi';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (areLoading) return <Loading />;
  return (
    <Center>
      {blogPosts.size ? (
        <div className="grid gap-4 grid-cols-1">
          {Array.from(blogPosts).map(([id, post]) => {
            return <BlogPostPreview key={id} blogPost={post} />;
          })}
        </div>
      ) : (
        <p className="text-4xl text-center">No Posts Yet</p>
      )}
    </Center>
  );
};

export default Blog;
