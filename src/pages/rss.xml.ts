import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const prerender = true;

export const GET: APIRoute = async ({ site }) => {
  if (!site) {
    throw new Error('Set the site URL in astro.config.mjs to generate the RSS feed.');
  }

  const [blog, books] = await Promise.all([
    getCollection('blog'),
    getCollection('books'),
  ]);

  const items = [
    ...blog.filter((entry) => !entry.data.draft).map((entry) => ({
      title: entry.data.title,
      pubDate: entry.data.date,
      description: entry.data.summary || '',
      link: `/blog/${entry.slug}/`,
      categories: ['Blog', ...(entry.data.tags || [])],
    })),
    ...books.filter((entry) => !entry.data.draft).map((entry) => ({
      title: entry.data.title,
      pubDate: entry.data.date,
      description: entry.data.summary || '',
      link: `/books/${entry.slug}/`,
      categories: ['Book review'],
    })),
  ].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

  return rss({
    title: 'Durojaiye Abisoye',
    description: 'Updates on machine learning, data, and building things.',
    site,
    items,
    customData: '<language>en-us</language>',
  });
};
