export default function CalculatePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-3xl font-bold text-text mb-6 tracking-tight">
        E-Bike Tire Pressure Calculator
      </h1>

      <div className="space-y-6">
        {/* Placeholder for calculator components */}
        <div className="p-8 bg-surface rounded-2xl shadow-card text-center">
          <p className="text-muted text-lg">
            Calculator UI will be implemented in Phase 2.
          </p>
          <p className="text-sm text-muted mt-2">
            Components: PresetPicker, WeightSliders, SurfaceSelector, ConstructionSelector,
            TrikeToggle, ResultsCard
          </p>
        </div>

        <div className="p-6 bg-surface rounded-2xl shadow-card">
          <h2 className="text-xl font-bold text-text mb-3">Coming Soon</h2>
          <ul className="space-y-2 text-muted">
            <li>• Select from 20+ popular e-bike models</li>
            <li>• Real-time PSI calculations as you adjust inputs</li>
            <li>• Visual safety bands showing optimal pressure range</li>
            <li>• Warnings for pinch-flat risk and sidewall limits</li>
            <li>• Deep-link sharing with pre-filled values</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
