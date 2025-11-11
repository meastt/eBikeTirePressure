"use client";

import type { ModelPreset } from "@/lib/types";

interface PresetPickerProps {
  models: ModelPreset[];
  selected: ModelPreset | null;
  onSelect: (model: ModelPreset) => void;
}

export default function PresetPicker({ models, selected, onSelect }: PresetPickerProps) {
  return (
    <div className="space-y-2">
      <label htmlFor="bike-preset" className="block text-sm font-semibold text-text">
        Select Your E-Bike
      </label>
      <select
        id="bike-preset"
        value={selected?.slug || ""}
        onChange={(e) => {
          const model = models.find((m) => m.slug === e.target.value);
          if (model) onSelect(model);
        }}
        className="w-full px-4 py-3 rounded-xl border border-line bg-white text-text focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
      >
        <option value="" disabled>
          Choose a model...
        </option>
        {models.map((model) => (
          <option key={model.slug} value={model.slug}>
            {model.brand} {model.model} — {model.stockTire.size}
          </option>
        ))}
      </select>
      {selected && (
        <div className="mt-3 p-3 bg-surface rounded-lg text-sm text-muted">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="font-medium text-text">Tire:</span> {selected.stockTire.size}
            </div>
            <div>
              <span className="font-medium text-text">Bike Weight:</span> {selected.bikeWeightLbs} lbs
            </div>
            <div>
              <span className="font-medium text-text">PSI Range:</span> {selected.stockTire.minPSI}-
              {selected.stockTire.maxPSI}
            </div>
            <div>
              <span className="font-medium text-text">Casing:</span>{" "}
              {selected.stockTire.casing === "reinforced" ? "Reinforced" : "Standard"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
