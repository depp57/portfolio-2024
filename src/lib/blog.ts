import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { randomInt } from 'node:crypto';
import { unstable_cache } from 'next/cache';

export type BlogPost = {
  id: number;
  title: string;
  date: Date;
  tags: string[];
  markdownContent: string;
  language: 'en' | 'fr';
  coverImage?: string;
  catchPhrase: string;
  slug: string;
};

export async function getAllPostsSortedByDate(): Promise<BlogPost[]> {
  const posts = [...(await readMarkdownPosts()), ...(await fetchDevToPosts())];

  // Fix https://github.com/vercel/next.js/issues/51613
  // unstable_cache does not deserialize the Date object correctly
  for (const post of posts) {
    post.date = new Date(post.date);
  }

  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function filterPostsBySearchParams(posts: BlogPost[], tag?: string) {
  return posts.filter((post, _) => {
    return tag ? post.tags?.includes(tag) : true;
  });
}

const readMarkdownPosts = unstable_cache(async (): Promise<BlogPost[]> => {
  const fileNames = fs.readdirSync(POSTS_DIRECTORY);

  return await Promise.all(fileNames.map(readMarkdownPost));
});

const fetchDevToPosts = unstable_cache(async (): Promise<BlogPost[]> => {
  const apiToken = process.env.DEV_TO_TOKEN;

  if (!apiToken) {
    throw new Error('DEV_TO_TOKEN is not set');
  }

  const devToPosts: DevToPost[] = await fetch('https://dev.to/api/articles/me', {
    headers: { 'api-key': apiToken },
  }).then((res) => res.json());

  return await Promise.all(
    devToPosts.map(async (post) => ({
      id: post.id,
      title: post.title,
      date: formatDate(post.published_at),
      tags: post.tag_list,
      markdownContent: post.body_markdown,
      language: 'en',
      catchPhrase: post.description,
      coverImage: post.cover_image ?? undefined,
      slug: post.slug,
    })),
  );
});

const POSTS_DIRECTORY = join(process.cwd(), 'data/posts');

async function readMarkdownPost(fileName: string): Promise<BlogPost> {
  const filePath = join(POSTS_DIRECTORY, fileName);
  const fileContent = fs.readFileSync(filePath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const parsedFile = matter(fileContent);

  return {
    id: randomInt(100000),
    title: parsedFile.data.title,
    date: formatDate(parsedFile.data.date),
    tags: parsedFile.data.tags,
    markdownContent: parsedFile.content,
    language: parsedFile.data.language,
    catchPhrase: parsedFile.data.catchPhrase,
    coverImage: parsedFile.data.coverImage,
    slug: slugify(parsedFile.data.title),
  };
}

function formatDate(date: string): Date {
  if (!date.includes('T')) {
    date = date + 'T00:00:00Z';
  }

  return new Date(date);
}

function slugify(str: string) {
  return String(str)
    .normalize('NFKD') // split accented characters into their base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
    .trim() // trim leading or trailing whitespace
    .toLowerCase() // convert to lowercase
    .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
    .replace(/\s+/g, '-') // replace spaces with hyphens
    .replace(/-+/g, '-'); // remove consecutive hyphens
}

type DevToPost = {
  type_of: string;
  id: number;
  title: string;
  description: string;
  published: boolean;
  published_at: string;
  slug: string;
  path: string;
  url: string;
  comments_count: number;
  public_reactions_count: number;
  page_views_count: number;
  published_timestamp: string;
  body_markdown: string;
  positive_reactions_count: number;
  cover_image: null | string;
  tag_list: string[];
  canonical_url: string;
  reading_time_minutes: number;
  user: DevToUser;
};

type DevToUser = {
  name: string;
  username: string;
  twitter_username: null;
  github_username: string;
  user_id: number;
  website_url: string;
  profile_image: string;
  profile_image_90: string;
};
