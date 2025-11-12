"use client";

import type { ModelPreset } from "@/lib/types";

interface PresetPickerProps {
  models: ModelPreset[];
  selected: ModelPreset | null;
  onSelect: (model: ModelPreset) => void;
}

export default function PresetPicker({ models, selected, onSelect }: PresetPickerProps) {
  return (
    <div className="space-y-3">
      <label htmlFor="bike-preset" className="block text-sm font-semibold text-text mb-1">
        Select Your Bike
      </label>
      <select
        id="bike-preset"
        value={selected?.slug || ""}
        onChange={(e) => {
          const model = models.find((m) => m.slug === e.target.value);
          if (model) onSelect(model);
        }}
        className="w-full px-4 py-3.5 rounded-xl border-2 border-line bg-white text-text text-base focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors duration-150 cursor-pointer"
      >
        <option value="" disabled>
          Choose your e-bike model...
        </option>
        {models.map((model) => (
          <option key={model.slug} value={model.slug}>
            {model.brand} {model.model} — {model.stockTire.size}
          </option>
        ))}
      </select>
      {selected && (
        <div className="mt-4 p-4 bg-surface-light rounded-xl border border-slate-200">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-2 text-sm">
            <div>
              <div className="text-xs text-muted uppercase tracking-wide mb-0.5">Tire Size</div>
              <div className="font-semibold text-text">{selected.stockTire.size}</div>
            </div>
            <div>
              <div className="text-xs text-muted uppercase tracking-wide mb-0.5">Bike Weight</div>
              <div className="font-semibold text-text">{selected.bikeWeightLbs} lbs</div>
            </div>
            <div>
              <div className="text-xs text-muted uppercase tracking-wide mb-0.5">Sidewall PSI</div>
              <div className="font-semibold text-text">{selected.stockTire.minPSI}–{selected.stockTire.maxPSI}</div>
            </div>
            <div>
              <div className="text-xs text-muted uppercase tracking-wide mb-0.5">Casing</div>
              <div className="font-semibold text-text">
                {selected.stockTire.casing === "reinforced" ? "Reinforced" : "Standard"}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
