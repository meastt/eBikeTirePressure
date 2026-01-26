# Programmatic Page Templates

This document defines the component structure and content templates for each programmatic page type.

## Shared Components

All programmatic pages use these shared components:

### Breadcrumbs

```tsx
// components/Breadcrumbs.tsx (already exists)
interface BreadcrumbItem {
  label: string;
  href?: string;  // Optional - last item has no link
}

<Breadcrumbs
  items={[
    { label: 'Home', href: '/' },
    { label: 'Tire Sizes', href: '/tire-sizes' },
    { label: '20x4.0' },
  ]}
/>
```

### ModelGrid

```tsx
// components/programmatic/ModelGrid.tsx
interface ModelGridProps {
  models: ModelPreset[];
  showBrand?: boolean;
  showTireSize?: boolean;
  showPSIRange?: boolean;
  columns?: 2 | 3 | 4;
}

<ModelGrid
  models={filteredModels}
  showBrand={true}
  showPSIRange={true}
  columns={3}
/>
```

### PSIQuickTable

```tsx
// components/programmatic/PSIQuickTable.tsx
interface PSIQuickTableProps {
  riderWeights: number[];  // [140, 160, 180, 200, 220]
  minPSI: number;
  maxPSI: number;
  showBar?: boolean;       // For UK pages
}

<PSIQuickTable
  riderWeights={[140, 160, 180, 200, 220, 240]}
  minPSI={15}
  maxPSI={30}
  showBar={isUKPage}
/>
```

### FAQSection

```tsx
// components/programmatic/FAQSection.tsx
interface FAQItem {
  question: string;
  answer: string;
}

<FAQSection
  items={faqs}
  headingLevel="h2"      // or "h3" if nested
  expandable={true}      // Accordion style
/>
```

### CalculatorCTA

```tsx
// components/programmatic/CalculatorCTA.tsx
interface CalculatorCTAProps {
  title?: string;
  subtitle?: string;
  filterParams?: Record<string, string>;  // Pre-fill calculator
}

<CalculatorCTA
  title="Get Precise PSI for Your Fat Tire E-Bike"
  subtitle="Enter your weight and terrain for personalized recommendations"
  filterParams={{ tireCategory: 'fat-tire' }}
/>
```

### RelatedLinks

```tsx
// components/programmatic/RelatedLinks.tsx
interface RelatedLink {
  title: string;
  href: string;
  description?: string;
  icon?: string;
}

<RelatedLinks
  heading="Related Guides"
  links={[
    { title: 'All Fat Tire Models', href: '/fat-tire-ebike-tire-pressure', icon: '🚴' },
    { title: 'Sand & Snow Riding', href: '/beach-ebike-tire-pressure', icon: '🏖️' },
  ]}
/>
```

---

## Page Type 1: Tire Size Directory

**Route:** `/tire-size/[size]/page.tsx`
**Example:** `/tire-size/20x4-0/`

### Data Fetching

```tsx
// Get all unique tire sizes from models
export function getAllTireSizes(): string[] {
  const sizes = new Set<string>();
  models.forEach(m => sizes.add(normalizeTireSizeForUrl(m.stockTire.size)));
  return Array.from(sizes).sort();
}

// Get models by tire size
export function getModelsByTireSize(normalizedSize: string): ModelPreset[] {
  return models.filter(m => 
    normalizeTireSizeForUrl(m.stockTire.size) === normalizedSize
  );
}
```

### Page Structure

```tsx
export default function TireSizePage({ params }) {
  const { size } = params;
  const displaySize = denormalizeTireSize(size); // "20x4-0" → "20x4.0"
  const sizeModels = getModelsByTireSize(size);
  const avgMinPSI = calculateAveragePSI(sizeModels, 'min');
  const avgMaxPSI = calculateAveragePSI(sizeModels, 'max');
  
  const faqs = [
    {
      question: `What PSI should I run for ${displaySize} tires?`,
      answer: `For ${displaySize} tires, recommended PSI typically ranges from ${avgMinPSI} to ${avgMaxPSI} depending on rider weight and terrain.`
    },
    // ... more FAQs
  ];

  return (
    <>
      <JsonLd schemas={[breadcrumbSchema, faqSchema, itemListSchema]} />
      
      <main>
        <Breadcrumbs items={[
          { label: 'Home', href: '/' },
          { label: 'Tire Sizes', href: '/tire-sizes' },
          { label: displaySize },
        ]} />
        
        <header>
          <h1>{displaySize} E-Bike Tire Pressure Guide</h1>
          <p className="lead">
            Complete PSI recommendations for {sizeModels.length} e-bike models 
            with {displaySize} tires. Weight-based charts and terrain adjustments.
          </p>
        </header>
        
        <QuickStats
          items={[
            { label: 'Models', value: sizeModels.length },
            { label: 'PSI Range', value: `${avgMinPSI}-${avgMaxPSI}` },
            { label: 'Brands', value: uniqueBrands.length },
          ]}
        />
        
        <section>
          <h2>PSI by Rider Weight</h2>
          <PSIQuickTable
            riderWeights={[140, 160, 180, 200, 220, 240]}
            minPSI={avgMinPSI}
            maxPSI={avgMaxPSI}
          />
        </section>
        
        <section>
          <h2>All {displaySize} E-Bike Models</h2>
          <ModelGrid models={sizeModels} showBrand={true} />
        </section>
        
        <section>
          <h2>Terrain Adjustments for {displaySize} Tires</h2>
          <TerrainGuide tireWidth={parseTireWidth(displaySize)} />
        </section>
        
        <FAQSection items={faqs} />
        
        <CalculatorCTA 
          title={`Calculate Your ${displaySize} Tire Pressure`}
        />
        
        <RelatedLinks
          heading="Related Tire Sizes"
          links={getRelatedTireSizes(size)}
        />
      </main>
    </>
  );
}
```

### Metadata

```tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const displaySize = denormalizeTireSize(params.size);
  const models = getModelsByTireSize(params.size);
  
  return {
    title: `${displaySize} E-Bike Tire Pressure | ${models.length} Models | PSI Guide`,
    description: `Complete tire pressure guide for ${displaySize} e-bike tires. PSI charts for ${models.length} models from ${uniqueBrands.length} brands. Weight-based recommendations.`,
    alternates: {
      canonical: `https://ebikepsi.com/tire-size/${params.size}`,
    },
  };
}
```

---

## Page Type 2: Category Hub Pages

**Route:** `/[category]-ebike-tire-pressure/page.tsx`
**Example:** `/cargo-ebike-tire-pressure/`

### Category Definitions

```tsx
// lib/programmatic/categories.ts
export const CATEGORIES = {
  'cargo': {
    name: 'Cargo',
    displayName: 'Cargo E-Bike',
    description: 'Longtail and compact cargo e-bikes for hauling',
    keywords: ['cargo', 'longtail', 'hauling', 'family'],
    filter: (m: ModelPreset) => 
      m.bikeWeightLbs > 70 && m.axleBias.rear >= 0.58,
    contentFocus: 'load-based PSI, safety with cargo',
  },
  'folding': {
    name: 'Folding',
    displayName: 'Folding E-Bike',
    description: 'Compact folding e-bikes for commuting and storage',
    keywords: ['folding', 'compact', 'portable', 'commuter'],
    filter: (m: ModelPreset) => 
      m.stockTire.size.includes('16x') || 
      m.stockTire.size.includes('20x') && m.bikeWeightLbs < 60,
    contentFocus: 'small wheels, higher PSI',
  },
  'fat-tire': {
    name: 'Fat Tire',
    displayName: 'Fat Tire E-Bike',
    description: 'Wide tire e-bikes for all-terrain riding',
    keywords: ['fat tire', 'all-terrain', 'beach', 'snow'],
    filter: (m: ModelPreset) => {
      const width = parseFloat(m.stockTire.size.split('x')[1] || '0');
      return width >= 3.5;
    },
    contentFocus: 'low PSI, terrain flotation',
  },
  'commuter': {
    name: 'Commuter',
    displayName: 'Commuter E-Bike',
    description: 'Urban e-bikes for daily transportation',
    keywords: ['commuter', 'city', 'urban', 'daily'],
    filter: (m: ModelPreset) => {
      const width = parseFloat(m.stockTire.size.split('x')[1] || '0');
      return width >= 1.9 && width <= 2.6 && m.bikeWeightLbs < 65;
    },
    contentFocus: 'efficiency, pavement optimization',
  },
  'moto-style': {
    name: 'Moto-Style',
    displayName: 'Moto-Style E-Bike',
    description: 'Electric dirt bikes and moto-inspired e-bikes',
    keywords: ['moto', 'dirt bike', 'off-road', 'sur-ron'],
    filter: (m: ModelPreset) => 
      m.bikeWeightLbs > 100 || 
      ['Sur-Ron', 'Talaria', 'UBCO'].includes(m.brand),
    contentFocus: 'low PSI, off-road traction',
  },
};
```

### Page Structure

```tsx
export default function CategoryPage({ params }) {
  const categoryKey = params.category.replace('-ebike-tire-pressure', '');
  const category = CATEGORIES[categoryKey];
  const categoryModels = models.filter(category.filter);
  
  return (
    <>
      <JsonLd schemas={[breadcrumbSchema, faqSchema]} />
      
      <main>
        <Breadcrumbs items={[
          { label: 'Home', href: '/' },
          { label: `${category.displayName} Tire Pressure` },
        ]} />
        
        <header>
          <h1>{category.displayName} Tire Pressure Guide</h1>
          <p className="lead">{category.description}</p>
        </header>
        
        <QuickStats items={[...]} />
        
        <section>
          <h2>Why {category.name} E-Bikes Need Special PSI Attention</h2>
          <CategoryExplanation category={categoryKey} />
        </section>
        
        <section>
          <h2>PSI Recommendations by Weight</h2>
          <CategoryPSITable category={categoryKey} />
        </section>
        
        <section>
          <h2>All {category.displayName} Models ({categoryModels.length})</h2>
          <ModelGrid models={categoryModels} />
        </section>
        
        {categoryKey === 'cargo' && (
          <section>
            <h2>Cargo Load PSI Adjustments</h2>
            <CargoLoadGuide />
          </section>
        )}
        
        <FAQSection items={categoryFAQs} />
        <CalculatorCTA />
        <RelatedLinks links={relatedCategories} />
      </main>
    </>
  );
}
```

---

## Page Type 3: Comparison Pages

**Route:** `/compare/[...slugs]/page.tsx`
**Example:** `/compare/lectric-xp-3-vs-rad-power-radrunner/`

### URL Parsing

```tsx
// Extract model slugs from URL
function parseComparisonUrl(slugs: string[]): { modelA: string; modelB: string } | null {
  const fullSlug = slugs.join('/');
  const vsMatch = fullSlug.match(/^(.+)-vs-(.+)$/);
  if (!vsMatch) return null;
  return { modelA: vsMatch[1], modelB: vsMatch[2] };
}
```

### Page Structure

```tsx
export default function ComparisonPage({ params }) {
  const { modelA, modelB } = parseComparisonUrl(params.slugs);
  const bikeA = models.find(m => m.slug === modelA);
  const bikeB = models.find(m => m.slug === modelB);
  
  if (!bikeA || !bikeB) notFound();
  
  return (
    <>
      <JsonLd schemas={[breadcrumbSchema, comparisonSchema]} />
      
      <main>
        <Breadcrumbs items={[
          { label: 'Home', href: '/' },
          { label: 'Compare', href: '/compare' },
          { label: `${bikeA.brand} vs ${bikeB.brand}` },
        ]} />
        
        <header>
          <h1>{bikeA.brand} {bikeA.model} vs {bikeB.brand} {bikeB.model}</h1>
          <p className="lead">Side-by-side tire pressure and specs comparison</p>
        </header>
        
        <ComparisonTable
          models={[bikeA, bikeB]}
          fields={[
            'Tire Size',
            'PSI Range',
            'Bike Weight',
            'Front/Rear Bias',
            'Casing Type',
          ]}
        />
        
        <section>
          <h2>PSI Comparison by Rider Weight</h2>
          <DualPSITable modelA={bikeA} modelB={bikeB} />
        </section>
        
        <section>
          <h2>Which Bike is Right for You?</h2>
          <ComparisonVerdict modelA={bikeA} modelB={bikeB} />
        </section>
        
        <div className="grid grid-cols-2 gap-6">
          <section>
            <h2>More About {bikeA.brand} {bikeA.model}</h2>
            <ModelSummary model={bikeA} />
            <Link href={`/models/${bikeA.slug}`}>Full {bikeA.model} Guide →</Link>
          </section>
          <section>
            <h2>More About {bikeB.brand} {bikeB.model}</h2>
            <ModelSummary model={bikeB} />
            <Link href={`/models/${bikeB.slug}`}>Full {bikeB.model} Guide →</Link>
          </section>
        </div>
        
        <CalculatorCTA />
        
        <RelatedLinks
          heading="More Comparisons"
          links={getRelatedComparisons(bikeA, bikeB)}
        />
      </main>
    </>
  );
}
```

---

## Page Type 4: Weight-Based Pages

**Route:** `/[weight]-rider-tire-pressure/page.tsx`
**Example:** `/heavy-rider-ebike-tire-pressure/`

### Weight Categories

```tsx
export const WEIGHT_CATEGORIES = {
  'lightweight-rider': {
    name: 'Lightweight Rider',
    range: [100, 150],
    description: 'PSI recommendations for riders 100-150 lbs',
    adjustments: 'Run lower PSI for comfort, but avoid pinch flats',
  },
  'heavy-rider': {
    name: 'Heavy Rider',
    range: [220, 300],
    description: 'PSI recommendations for riders 220-300 lbs',
    adjustments: 'Higher PSI needed, consider reinforced tires',
  },
  '300-lb-rider': {
    name: '300+ lb Rider',
    range: [280, 400],
    description: 'PSI recommendations for riders 280-400 lbs',
    adjustments: 'Max PSI often needed, weight capacity important',
  },
};
```

### Page Structure

```tsx
export default function WeightCategoryPage({ params }) {
  const categoryKey = params.weight;
  const category = WEIGHT_CATEGORIES[categoryKey];
  
  // Filter models suitable for this weight range
  const suitableModels = models.filter(m => {
    const maxCapacity = estimateMaxCapacity(m);
    return maxCapacity >= category.range[1];
  });
  
  return (
    <>
      <main>
        <header>
          <h1>{category.name} E-Bike Tire Pressure Guide</h1>
          <p className="lead">
            Optimized PSI for riders {category.range[0]}-{category.range[1]} lbs
          </p>
        </header>
        
        <section>
          <h2>Why Weight Matters for Tire Pressure</h2>
          <WeightExplanation weightRange={category.range} />
        </section>
        
        <section>
          <h2>PSI Table for {category.range[0]}-{category.range[1]} lb Riders</h2>
          <WeightSpecificPSITable 
            weights={generateWeightRange(category.range)}
          />
        </section>
        
        <section>
          <h2>Best E-Bikes for {category.name}s ({suitableModels.length} models)</h2>
          <ModelGrid models={suitableModels} showWeightCapacity={true} />
        </section>
        
        <section>
          <h2>Tips for {category.name}s</h2>
          <WeightTips category={categoryKey} />
        </section>
        
        <FAQSection items={weightFAQs} />
        <CalculatorCTA 
          filterParams={{ riderWeight: category.range[0] }}
        />
      </main>
    </>
  );
}
```

---

## Page Type 5: Learn/Glossary Pages

**Route:** `/learn/[topic]/page.tsx`
**Example:** `/learn/pinch-flat/`

### Topic Definitions

```tsx
export const LEARN_TOPICS = {
  'psi-vs-bar': {
    title: 'PSI vs Bar: Tire Pressure Units Explained',
    description: 'Understanding the difference between PSI and Bar',
    content: 'markdown content or component',
  },
  'pinch-flat': {
    title: 'What is a Pinch Flat? Prevention Guide',
    description: 'How pinch flats happen and how to prevent them',
  },
  'tire-sidewall-numbers': {
    title: 'Tire Sidewall Numbers Explained',
    description: 'Decoding the numbers on your e-bike tire',
  },
  // ... more topics
};
```

### Page Structure

```tsx
export default function LearnPage({ params }) {
  const topic = LEARN_TOPICS[params.topic];
  
  return (
    <>
      <JsonLd schemas={[articleSchema, faqSchema]} />
      
      <main>
        <Breadcrumbs items={[
          { label: 'Home', href: '/' },
          { label: 'Learn', href: '/learn' },
          { label: topic.title },
        ]} />
        
        <article>
          <header>
            <h1>{topic.title}</h1>
            <p className="lead">{topic.description}</p>
          </header>
          
          <TopicContent topic={params.topic} />
          
          <FAQSection items={topicFAQs} />
        </article>
        
        <aside>
          <h2>Related Topics</h2>
          <TopicLinks exclude={params.topic} />
        </aside>
        
        <CalculatorCTA />
      </main>
    </>
  );
}
```

---

## Component File Structure

```
components/
├── programmatic/
│   ├── index.ts                 # Barrel export
│   ├── ModelGrid.tsx            # Model listing grid
│   ├── PSIQuickTable.tsx        # Weight-based PSI table
│   ├── ComparisonTable.tsx      # Side-by-side comparison
│   ├── FAQSection.tsx           # Expandable FAQ
│   ├── CalculatorCTA.tsx        # CTA block
│   ├── RelatedLinks.tsx         # Related content links
│   ├── QuickStats.tsx           # Stats summary card
│   ├── TerrainGuide.tsx         # Terrain adjustments
│   ├── CategoryExplanation.tsx  # Category-specific content
│   ├── WeightTips.tsx           # Weight-specific tips
│   └── JsonLd.tsx               # Schema markup wrapper
```

## Styling Guidelines

All programmatic page components should:

1. Use existing Tailwind classes from `globals.css`
2. Follow the established card/surface patterns
3. Maintain consistent spacing (use `space-y-*`, `gap-*`)
4. Be mobile-first responsive
5. Support dark mode if site adds it later

```tsx
// Consistent card styling
<div className="card p-6 bg-white rounded-2xl shadow-card">
  {/* Content */}
</div>

// Consistent section spacing
<section className="mb-16">
  <h2 className="text-3xl font-heading font-bold text-text mb-6">
    {title}
  </h2>
  {/* Content */}
</section>

// Consistent CTA styling
<div className="bg-gradient-brand text-white p-10 rounded-2xl text-center">
  {/* CTA content */}
</div>
```
