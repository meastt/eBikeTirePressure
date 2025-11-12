import Link from 'next/link';
import { getPaginatedPosts } from '@/lib/blog';
import { BlogCard } from '@/components/BlogCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'E-Bike Tire Pressure Blog | Guides & Tips',
  description:
    'Expert guides on e-bike tire pressure for cargo bikes, fat tires, and all terrains. Learn optimal PSI for your riding style.',
  openGraph: {
    title: 'E-Bike Tire Pressure Blog',
    description:
      'Expert guides on e-bike tire pressure optimization for all bike types and terrains.',
  },
};

interface BlogIndexProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function BlogIndex({ searchParams }: BlogIndexProps) {
  const { page: pageParam } = await searchParams;
  const page = Number(pageParam) || 1;
  const { posts, currentPage, totalPages, hasNextPage, hasPreviousPage } =
    getPaginatedPosts(page, 10);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-surface-light">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-text mb-4">
            E-Bike PSI Blog
          </h1>
          <p className="text-lg text-muted max-w-2xl">
            Expert guides on tire pressure for cargo bikes, fat tires, sand,
            snow, and everything in between.
          </p>
        </div>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted text-lg">No blog posts yet. Check back soon!</p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 mb-12">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <nav
                className="flex items-center justify-between border-t border-line pt-8"
                aria-label="Pagination"
              >
                <div className="flex-1 flex justify-start">
                  {hasPreviousPage && (
                    <Link
                      href={`/blog?page=${currentPage - 1}`}
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-brand hover:bg-surface-light rounded-lg border border-line transition-colors"
                    >
                      ← Previous
                    </Link>
                  )}
                </div>

                <div className="hidden sm:flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (pageNum) => (
                      <Link
                        key={pageNum}
                        href={`/blog?page=${pageNum}`}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                          pageNum === currentPage
                            ? 'bg-brand text-white'
                            : 'text-brand hover:bg-surface-light border border-line'
                        }`}
                        aria-current={
                          pageNum === currentPage ? 'page' : undefined
                        }
                      >
                        {pageNum}
                      </Link>
                    )
                  )}
                </div>

                <div className="flex-1 flex justify-end">
                  {hasNextPage && (
                    <Link
                      href={`/blog?page=${currentPage + 1}`}
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-brand hover:bg-surface-light rounded-lg border border-line transition-colors"
                    >
                      Next →
                    </Link>
                  )}
                </div>
              </nav>
            )}
          </>
        )}

        {/* RSS Link */}
        <div className="mt-12 pt-8 border-t border-line">
          <p className="text-center text-sm text-muted">
            <a
              href="/blog/rss.xml"
              className="text-brand hover:underline font-medium"
            >
              Subscribe via RSS
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}

