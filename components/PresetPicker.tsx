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
        Bike Model
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
        <div className="mt-3 p-3 bg-surface-light rounded-lg text-xs text-text-muted">
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <span>
              <strong className="text-text">Tire:</strong> {selected.stockTire.size}
            </span>
            <span>
              <strong className="text-text">Weight:</strong> {selected.bikeWeightLbs} lbs
            </span>
            <span>
              <strong className="text-text">PSI:</strong> {selected.stockTire.minPSI}–
              {selected.stockTire.maxPSI}
            </span>
            <span>
              <strong className="text-text">Casing:</strong>{" "}
              {selected.stockTire.casing === "reinforced" ? "Reinforced" : "Standard"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
