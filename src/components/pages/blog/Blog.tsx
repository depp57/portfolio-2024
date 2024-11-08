import { filterPostsBySearchParams, getAllPostsSortedByDate } from '@/lib/blog';
import './dracula.css';
import BlogNavigationItem from '@/components/pages/blog/BlogNavigationItem';
import BlogPagination from '@/components/pages/blog/BlogPagination';
import { Badge } from '@/components/shared/badge';
import { Link } from '@/lib/i18n/routing';
import { getTranslations } from 'next-intl/server';

type BlogProps = {
  lang: string;
  searchParams?: { [key: string]: string | undefined };
};

export default async function Blog({ lang, searchParams }: Readonly<BlogProps>) {
  const t = await getTranslations({ locale: lang, namespace: 'blog' });

  const posts = await getAllPostsSortedByDate();

  const currentPage = Number(searchParams?.page) || 1;
  const currentTag = searchParams?.tag;
  const POSTS_PER_PAGE = 5;

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
          {t('postTaggedPrefix')} <Badge className="mx-1.5 before:content-['#']">{currentTag}</Badge> |
          {t('postTaggedSuffix')}
        </Link>
      )}

      {postsFilteredAndPaginated.map((post) => (
        <BlogNavigationItem key={post.id} post={post} />
      ))}

      <BlogPagination totalPages={totalPages} />
    </>
  );
}
