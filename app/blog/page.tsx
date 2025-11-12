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
    <main className="min-h-screen bg-gradient-mesh">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-text mb-5 bg-gradient-to-r from-text via-brand-700 to-text bg-clip-text text-transparent">
            E-Bike PSI Blog
          </h1>
          <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed">
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
                      className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-brand hover:bg-brand-50 rounded-xl border border-slate-200 hover:border-brand/30 transition-all duration-200 shadow-sm hover:shadow-md"
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
                        className={`px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 shadow-sm ${
                          pageNum === currentPage
                            ? 'bg-gradient-brand text-white shadow-md'
                            : 'text-brand hover:bg-brand-50 border border-slate-200 hover:border-brand/30 hover:shadow-md'
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
                      className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-brand hover:bg-brand-50 rounded-xl border border-slate-200 hover:border-brand/30 transition-all duration-200 shadow-sm hover:shadow-md"
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
        <div className="mt-12 pt-8 border-t border-slate-200/60">
          <p className="text-center text-sm text-muted">
            <a
              href="/blog/rss.xml"
              className="text-brand hover:text-brand-700 font-semibold transition-colors duration-200 inline-flex items-center gap-2"
            >
              Subscribe via RSS →
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}

