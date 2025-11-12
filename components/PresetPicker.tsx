"use client";

import { useState, useEffect, useMemo } from "react";
import { Combobox } from "@headlessui/react";
import type { ModelPreset } from "@/lib/types";
import { getEffectivePSI } from "@/lib/tirePSIDefaults";

interface PresetPickerProps {
  models: ModelPreset[];
  selected: ModelPreset | null;
  onSelect: (model: ModelPreset) => void;
  error?: string;
}

export default function PresetPicker({ models, selected, onSelect, error }: PresetPickerProps) {
  const [query, setQuery] = useState("");
  const [recentSelections, setRecentSelections] = useState<ModelPreset[]>([]);

  // Load recent selections from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("recentBikeSelections");
    if (stored) {
      try {
        const slugs = JSON.parse(stored) as string[];
        const recent = slugs
          .map(slug => models.find(m => m.slug === slug))
          .filter((m): m is ModelPreset => m !== undefined)
          .slice(0, 3);
        setRecentSelections(recent);
      } catch {
        // Ignore invalid localStorage data
      }
    }
  }, [models]);

  // Save recent selection to localStorage
  const saveRecentSelection = (model: ModelPreset) => {
    const updated = [model, ...recentSelections.filter(m => m.slug !== model.slug)].slice(0, 3);
    setRecentSelections(updated);
    localStorage.setItem("recentBikeSelections", JSON.stringify(updated.map(m => m.slug)));
  };

  // Group models by brand
  const groupedModels = useMemo(() => {
    const groups: Record<string, ModelPreset[]> = {};
    models.forEach(model => {
      if (!groups[model.brand]) {
        groups[model.brand] = [];
      }
      groups[model.brand].push(model);
    });
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  }, [models]);

  // Filter models based on search query with fuzzy matching
  const filteredModels = useMemo(() => {
    if (!query) return groupedModels;

    const searchTerm = query.toLowerCase();
    return groupedModels
      .map(([brand, brandModels]) => {
        const filteredBrandModels = brandModels.filter(model =>
          model.brand.toLowerCase().includes(searchTerm) ||
          model.model.toLowerCase().includes(searchTerm) ||
          model.stockTire.size.toLowerCase().includes(searchTerm) ||
          `${model.brand} ${model.model}`.toLowerCase().includes(searchTerm)
        );
        return filteredBrandModels.length > 0 ? [brand, filteredBrandModels] : null;
      })
      .filter((group): group is [string, ModelPreset[]] => group !== null);
  }, [groupedModels, query]);

  // Handle selection
  const handleSelect = (model: ModelPreset | null) => {
    if (model) {
      onSelect(model);
      saveRecentSelection(model);
      setQuery("");
    }
  };

  return (
    <div className="space-y-3">
      <Combobox value={selected} onChange={handleSelect}>
        <div className="relative">
          <Combobox.Label className="block text-sm font-semibold text-text mb-1">
            Select Your Bike
          </Combobox.Label>
          <div className="relative">
            <Combobox.Input
              className={`w-full px-4 py-3.5 rounded-xl border-2 bg-white text-text text-base focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-all duration-200 shadow-sm ${
                error ? 'border-danger focus:ring-danger focus:border-danger' : 'border-slate-200 hover:border-brand/30'
              }`}
              placeholder="Search brands, models, or tire sizes..."
              displayValue={(model: ModelPreset | null) =>
                model ? `${model.brand} ${model.model} — ${model.stockTire.size}` : ""
              }
              onChange={(event) => setQuery(event.target.value)}
              aria-invalid={!!error}
              aria-describedby={error ? "model-error" : undefined}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg className="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Combobox.Button>
          </div>

          {error && (
            <p id="model-error" className="mt-2 text-sm text-danger" role="alert">
              {error}
            </p>
          )}

          <Combobox.Options className="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-xl bg-white py-2 text-base shadow-xl ring-1 ring-slate-200 focus:outline-none border border-slate-100">
            {query === "" && recentSelections.length > 0 && (
              <div className="px-4 py-2 text-xs font-medium text-muted uppercase tracking-wide border-b border-gray-200">
                Recent Selections
              </div>
            )}

            {query === "" && recentSelections.map((model) => (
              <Combobox.Option
                key={`recent-${model.slug}`}
                value={model}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2.5 pl-4 pr-4 rounded-lg mx-1 ${
                    active ? "bg-gradient-brand text-white shadow-md" : "text-gray-900 hover:bg-brand-50"
                  } transition-all duration-150`
                }
              >
                {({ selected }) => (
                  <div className="flex items-center justify-between">
                    <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                      {model.brand} {model.model}
                    </span>
                    <span className={`text-sm ${selected ? "text-white/80" : "text-gray-500"}`}>
                      {model.stockTire.size}
                    </span>
                  </div>
                )}
              </Combobox.Option>
            ))}

            {filteredModels.map(([brand, brandModels]) => (
              <div key={brand}>
                <div className="px-4 py-2 text-xs font-medium text-muted uppercase tracking-wide border-b border-gray-200">
                  {brand}
                </div>
                {brandModels.map((model) => (
                  <Combobox.Option
                    key={model.slug}
                    value={model}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2.5 pl-6 pr-4 rounded-lg mx-1 ${
                        active ? "bg-gradient-brand text-white shadow-md" : "text-gray-900 hover:bg-brand-50"
                      } transition-all duration-150`
                    }
                  >
                    {({ selected }) => (
                      <div className="flex items-center justify-between">
                        <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                          {model.model}
                        </span>
                        <span className={`text-sm ${selected ? "text-white/80" : "text-gray-500"}`}>
                          {model.stockTire.size}
                        </span>
                      </div>
                    )}
                  </Combobox.Option>
                ))}
              </div>
            ))}

            {filteredModels.length === 0 && query !== "" && (
              <div className="px-4 py-8 text-center text-gray-500">
                <div className="text-sm font-medium">No bikes found</div>
                <div className="text-xs mt-1">Try searching for brand, model, or tire size</div>
              </div>
            )}
          </Combobox.Options>
        </div>
      </Combobox>

      {selected && (
        <div className="mt-4 p-5 bg-gradient-to-br from-brand-50/50 to-white rounded-xl border border-brand/20 shadow-sm">
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
              <div className="text-xs text-muted uppercase tracking-wide mb-0.5">
                Sidewall PSI
                {(() => {
                  const psi = getEffectivePSI(
                    selected.stockTire.size,
                    selected.stockTire.minPSI,
                    selected.stockTire.maxPSI
                  );
                  return psi.isDefault ? (
                    <span className="text-[10px] text-warn ml-1" title="Using standard range">*</span>
                  ) : null;
                })()}
              </div>
              <div className="font-semibold text-text">
                {(() => {
                  const psi = getEffectivePSI(
                    selected.stockTire.size,
                    selected.stockTire.minPSI,
                    selected.stockTire.maxPSI
                  );
                  return `${psi.min}–${psi.max}`;
                })()}
              </div>
            </div>
            <div>
              <div className="text-xs text-muted uppercase tracking-wide mb-0.5">Casing</div>
              <div className="font-semibold text-text">
                {selected.stockTire.casing === "reinforced" ? "Reinforced" : "Standard"}
              </div>
            </div>
          </div>
          {(() => {
            const psi = getEffectivePSI(
              selected.stockTire.size,
              selected.stockTire.minPSI,
              selected.stockTire.maxPSI
            );
            return psi.isDefault ? (
              <div className="mt-3 pt-3 border-t border-slate-200 text-xs text-muted">
                * Manufacturer PSI specs not available—using standard range for {selected.stockTire.size} tires
              </div>
            ) : null;
          })()}
        </div>
      )}
    </div>
  );
}
