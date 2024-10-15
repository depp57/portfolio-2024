import { BlogPost } from '@/lib/blog';
import { getFormatter } from 'next-intl/server';
import { Link } from '@/lib/i18n/routing';
import Image from 'next/image';
import { Badge } from '@/components/shared/badge';

type BlogNavigationItemProps = {
  post: BlogPost;
};

export default async function BlogNavigationItem({ post }: Readonly<BlogNavigationItemProps>) {
  const formatter = await getFormatter();

  return (
    <article className="flex flex-col gap-2 border-b-2 border-dotted border-b-primary-text py-8">
      <div>
        <h2 className="text-xl sm:text-2xl xl:text-3xl">
          <Link href={`blog/${post.slug}`}>{post.title}</Link>
        </h2>
        <div>
          <span className="text-lg">{formatter.dateTime(post.date)}</span>
          <div className="m-4">
            {post.tags?.map((tag) => (
              <Link key={tag} href={`blog?tag=${tag}`} className="mr-2">
                <Badge className="before:content-['#']">{tag}</Badge>
              </Link>
            ))}
          </div>
        </div>

        <Link className="block relative w-auto h-[200px] sm:h-[250px] xl:h-[350px]" href={`blog/${post.slug}`}>
          <Image
            src={post.coverImage ?? '/post-placeholder.webp'}
            alt={'Post cover image'}
            sizes="(min-width: 1280px) 66vw, (min-width: 640px) 90vw, 100vw"
            fill
            style={{ objectFit: 'contain' }}
          />
        </Link>
      </div>
      <div>{post.catchPhrase}</div>
    </article>
  );
}
