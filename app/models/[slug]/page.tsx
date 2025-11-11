export default async function ModelPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-text mb-4 tracking-tight">
        Model: {slug}
      </h1>

      <div className="p-8 bg-surface rounded-2xl shadow-card text-center">
        <p className="text-muted text-lg mb-4">
          Model pages will be generated in Phase 3.
        </p>
        <p className="text-sm text-muted">
          Each page will include: brand/model specs, PSI table, embedded calculator, FAQ section,
          and JSON-LD schema.
        </p>
      </div>

      <div className="mt-6 p-6 bg-surface rounded-2xl shadow-card">
        <h2 className="text-xl font-bold text-text mb-3">What to Expect</h2>
        <ul className="space-y-2 text-muted">
          <li>• Detailed bike specifications (weight, tire size, axle bias)</li>
          <li>• Pre-calculated PSI tables for common scenarios</li>
          <li>• Direct link to calculator with this model pre-selected</li>
          <li>• FAQ section specific to this bike model</li>
          <li>• Structured data for search engine optimization</li>
        </ul>
      </div>
    </div>
  );
}

// This will be populated in Phase 3
export async function generateStaticParams() {
  return [];
}
