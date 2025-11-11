export default function HubPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold text-text mb-4 tracking-tight">
        E-Bike Tire Pressure Hub
      </h1>
      <p className="text-lg text-muted mb-8">
        Browse tire pressure recommendations for popular e-bike models. Each page includes
        detailed specifications, PSI tables, and a pre-configured calculator.
      </p>

      <div className="p-8 bg-surface rounded-2xl shadow-card text-center">
        <p className="text-muted text-lg mb-4">
          Model index will be populated in Phase 3.
        </p>
        <p className="text-sm text-muted">
          This page will list all 20+ e-bike models with quick links to individual model pages.
        </p>
      </div>

      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-surface rounded-2xl shadow-card">
          <h2 className="text-xl font-bold text-text mb-3">Model Coverage</h2>
          <p className="text-muted">
            Starting with popular brands like Lectric, Aventon, Rad Power, and more. Each model
            includes accurate specifications sourced from manufacturer data.
          </p>
        </div>

        <div className="p-6 bg-surface rounded-2xl shadow-card">
          <h2 className="text-xl font-bold text-text mb-3">Search Optimized</h2>
          <p className="text-muted">
            Every model page is search-engine optimized with structured data, making it easy for
            riders to find pressure recommendations for their specific bike.
          </p>
        </div>
      </div>
    </div>
  );
}
