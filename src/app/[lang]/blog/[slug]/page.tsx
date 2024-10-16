import { BlogPost, getAllPostsSortedByDate } from '@/lib/blog';
import { notFound } from 'next/navigation';
import Markdown from 'react-markdown';
import Image from 'next/image';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import './blog-markdown-content.style.css';
import { Link } from '@/lib/i18n/routing';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { slug } }: { params: { slug: string } }) {
  return {
    title: {
      absolute: slug.charAt(0).toUpperCase() + slug.substring(1).replaceAll('-', ' '),
    },
  };
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const allPosts = await getAllPostsSortedByDate();

  return allPosts.map((post) => ({ slug: post.slug }));
}

async function getPost(slug: string): Promise<BlogPost> {
  const posts = await getAllPostsSortedByDate();

  const post = posts.find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  return post;
}

export default async function Page({ params }: Readonly<{ params: { slug: string; lang: string } }>) {
  const t = await getTranslations({ locale: params.lang, namespace: 'blog' });

  const post = await getPost(params.slug);

  return (
    <>
      <Link className="flex gap-1 items-center text-xl mt-2 sm:mb-4" href="/blog">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="size-4"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
        {t('returnToBlog')}
      </Link>

      <div className="relative w-auto h-[200px] sm:h-[250px] xl:h-[350px] mb-10">
        <Image
          src={post.coverImage ?? '/blog/post_placeholder.webp'}
          alt="Post cover image"
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>

      <div id="markdown-content">
        <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
          {post.markdownContent}
        </Markdown>
      </div>

      <Link className="flex gap-1 items-center text-xl mb-4" href="/blog">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="size-4"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
        {t('returnToBlog')}
      </Link>
    </>
  );
}
