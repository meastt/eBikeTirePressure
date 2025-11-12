import Link from 'next/link';
import { BlogPost } from '@/lib/blog';
import { TagPill } from './TagPill';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <article className="group bg-white rounded-lg border border-line p-6 transition-all duration-200 hover:shadow-hover hover:-translate-y-1">
      <Link href={`/blog/${post.slug}`} className="block">
        <h2 className="font-heading text-xl font-semibold text-text mb-2 group-hover:text-brand transition-colors">
          {post.title}
        </h2>

        <div className="flex items-center gap-3 text-sm text-muted mb-3">
          <time dateTime={post.date}>{formattedDate}</time>
          <span>•</span>
          <span>{post.readingTime}</span>
        </div>

        <p className="text-muted mb-4 line-clamp-2">{post.description}</p>

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 4).map((tag) => (
              <TagPill key={tag} tag={tag} />
            ))}
          </div>
        )}
      </Link>
    </article>
  );
}

