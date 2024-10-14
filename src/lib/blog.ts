import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import sizeOf from 'image-size';
import { IncomingMessage } from 'http';
import https from 'https';
import { randomInt } from 'node:crypto';

export type BlogPost = {
  id: number;
  title: string;
  date: string;
  tags: string[];
  markdownContent: string;
  imageSizes: ImageSizes;
};

export async function readMarkdownPosts(): Promise<BlogPost[]> {
  const fileNames = fs.readdirSync(POSTS_DIRECTORY);

  const posts = await Promise.all(fileNames.map(readMarkdownPost));

  return posts.sort((postA, postB) => (postA.date < postB.date ? 1 : -1));
}

export async function fetchDevToPosts(): Promise<BlogPost[]> {
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
      date: post.published_at,
      tags: post.tag_list,
      markdownContent: post.body_markdown,
      imageSizes: await getImagesSizesFromMarkdown(post.body_markdown),
    })),
  );
}

const POSTS_DIRECTORY = join(process.cwd(), 'data/posts');

async function readMarkdownPost(fileName: string): Promise<BlogPost> {
  const filePath = join(POSTS_DIRECTORY, fileName);
  const fileContent = fs.readFileSync(filePath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const parsedFile = matter(fileContent);

  return {
    id: randomInt(10000),
    title: parsedFile.data.title,
    date: parsedFile.data.date,
    tags: parsedFile.data.tags,
    markdownContent: parsedFile.content,
    imageSizes: await getImagesSizesFromMarkdown(parsedFile.content),
  };
}

type ImageSizes = Record<string, ImageSize>;
type ImageSize = { width: number; height: number };

async function getImagesSizesFromMarkdown(markdown: string): Promise<ImageSizes> {
  const sizes: ImageSizes = {};

  const iterator = markdown.matchAll(/!\[.*]\((.*)\)/g);
  let match: IteratorResult<RegExpMatchArray> = iterator.next();
  while (!match.done) {
    const url = match.value[1];

    if (url.startsWith('http')) {
      sizes[url] = await fetchImageSize(url);
    } else {
      const { width, height } = sizeOf(join('public', url));
      if (width && height) {
        sizes[url] = { width, height };
      } else {
        throw new Error(`could not determine local image size from buffer, imagePath: ${url}`);
      }
    }

    match = iterator.next();
  }

  return sizes;
}

async function getStreamImageSize(stream: IncomingMessage) {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
    try {
      /* stop requesting data after dimensions are known */
      return sizeOf(Uint8Array.from(chunk));
    } catch (error) {
      /* Not enough buffer to determine sizes yet */
    }
  }
  return sizeOf(Uint8Array.from(chunks));
}

export const fetchImageSize = async (imageUrl: string): Promise<ImageSize> => {
  const promise = new Promise<ImageSize>((resolve, reject) => {
    let w = 0;
    let h = 0;

    https.get(imageUrl, async (stream) => {
      const { width, height } = await getStreamImageSize(stream);

      if (width && height) {
        w = width;
        h = height;
        resolve({ width: w, height: h });
      } else {
        reject(new Error(`could not determine remote image size from buffer, imageUrl: ${imageUrl}`));
      }
    });
  });

  return promise.then((result) => result);
};

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
