import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { calculateReadingTime } from './readingTime';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  ogImage?: string;
  canonical?: string;
  content: string;
  readingTime: string;
}

const contentDirectory = path.join(process.cwd(), 'content/blog');

/**
 * Get all blog posts sorted by date (newest first)
 */
export function getAllPosts(): BlogPost[] {
  // Create directory if it doesn't exist
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(contentDirectory);
  const posts = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(contentDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title,
        description: data.description,
        date: data.date,
        author: data.author || 'E-Bike PSI',
        tags: data.tags || [],
        ogImage: data.ogImage,
        canonical: data.canonical,
        content,
        readingTime: calculateReadingTime(content),
      } as BlogPost;
    });

  // Sort by date descending
  return posts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

/**
 * Get a single post by slug
 */
export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(contentDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      author: data.author || 'E-Bike PSI',
      tags: data.tags || [],
      ogImage: data.ogImage,
      canonical: data.canonical,
      content,
      readingTime: calculateReadingTime(content),
    };
  } catch {
    return null;
  }
}

/**
 * Get paginated posts
 */
export function getPaginatedPosts(page: number = 1, perPage: number = 10) {
  const allPosts = getAllPosts();
  const totalPages = Math.ceil(allPosts.length / perPage);
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const posts = allPosts.slice(startIndex, endIndex);

  return {
    posts,
    currentPage: page,
    totalPages,
    totalPosts: allPosts.length,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
}

/**
 * Get all unique tags
 */
export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagSet = new Set<string>();
  posts.forEach((post) => {
    post.tags.forEach((tag) => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
}

/**
 * Get posts by tag
 */
export function getPostsByTag(tag: string): BlogPost[] {
  const posts = getAllPosts();
  return posts.filter((post) => post.tags.includes(tag));
}

