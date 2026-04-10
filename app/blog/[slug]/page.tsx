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
      'best-ebike-tires-2026': {
        questions: [
          {
            q: 'What makes a tire "e-bike rated"?',
            a: 'E-bike rated tires (marked E-25 or E-50) are tested to handle the extra weight (50+ lbs) and motor torque of electric bikes. They have reinforced casings, puncture protection belts, and compounds that resist the faster wear caused by e-bike speeds and weight.'
          },
          {
            q: 'Can I use regular bike tires on an e-bike?',
            a: 'You can, but they\'ll wear out 2-3x faster than e-bike rated tires and won\'t handle the load and torque as well. Regular tires also have higher flat risk on e-bikes due to the extra weight passing over debris.'
          },
          {
            q: 'How often should e-bike tires be replaced?',
            a: 'E-bike tires typically last 1,500-3,000 miles depending on riding style, terrain, and tire quality. Commuters on pavement get the most mileage; cargo and off-road riders may need replacement every 1,000-1,500 miles. Check wear indicators monthly.'
          },
          {
            q: 'Are Schwalbe Marathon tires good for e-bikes?',
            a: 'The Schwalbe Marathon Plus is one of the most popular e-bike tires for commuting thanks to its SmartGuard puncture protection. It\'s heavy but extremely durable. For lighter performance, the Schwalbe Energizer Plus is a good e-bike-specific option.'
          },
        ]
      },
      'ebike-tire-pressure-maintenance-schedule': {
        questions: [
          {
            q: 'How often should I check my e-bike tire pressure?',
            a: 'Check e-bike tire pressure at least once a week, or before every ride if you commute daily. E-bikes lose 1-3 PSI per week under normal conditions, and the extra weight makes correct PSI more critical than on regular bikes.'
          },
          {
            q: 'Do e-bike tires lose air faster than regular bike tires?',
            a: 'E-bike tires experience more stress due to higher weight and motor vibration, which can slightly accelerate air loss through the rubber. Higher-PSI road e-bike tires lose more volume per week than low-PSI fat tires, but both need regular checking.'
          },
          {
            q: 'How do I create a tire pressure maintenance schedule?',
            a: 'Set a weekly reminder (same day each week). Use a digital gauge, not a thumb check. Record the PSI for front and rear to track trends. Any drop of 5+ PSI in a week suggests a slow leak that needs investigation.'
          },
          {
            q: 'Is there an easy way to check e-bike tire pressure without a gauge?',
            a: 'The squeeze test works for rough checks — press both thumbs into the sidewall. For e-bikes, this isn\'t accurate enough because the wrong PSI affects range, handling, and flat risk. Invest in a reliable digital gauge ($10-15).' 
          },
        ]
      },
      'how-much-air-in-ebike-tires': {
        questions: [
          {
            q: 'Where do I find the correct tire pressure for my e-bike?',
            a: 'The sidewall of your tire shows the recommended PSI range (e.g., "30-50 PSI"). Start at the midpoint and adjust based on your rider weight, cargo, terrain, and comfort. Heavier riders should be toward the higher end.'
          },
          {
            q: 'How much PSI does a 200 lb rider need on an e-bike?',
            a: 'For standard 2.0-2.4 inch tires, a 200 lb rider typically needs 35-45 PSI. For 2.8-3.0 inch tires, 22-30 PSI. For 4.0 inch fat tires, 12-18 PSI. The exact number depends on terrain and whether you carry cargo.'
          },
          {
            q: 'Can over-inflated e-bike tires cause problems?',
            a: 'Yes. Over-inflation reduces traction, makes the ride harsh, increases the risk of blowouts on hot pavement, and can actually decrease range on rough surfaces because the tire bounces instead of rolling smoothly.'
          },
        ]
      },
      'ebike-tire-pressure-chart': {
        questions: [
          {
            q: 'What PSI should my e-bike tires be?',
            a: 'It depends on tire width and rider weight. As a starting guide: 2.0" tires at 35-45 PSI, 2.4" at 30-40 PSI, 2.8" at 22-30 PSI, 3.0" at 18-25 PSI, 4.0" fat tires at 12-20 PSI. Adjust up for heavier riders and down for rough terrain.'
          },
          {
            q: 'Should front and rear e-bike tire pressure be the same?',
            a: 'No. The rear tire typically carries 60% of total weight (rider + cargo), so run 2-5 PSI higher in the rear on commuter e-bikes. On trail e-bikes where front-end grip matters, you might run them equal or even slightly higher in front.'
          },
          {
            q: 'Does e-bike motor type affect tire pressure?',
            a: 'Mid-drive motors concentrate more weight over the rear wheel, requiring 2-4 PSI more in the rear compared to hub motor setups. Hub motors distribute weight more evenly, so front/rear can be closer.'
          },
        ]
      },
      'tubed-vs-tubeless-ebike-psi': {
        questions: [
          {
            q: 'Should I run tubeless tires on my e-bike?',
            a: 'Tubeless e-bike tires let you run 3-8 PSI lower than tubed setups without pinch flat risk, giving better traction and comfort. They also self-seal small punctures. The main downside is more complex setup and sealant maintenance.'
          },
          {
            q: 'How much lower can you run tubeless vs tubed on an e-bike?',
            a: 'You can typically run tubeless tires 3-8 PSI lower than tubed equivalents, depending on riding style. Commuters might run 3-5 PSI lower; trail riders can go 5-8 PSI lower for maximum grip on loose terrain.'
          },
          {
            q: 'Does the extra weight of an e-bike make tubeless harder to set up?',
            a: 'Not really. The setup process (bead seating, initial inflation) is the same regardless of bike type. However, the e-bike\'s weight puts more stress on the bead during riding, so ensure your rims and tires are properly matched and seated.'
          },
        ]
      },
      'mid-drive-vs-hub-motor-tire-pressure': {
        questions: [
          {
            q: 'Do mid-drive e-bikes need different tire pressure than hub motors?',
            a: 'Yes. Mid-drive motors put more weight over the rear wheel because the motor is at the crank. Run 2-4 PSI higher in the rear on mid-drive e-bikes. Hub motors add weight at the axle, distributing load more evenly.'
          },
          {
            q: 'Does a hub motor affect front tire pressure?',
            a: 'A rear hub motor doesn\'t directly affect the front tire, but the overall weight balance changes. You may want to run the front 1-2 PSI lower for better steering grip since the rear is weighted down by the motor.'
          },
          {
            q: 'What PSI is best for a mid-drive e-bike on trails?',
            a: 'For mid-drive trail e-bikes with 2.4-2.6" tires, start at 20-22 PSI rear and 22-25 PSI front. The mid-drive\'s weight bias means the rear needs slightly more pressure to avoid burping during aggressive cornering.'
          },
        ]
      },
      'ebike-tire-sidewall-numbers-explained': {
        questions: [
          { q: 'What do the numbers on my e-bike tire sidewall mean?', a: 'The sidewall shows: tire size (e.g., 26×2.4 or 62-559 ETRTO), PSI range (e.g., 30-50 PSI), load rating (e.g., 65 kg), and sometimes an E-bike rating (E-25 or E-50). These numbers tell you safe operating limits.' },
          { q: 'What does E-25 or E-50 mean on a tire sidewall?', a: 'E-25 means the tire is tested for use on e-bikes up to 25 km/h (15.5 mph). E-50 is rated for e-bikes up to 50 km/h (31 mph). These ratings confirm the tire handles e-bike weight and motor torque safely.' },
          { q: 'Should I run my e-bike tires at the maximum PSI listed on the sidewall?', a: 'No. The max PSI is the tire\'s safety limit, not a target. Most riders should run 70-85% of max PSI for the best balance of range, comfort, and grip. Heavy riders may need to go closer to max.' },
          { q: 'How do I read ETRTO tire size numbers?', a: 'ETRTO format (e.g., 62-559) shows the tire width in mm (62mm) and the bead seat diameter in mm (559mm). This is the most accurate sizing system — use it when matching tires to rims, not the inch-based sizing.' },
        ]
      },

      'ebike-tire-wear-patterns-psi': {
        questions: [
          { q: 'What does center-only tire wear mean on an e-bike?', a: 'Center-only wear means you\'re running too high PSI, concentrating all contact on the tread center. Reduce PSI by 3-5 PSI to distribute wear across the full tread width and extend tire life.' },
          { q: 'Can wrong PSI cause uneven tire wear on e-bikes?', a: 'Yes. Over-inflated tires wear faster in the center; under-inflated tires wear on the edges. Both patterns reduce tire life by 20-40%. Maintaining correct PSI is the single most effective way to extend e-bike tire life.' },
          { q: 'Does the motor type affect e-bike tire wear?', a: 'Mid-drive motors cause more rear tire wear because torque goes through the drivetrain to the rear wheel. Hub motors put direct rotational force on the wheel, also increasing rear tire wear. Rear tires typically wear 2x faster than front on any e-bike.' },
          { q: 'How often should I rotate e-bike tires?', a: 'E-bike tires don\'t "rotate" in the car sense (different sizes front/rear are common). But you should inspect wear patterns monthly and adjust PSI to match the wear pattern you see. Swap a rear tire to the front when it\'s half-worn to extend total life.' },
        ]
      },
      'ebike-tire-wear-signs-replace': {
        questions: [
          { q: 'How do I know when my e-bike tires need replacing?', a: 'Replace tires when you see: worn tread with flat spots, visible casing threads, sidewall cracks, frequent flats, or flat spots that cause vibration. E-bike tires wear faster due to weight and torque — don\'t wait for a blowout.' },
          { q: 'How many miles do e-bike tires typically last?', a: 'Commuter e-bike tires last 1,500-3,000 miles. Off-road and cargo e-bike tires may need replacement every 1,000-1,500 miles. Higher PSI and aggressive riding accelerate wear.' },
          { q: 'Are worn e-bike tires more dangerous than worn regular bike tires?', a: 'Yes. The extra weight and speed of e-bikes mean worn tires are more likely to fail catastrophically. A blowout at 20 mph on a 60-lb e-bike is much more dangerous than at 12 mph on a 25-lb bike.' },
        ]
      },
      'ebike-tires-sand-snow-guide': {
        questions: [
          { q: 'What PSI should I run on my e-bike for sand riding?', a: 'For sand, run 5-8 PSI on 4.0" fat tires and 8-12 PSI on 3.0" tires. The low pressure creates a wide contact patch that "floats" over sand instead of digging in.' },
          { q: 'Can I ride an e-bike in snow with regular tires?', a: 'Regular tires on packed snow are possible at reduced PSI (5-10 PSI below normal), but studded or fat tires are strongly recommended. The e-bike motor can overpower what little traction soft tires provide on ice.' },
          { q: 'Should I lower PSI when riding in cold weather on an e-bike?', a: 'Cold air contracts, dropping PSI by ~2 PSI per 20°F. Inflate to your target PSI when the tire is at outdoor temperature, then don\'t lower further for cold — the pressure will already be lower than it was in warm weather.' },
        ]
      },
      'how-long-do-ebike-tires-last': {
        questions: [
          { q: 'How many miles do e-bike tires last on average?', a: 'Commuter e-bike tires last 1,500-3,000 miles. Off-road riders may need replacement every 1,000-1,500 miles. Cargo e-bikes carrying heavy loads may need new tires every 800-1,200 miles.' },
          { q: 'Do e-bike tires wear out faster than regular bike tires?', a: 'Yes. The extra weight (25-40 lbs), higher speeds, and motor torque all accelerate tire wear. Expect 20-40% shorter tire life compared to a non-electric bike with the same tires.' },
          { q: 'What extends e-bike tire life?', a: 'Maintaining correct PSI (the #1 factor), avoiding hard acceleration and braking, keeping tires clean, rotating between front and rear when possible, and storing the bike out of direct sunlight to prevent rubber degradation.' },
        ]
      },
      'longtail-cargo-ebike-tire-pressure-guide': {
        questions: [
          { q: 'What PSI should I run on a Tern GSD or similar longtail cargo e-bike?', a: 'The Tern GSD uses 20" wheels with high-pressure tires. With a single rider, run 45-55 PSI front and 50-60 PSI rear. With two kids in the back, increase rear PSI by 10-15 PSI.' },
          { q: 'How do I calculate PSI for different cargo loads on a longtail e-bike?', a: 'Start with your solo-rider baseline. Add 2-3 PSI to the rear tire for every 25 lbs of cargo or passenger weight. For dual-kid setups (60-80 lbs rear load), expect to add 6-10 PSI to the rear tire.' },
          { q: 'Do smaller wheels on longtail cargo e-bikes need higher PSI?', a: 'Yes. 20" wheels need higher PSI than 26-29" wheels to support the same weight because the smaller air volume compresses more. 20" cargo tires often run 40-65 PSI compared to 25-45 PSI on standard e-bike tires.' },
          { q: 'Should front tire pressure change on a longtail with a rear passenger?', a: 'Front tire PSI changes minimally with rear loading — add only 2-3 PSI to maintain steering stability. The long wheelbase of cargo bikes means weight distribution matters less than on standard e-bikes.' },
        ]
      },
      'preventing-tire-burping-tubeless-ebikes': {
        questions: [
          { q: 'What causes tire burping on tubeless e-bikes?', a: 'Burping happens when lateral forces (hard cornering) break the tire bead seal against the rim, releasing air. E-bikes are more prone to it because the extra weight and motor torque increase lateral forces on the tire.' },
          { q: 'How do I prevent tire burping on my e-bike?', a: 'Run 2-4 PSI higher than your minimum comfortable pressure. Ensure the bead is evenly seated around the rim. Use fresh sealant. Match tire and rim widths — too-wide tires on narrow rims increase burping risk.' },
          { q: 'Does e-bike motor torque make burping worse?', a: 'Yes, especially mid-drive motors that send high torque through the rear wheel. Rapid acceleration in corners can unseat the bead faster on an e-bike than on a regular bike. Smooth inputs help.' },
        ]
      },
      'temperature-effects-ebike-tire-pressure': {
        questions: [
          { q: 'How much does temperature change affect e-bike tire pressure?', a: 'Tire pressure changes approximately 2 PSI for every 20°F (11°C) temperature change. A tire at 40 PSI at 80°F will read around 32 PSI at 40°F — enough to affect handling and flat risk.' },
          { q: 'Should I adjust tire pressure seasonally on my e-bike?', a: 'At a minimum, check and adjust at the start of each season. In extreme climates (below 20°F or above 100°F), check monthly. A good rule: check pressure whenever the temperature changes more than 20°F from your last ride.' },
          { q: 'Do e-bike tires lose more air in hot or cold weather?', a: 'Tires don\'t "lose" air from temperature — the air expands or contracts inside. However, heat can accelerate sealant drying (tubeless) and soften rubber, increasing permeability. Cold makes rubber stiff, which can slow minor leaks but also makes tires more vulnerable to impacts.' },
        ]
      },
      'why-ebike-feels-sluggish-under-inflated-tires': {
        questions: [
          { q: 'Can under-inflated tires make my e-bike feel slow?', a: 'Yes. Running 10 PSI below optimal increases rolling resistance by 15-25%, making the bike feel sluggish, draining battery faster, and reducing your top speed by 2-4 mph.' },
          { q: 'How much battery range do I lose from under-inflated e-bike tires?', a: 'Typically 5-15% depending on how far below optimal you are. On a 40-mile range e-bike, running 8 PSI under could cost you 2-6 miles per charge.' },
          { q: 'What PSI should I check before riding to avoid sluggishness?', a: 'Check your tire\'s sidewall for the recommended range and run near the upper half. For most commuter e-bikes with 2.0" tires, 40-50 PSI is the sweet spot. Check pressure weekly — tires lose 1-2 PSI per week naturally.' },
        ]
      },
    };
    'best-ebikes-heavy-riders-2026': {
      questions: [
        { q: 'What weight limit should heavy riders look for in an e-bike?', a: 'Look for e-bikes rated for 300+ lbs to safely accommodate a 250+ lb rider plus any cargo. Budget an additional 50 lbs headroom above your total expected weight (rider + gear).' },
        { q: 'Do heavy riders need special tires on an e-bike?', a: 'Yes. Wider tires (2.8" or more) with reinforced casings distribute weight better and handle higher PSI ranges. Standard 2.0" commuter tires may not provide enough load capacity for heavier riders.' },
        { q: 'How does rider weight affect e-bike tire pressure?', a: 'Heavier riders need higher PSI to prevent pinch flats and rim damage. A 250 lb rider on standard tires typically needs 40-50 PSI, compared to 30-40 PSI for a 160 lb rider. Always stay below the tire\'s maximum sidewall PSI.' },
        { q: 'Are step-through e-bikes good for heavy riders?', a: 'Step-through frames make mounting easier but may flex more under heavier loads. Look for step-through models with reinforced lower tubes and higher weight ratings. Traditional diamond frames typically offer more rigidity for heavier riders.' },
      ]
    },
    'cargo-ebike-passenger-psi': {
      questions: [
        { q: 'How much should I increase PSI when carrying a second passenger on my cargo e-bike?', a: 'Add 5-8 PSI to the rear tire per 50 lbs of additional passenger weight. A typical adult passenger adds 120-180 lbs, requiring 12-20 PSI more in the rear tire than your solo setup.' },
        { q: 'Should the front tire pressure change when carrying cargo on an e-bike?', a: 'Front tire PSI changes minimally with rear cargo — add only 1-2 PSI to the front. The front tire carries less of the additional load, but slight increases improve steering stability under heavy rear loads.' },
        { q: 'Do cargo e-bike tires have different pressure limits than regular e-bikes?', a: 'Yes. Cargo e-bike tires often have reinforced sidewalls and higher max PSI ratings (up to 65-75 PSI vs 50-60 PSI for standard e-bikes). Always check the sidewall for your specific tire\'s maximum pressure rating.' },
        { q: 'How do I calculate total weight for cargo e-bike PSI adjustment?', a: 'Add up: rider weight + passenger weight + cargo weight + bike weight. Then compare to your tire\'s load rating. For every 50 lbs over your solo baseline, add 2-3 PSI to the rear and 1 PSI to the front tire.' },
      ]
    },
    'carrying-kids-on-ebike-tire-pressure-guide': {
      questions: [
        { q: 'How much should I increase tire pressure when installing a child seat on my e-bike?', a: 'Add 3-5 PSI to the rear tire for a child plus seat (typically 40-55 lbs total). The rear wheel carries most of the child\'s weight, so prioritize rear tire pressure over front adjustments.' },
        { q: 'Is it safe to carry a child if my e-bike tires are at normal PSI?', a: 'No. Unadjusted PSI with a child seat can cause rear tire "squirm" during cornering, making the bike feel wobbly and unstable. Always increase rear PSI before your first ride with a child passenger.' },
        { q: 'Should I check tire pressure more often when carrying kids on my e-bike?', a: 'Yes. Check before every trip with a child passenger. Under-inflated tires while carrying children increase the risk of pinch flats and braking instability — a critical safety concern.' },
        { q: 'Does a front-mounted child seat affect tire pressure differently than rear-mounted?', a: 'Front-mounted seats shift weight toward the front wheel. Increase front tire PSI by 3-5 PSI (instead of rear) for front-mounted seat setups. Some setups with both front and rear seats require increases on both tires.' },
      ]
    },
    'class-3-ebike-high-speed-psi-safety': {
      questions: [
        { q: 'Does high speed affect what tire pressure my Class 3 e-bike needs?', a: 'Yes. At 28 mph, tires generate significantly more heat and stress than at 15 mph. Run 2-5 PSI below your tire\'s maximum sidewall rating to account for heat buildup and pressure increase during sustained high-speed riding.' },
        { q: 'Can e-bike tires blow out at high speed?', a: 'If inflated to maximum PSI on a cool morning and then ridden at 28 mph in hot weather, the combined heat can push pressure past the tire\'s rating. Always leave 3-5 PSI below max for high-speed riding.' },
        { q: 'Should I use different tires for Class 3 e-bikes?', a: 'Use tires with an E-50 rating (tested for 50 km/h speeds). Standard bicycle tires without speed ratings may not be safe for sustained 28 mph riding. Look for E-50, Speed, or HS markings on the sidewall.' },
        { q: 'How does tire pressure affect range on a Class 3 e-bike?', a: 'Higher PSI reduces rolling resistance and improves range — but at high speeds, slightly lower PSI (below max) can provide better grip and stability. Find the highest PSI that still leaves 3-5 PSI headroom for heat buildup.' },
      ]
    },
    'convert-ebike-tubeless-tires-guide': {
      questions: [
        { q: 'Can any e-bike tire be converted to tubeless?', a: 'Only tubeless-ready (TR) or tubeless-compatible tires can be safely converted. Check the sidewall for "TR," "Tubeless Ready," or "Tubeless Compatible" markings. Standard tires without these labels should not be converted.' },
        { q: 'How much lower can I run PSI with tubeless e-bike tires?', a: 'Tubeless e-bike tires let you run 5-8 PSI lower than tubed equivalents without pinch flat risk. This improves traction, comfort, and rolling resistance on rough surfaces.' },
        { q: 'Do tubeless tires work well on heavier e-bikes?', a: 'Yes. The extra e-bike weight actually helps seat the bead more firmly on the rim. However, you may need a bit more sealant (60-90ml) compared to standard bike setups (30-60ml).' },
        { q: 'How often do tubeless e-bike tires need sealant replacement?', a: 'Replace sealant every 3-6 months, or more frequently in hot weather when it dries faster. E-bike vibration can accelerate sealant drying compared to regular bikes.' },
      ]
    },
    'ebike-commuting-tire-pressure-potholes': {
      questions: [
        { q: 'What PSI is best for e-bike commuting on city streets with potholes?', a: 'For 2.0-2.4" tires, run 40-45 PSI on smooth city streets, then reduce by 3-5 PSI on rougher routes. The goal is firm enough to resist pinch flats on potholes but soft enough to absorb smaller bumps.' },
        { q: 'Should I lower tire pressure when it rains?', a: 'Lower PSI by 2-3 PSI when riding in wet conditions for better traction. On wet pavement with potholes, balance this by keeping PSI high enough to prevent rim strikes — find your route\'s specific sweet spot.' },
        { q: 'Do wider tires help with pothole impacts on e-bikes?', a: 'Yes. A 2.4" tire at 35 PSI absorbs pothole impacts better than a 2.0" tire at 45 PSI. If your frame and fork allow, wider tires at lower PSI are more comfortable and safer on rough urban roads.' },
        { q: 'How do speed bumps affect e-bike tire pressure choices?', a: 'Speed bumps are essentially deliberate potholes. If your commute has many speed bumps, reduce PSI by 3-5 PSI below what you\'d run on smooth roads. The extra cushion protects your rims and improves comfort.' },
      ]
    },
    'ebike-gravel-tire-pressure-guide': {
      questions: [
        { q: 'What is the ideal tire pressure for e-bike gravel riding?', a: 'For 2.0" gravel tires, start at 35-40 PSI. For 2.4" tires, 30-35 PSI. For 2.8" tires, 22-28 PSI. Adjust lower for loose terrain and higher for hardpack and pavement transitions.' },
        { q: 'Should I adjust tire pressure during a mixed-terrain e-bike ride?', a: 'Yes. If your route transitions between pavement and gravel, consider stopping at the trailhead to adjust. Running pavement-tire pressure on gravel wastes battery and reduces traction; gravel pressure on pavement increases rolling resistance.' },
        { q: 'Does tubeless help for e-bike gravel riding?', a: 'Tubeless is especially beneficial for gravel e-bikes. You can run 5-8 PSI lower without pinch flat risk, which makes a huge difference on rocky or root-covered gravel sections where the e-bike\'s extra weight becomes a liability.' },
      ]
    },
    'ebike-tire-pressure-commuting-guide': {
      questions: [
        { q: 'What PSI should I run for e-bike commuting?', a: 'For 2.0" commuter tires, a good starting point is 40-50 PSI. For a 180 lb rider on 2.0" tires with no cargo, aim for 45 PSI. Adjust ±3 PSI based on comfort and road conditions.' },
        { q: 'How often should commuters check e-bike tire pressure?', a: 'Check weekly at minimum. E-bike tires lose 1-2 PSI per week, and running even 5 PSI under optimal can reduce range by 5-10% and increase flat risk. Set a phone reminder for the same day each week.' },
        { q: 'Does tire pressure affect e-bike commute range?', a: 'Yes. Under-inflated tires increase rolling resistance and can reduce range by 5-15%. A commuter running 10 PSI below optimal on a 40-mile range e-bike might lose 2-6 miles of range per charge.' },
      ]
    },
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

