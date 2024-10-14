import { Link } from '@/lib/i18n/routing';
import Menu from '@/components/shared/menu/Menu';
import { fetchDevToPosts, readMarkdownPosts } from '@/lib/blog';
import Markdown from 'react-markdown';
import { Fragment } from 'react';
import BlogImage from '@/components/pages/blog/BlogImage';
import rehypeHighlight from 'rehype-highlight';
import './dracula.css';

export default async function Blog() {
  const posts = await readMarkdownPosts();
  const devToPosts = await fetchDevToPosts();

  return (
    <>
      <header className="fixed flex w-full justify-between items-center p-10 2xl:p-10 lg:h-32">
        <Link href="/" className="text-3xl font-medium text-primary-text pointer-events-auto">
          Sacha
        </Link>

        <Menu />
      </header>

      <main className={'w-full h-full flex items-center justify-center pointer-events-auto'}>
        <section>
          <h2 className="font-bold text-xl">Blog</h2>
          <ul>
            {posts.map((post) => (
              <Fragment key={post.id}>
                <li className="text-lg" key={post.id}>
                  {post.title}
                  <br />
                  {post.id}
                  <br />
                  {post.date}
                </li>
                <Markdown
                  rehypePlugins={[rehypeHighlight]}
                  components={{ img: (image) => <BlogImage image={image} post={post} /> }}
                >
                  {post.markdownContent}
                </Markdown>
              </Fragment>
            ))}
          </ul>
        </section>

        <section>
          {devToPosts.map((post) => (
            <Markdown
              key={post.id}
              rehypePlugins={[rehypeHighlight]}
              components={{ img: (image) => <BlogImage image={image} post={post} /> }}
            >
              {post.markdownContent}
            </Markdown>
          ))}
        </section>
      </main>
    </>
  );
}
