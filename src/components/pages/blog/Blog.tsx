import { filterPostsBySearchParams, getAllPostsSortedByDate } from '@/lib/blog';
import './dracula.css';
import BlogNavigationItem from '@/components/pages/blog/BlogNavigationItem';
import BlogPagination from '@/components/pages/blog/BlogPagination';
import { Badge } from '@/components/shared/badge';
import { Link } from '@/lib/i18n/routing';

export default async function Blog({
  searchParams,
}: Readonly<{
  searchParams?: { [key: string]: string | undefined };
}>) {
  const posts = await getAllPostsSortedByDate();

  const currentPage = Number(searchParams?.page) || 1;
  const currentTag = searchParams?.tag;
  const POSTS_PER_PAGE = 3;

  const filteredPosts = filterPostsBySearchParams(posts, currentTag);
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  const postsFilteredAndPaginated = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  );

  return (
    <>
      {currentTag && (
        <Link href="blog" className="flex justify-center text-2xl">
          Posts tagged with <Badge className="mx-1.5 before:content-['#']">{currentTag}</Badge> | Click to remove filter
        </Link>
      )}

      {postsFilteredAndPaginated.map((post) => (
        <BlogNavigationItem key={post.id} post={post} />
      ))}

      <BlogPagination totalPages={totalPages} />
    </>
  );
}
