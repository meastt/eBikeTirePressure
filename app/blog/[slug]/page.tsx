import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { getAllPosts, getPostBySlug } from '@/lib/blog';
import { Prose } from '@/components/Prose';
import { TagPill } from '@/components/TagPill';
import { generateBreadcrumbSchema, generateHowToSchema, generateImageObjectSchema, type HowToStep } from '@/lib/schema';
import { Metadata } from 'next';
import { getBaseUrl } from '@/lib/seo';

interface BlogPostProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags.length > 0 ? post.tags.join(', ') : undefined,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: post.ogImage ? [post.ogImage] : [],
    },
    alternates: {
      canonical: post.canonical,
    },
  };
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const formattedModifiedDate = post.dateModified && post.dateModified !== post.date
    ? new Date(post.dateModified).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : null;

  const baseUrl = getBaseUrl();
  const postUrl = `${baseUrl}/blog/${post.slug}`;
  const postImage = post.ogImage
    ? `${baseUrl}${post.ogImage}`
    : `${baseUrl}/logo.svg`;

  // Generate BlogPosting JSON-LD (enhanced)
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.dateModified || post.date,
    inLanguage: 'en-US',
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'E-Bike PSI',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.svg`,
      },
    },
    image: postImage,
    url: postUrl,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    ...(post.tags.length > 0 && {
      articleSection: post.tags[0], // Use first tag as primary section
      keywords: post.tags.join(', '),
    }),
  };

  // Generate Article JSON-LD
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: postImage,
    datePublished: post.date,
    dateModified: post.dateModified || post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'E-Bike PSI',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.svg`,
      },
    },
    ...(post.tags.length > 0 && {
      articleSection: post.tags[0],
      keywords: post.tags.join(', '),
    }),
  };

  // Generate BreadcrumbList JSON-LD
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: baseUrl },
    { name: 'Blog', url: `${baseUrl}/blog` },
    { name: post.title, url: postUrl },
  ]);

  // Generate FAQ schema for high-traffic informational posts
  const getFAQSchema = (slug: string) => {
    const faqMap: Record<string, { questions: { q: string; a: string }[] }> = {
      'ebike-tire-pressure-heavy-riders-guide': {
        questions: [
          {
            q: 'What PSI should a 250 lb rider run on an e-bike?',
            a: 'Most e-bike tires support 250-300 lbs per tire when inflated to sidewall max. A 250 lb rider should typically run 25-35 PSI on standard tires, or 12-18 PSI on fat tires (4.0"+). The rear wheel carries more weight, so many riders run 2-5 PSI higher in back.'
          },
          {
            q: 'How much extra PSI do I need for heavy loads on an e-bike?',
            a: 'Add 5-10% PSI per 50 lbs of cargo. For a 300 lb total load, increase rear tire pressure by 5-8 PSI over your solo rider pressure. Always stay below the tire\'s maximum sidewall PSI.'
          },
          {
            q: 'Can I exceed the tire\'s max PSI for heavy riders?',
            a: 'Never exceed the tire\'s maximum PSI listed on the sidewall. If your weight exceeds the tire\'s load rating, the solution is wider tires, not higher pressure. A 4.0" fat tire at 15 PSI supports far more weight safely than a 2.0" tire at 40 PSI.'
          },
          {
            q: 'Do mid-drive motors need different PSI for heavy riders?',
            a: 'Yes. Mid-drive motors put more weight over the rear wheel, increasing pinch flat risk. Heavy riders on mid-drive e-bikes should increase rear tire pressure by 2-5 PSI compared to hub motor setups, and consider reinforced or tires with higher load ratings.'
          },
        ]
      },
    };
    const faqData = faqMap[slug];
    if (!faqData) return null;
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': faqData.questions.map(item => ({
        '@type': 'Question',
        'name': item.q,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': item.a
        }
      }))
    };
  };

  const faqSchema = getFAQSchema(post.slug);

  // Generate HowTo schema for tutorial posts
  const getHowToSchema = (slug: string) => {
    const howToMap: Record<string, { name: string; description: string; steps: HowToStep[] }> = {
      'ebike-tire-pressure-maintenance-schedule': {
        name: 'How to Check E-Bike Tire Pressure: Weekly Maintenance Schedule',
        description: 'Step-by-step guide to checking and maintaining e-bike tire pressure for optimal safety and performance.',
        steps: [
          {
            name: 'Visual Inspection',
            text: 'Look for tire deformation, cuts, embedded objects, or sidewall cracks. Check for sealant weeping (tubeless) or bulges.',
          },
          {
            name: 'Squeeze Test',
            text: 'Place both thumbs on tire sidewall and press down hard. Proper PSI resists hard, low PSI compresses easily.',
          },
          {
            name: 'Digital Gauge Check',
            text: 'Remove valve cap, press gauge firmly onto valve, read pressure. Check both front and rear tires. Record PSI for tracking.',
          },
          {
            name: 'Valve Cap Check',
            text: 'Replace valve cap to keep dirt out. Ensure cap is snug but not over-tight.',
          },
        ],
      },
      'preventing-tire-burping-tubeless-ebikes': {
        name: 'How to Prevent Tire Burping on Tubeless E-Bikes',
        description: 'Step-by-step guide to preventing tire burping through proper setup, PSI management, and maintenance.',
        steps: [
          {
            name: 'Check Current PSI',
            text: 'Ensure PSI is at or above minimum for your tire width. Fat tires (4.0"+) need 12+ PSI, standard tires need 25+ PSI.',
          },
          {
            name: 'Inspect Bead Seating',
            text: 'Check that bead line looks even around entire rim. Uneven seating can cause burping during cornering.',
          },
          {
            name: 'Check Sealant',
            text: 'Verify sealant is fresh and sufficient. Dried or insufficient sealant increases burping risk.',
          },
          {
            name: 'Assess Riding Style',
            text: 'Aggressive cornering or hard launches require higher PSI. Adjust based on your riding style.',
          },
          {
            name: 'Consider Tire/Rim Compatibility',
            text: 'Ensure tire and rim are compatible. Hookless rims require specific tires. Wider rims reduce burping risk.',
          },
        ],
      },
    };

    const howToData = howToMap[slug];
    if (!howToData) return null;

    return generateHowToSchema(
      howToData.name,
      howToData.description,
      howToData.steps,
      postImage
    );
  };

  const howToSchema = getHowToSchema(post.slug);

  // Generate ImageObject schema for ogImage if present
  const imageSchema = post.ogImage
    ? generateImageObjectSchema(postImage, post.title)
    : null;

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      {howToSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      )}
      {imageSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(imageSchema) }}
        />
      )}

      <main className="min-h-screen bg-white">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-muted">
              <li>
                <Link href="/" className="hover:text-brand transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-brand transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>/</li>
              <li className="text-text font-medium">{post.title}</li>
            </ol>
          </nav>

          {/* Header */}
          <header className="mb-8">
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-text mb-4 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted mb-6">
              <time dateTime={post.date}>{formattedDate}</time>
              {formattedModifiedDate && (
                <>
                  <span>•</span>
                  <time dateTime={post.dateModified || post.date}>
                    Updated {formattedModifiedDate}
                  </time>
                </>
              )}
              <span>•</span>
              <span>{post.readingTime}</span>
              <span>•</span>
              <span>By {post.author}</span>
            </div>

            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <TagPill key={tag} tag={tag} />
                ))}
              </div>
            )}
          </header>

          {/* Content */}
          <Prose>
            <MDXRemote 
              source={post.content}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                },
              }}
            />
          </Prose>

          {/* Back to Blog */}
          <div className="mt-12 pt-8 border-t border-line">
            <Link
              href="/blog"
              className="inline-flex items-center text-brand hover:text-brand-dark font-medium transition-colors"
            >
              ← Back to Blog
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}

