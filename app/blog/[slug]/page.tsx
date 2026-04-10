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
      'fat-tire-ebike-tire-pressure-guide': {
        questions: [
          {
            q: 'What PSI should fat tire e-bikes run on pavement?',
            a: 'For 4.0-inch fat tires on pavement, run 20-25 PSI. This balances rolling efficiency with comfort. Going above 28 PSI makes the ride harsh and reduces the fat tire advantage.'
          },
          {
            q: 'Should I run lower PSI on fat tire e-bikes for sand or snow?',
            a: 'Yes. For sand or snow, drop to 8-12 PSI on 4.0-inch tires. The larger contact patch provides flotation over soft surfaces. Start at 12 PSI and air down if the tire digs in.'
          },
          {
            q: 'At what PSI do fat tire e-bikes get pinch flats?',
            a: 'Fat tires are very resistant to pinch flats below 15 PSI due to their volume, but you can still pinch flat on sharp rocks or curbs. For 4.0-inch tires, stay above 10 PSI for safety on mixed terrain.'
          },
          {
            q: 'Can I run fat tires tubeless on an e-bike?',
            a: 'Many fat tire e-bikes support tubeless setups. Tubeless lets you run 3-5 PSI lower than tubed tires without pinch flat risk, improving traction and ride quality on trails.'
          },
        ]
      },
      'ebike-tire-pressure-range-guide': {
        questions: [
          {
            q: 'Does higher tire pressure increase e-bike range?',
            a: 'Yes, on smooth pavement. Higher PSI reduces rolling resistance, which directly improves battery range. You can expect 5-12% more range running at the upper end of your tire\'s PSI range versus the lower end.'
          },
          {
            q: 'What PSI gives the best e-bike range on mixed terrain?',
            a: 'For mixed terrain, find the lowest PSI that doesn\'t cause pinch flats on the roughest section of your route. On gravel or dirt, lower PSI can actually reduce rolling resistance compared to pavement.'
          },
          {
            q: 'How much PSI should I add for cargo weight on an e-bike?',
            a: 'Add approximately 2 PSI front and rear for every 30 lbs of cargo. A 220 lb rider carrying 25 lbs should run 2-4 PSI higher than their solo rider pressure for optimal range.'
          },
          {
            q: 'Do tubeless tires improve e-bike range?',
            a: 'Tubeless tires show 3-5% better range than tubed equivalents at the same PSI. This comes from eliminating tube friction, running lower PSI safely, and reducing overall system weight.'
          },
        ]
      },
      'emtb-tire-pressure-guide': {
        questions: [
          {
            q: 'What PSI should I run on an electric mountain bike?',
            a: 'For e-MTBs, start at 22-25 PSI in the rear and 24-28 PSI in the front for 2.4-2.6-inch tires. The extra weight of an e-bike (25-30 lbs more than regular MTB) means you need slightly higher pressure than non-electric MTBs.'
          },
          {
            q: 'Should front and rear PSI be different on an e-MTB?',
            a: 'Yes. Run 2-4 PSI higher in the front than the rear. The front tire carries more weight during braking and cornering, while the rear benefits from slightly lower pressure for traction on climbs.'
          },
          {
            q: 'Does the extra weight of an e-bike affect tire pressure?',
            a: 'E-bikes weigh 25-30 lbs more than regular mountain bikes due to the motor and battery. This means you need 2-5 PSI more than you would on a non-electric bike of the same tire size.'
          },
          {
            q: 'What tubeless PSI is safe for e-MTB trail riding?',
            a: 'For tubeless e-MTB setups, 18-22 PSI in the rear and 20-24 PSI in the front is a good starting point for 2.4-2.6-inch tires. Always ensure you have adequate sealant and check PSI before every ride.'
          },
        ]
      },
      'winter-cold-weather-ebike-tire-pressure': {
        questions: [
          {
            q: 'How much does cold weather drop e-bike tire pressure?',
            a: 'Tire pressure drops approximately 2 PSI for every 20°F (11°C) temperature drop. A tire inflated to 40 PSI at 70°F will read around 32 PSI at 30°F. Check pressure frequently during cold weather.'
          },
          {
            q: 'Should I inflate e-bike tires higher in winter?',
            a: 'Yes, but not to compensate for cold contraction. Inflate to your normal operating PSI when the tire is at outdoor temperature. Then add 2-3 PSI above your summer baseline on wet or icy surfaces for reduced rolling resistance.'
          },
          {
            q: 'Do e-bike tires lose air faster in cold weather?',
            a: 'The air inside the tire contracts (not leaks), which shows as lower pressure on a gauge. However, cold also stiffens the rubber and can slow minor seal leaks. Check tire pressure every 3-7 days in winter instead of weekly.'
          },
          {
            q: 'Can cold weather cause e-bike tire damage?',
            a: 'Cold rubber is less flexible and more prone to cracking and sidewall damage, especially when striking potholes or curbs. Check tires for cracks before every winter ride and consider slightly higher PSI on rough roads.'
          },
        ]
      },
      'hot-weather-ebike-tire-pressure': {
        questions: [
          {
            q: 'Should I lower tire pressure on my e-bike in hot weather?',
            a: 'Tire pressure increases approximately 2 PSI per 20°F of temperature rise. If you inflate at 70°F and ride at 100°F, your PSI will be about 3 PSI higher. On very hot pavement, consider starting 2-3 PSI below max to avoid exceeding tire limits.'
          },
          {
            q: 'Can over-inflated e-bike tires blow out in hot weather?',
            a: 'If you inflate to maximum sidewall PSI in a cool garage and then ride in 100°F+ heat, pressure can exceed the tire\'s maximum rating. Always account for temperature rise, especially on black asphalt which can be 20-30°F hotter than air temperature.'
          },
          {
            q: 'What is the ideal e-bike tire pressure for summer commuting?',
            a: 'For summer commuting, run your normal PSI but check it when the tire is warm (after riding). If it reads 5+ PSI above your target, reduce cold pressure by 2-3 PSI. Aim for 75-85% of your tire\'s maximum sidewall PSI for the best balance of range and comfort.'
          },
        ]
      },
      'fat-tire-sand-snow-psi': {
        questions: [
          {
            q: 'What PSI should fat tires run in sand?',
            a: 'For sand, run 5-8 PSI on 4.0-inch fat tires and 8-12 PSI on 3.0-inch tires. The low pressure creates a large contact patch that "floats" over soft sand instead of digging in.'
          },
          {
            q: 'Can you ride fat tires in snow on an e-bike?',
            a: 'Yes, fat tire e-bikes excel in snow. For packed snow, run 10-15 PSI. For deep powder, drop to 5-8 PSI on 4.0+ inch tires. The motor torque helps push through resistance that would stop a regular bike.'
          },
          {
            q: 'Do I need studded tires for snow riding on an e-bike?',
            a: 'On packed snow and ice, studded tires provide significantly better grip. On fresh powder, fat tires with aggressive tread work well without studs. Consider studs if you regularly ride on icy surfaces.'
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

