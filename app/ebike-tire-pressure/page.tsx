"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { getBrands, filterBrandsByType, searchBrands, type ModelType } from "@/lib/brands";
import BrandCard from "@/components/BrandCard";

const MODEL_TYPES: ModelType[] = ["Fat Tire", "Cargo", "Folding", "Standard", "Moto-Style"];

export default function ModelsPage() {
  const allBrands = getBrands();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<ModelType | "All">("All");

  // Filter and search brands
  const filteredBrands = useMemo(() => {
    let brands = allBrands;
    
    // Apply type filter
    if (selectedType !== "All") {
      brands = filterBrandsByType(brands, selectedType);
    }
    
    // Apply search
    if (searchQuery) {
      brands = searchBrands(brands, searchQuery);
    }
    
    return brands;
  }, [allBrands, selectedType, searchQuery]);

  const totalModels = allBrands.reduce((sum, brand) => sum + brand.modelCount, 0);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-heading font-bold text-text mb-3 tracking-tight">
          E-Bike Models
        </h1>
        <p className="text-xl text-text-muted">
          Pressure guides for {totalModels} models across {allBrands.length} brands
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-card p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <label htmlFor="search" className="block text-sm font-semibold text-text mb-2">
              Search
            </label>
            <input
              id="search"
              type="text"
              placeholder="Brand, model, or tire size..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
            />
          </div>

          {/* Type Filter */}
          <div className="lg:w-64">
            <label htmlFor="type-filter" className="block text-sm font-semibold text-text mb-2">
              Type
            </label>
            <select
              id="type-filter"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as ModelType | "All")}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all cursor-pointer bg-white"
            >
              <option value="All">All Types</option>
              {MODEL_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active filters display */}
        {(searchQuery || selectedType !== "All") && (
          <div className="mt-4 flex items-center gap-2 flex-wrap">
            <span className="text-sm text-text-muted">Active filters:</span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="px-3 py-1 bg-brand-100 text-brand text-sm rounded-lg hover:bg-brand-600 hover:text-white transition-colors flex items-center gap-1"
              >
                &quot;{searchQuery}&quot;
                <span>×</span>
              </button>
            )}
            {selectedType !== "All" && (
              <button
                onClick={() => setSelectedType("All")}
                className="px-3 py-1 bg-brand-100 text-brand text-sm rounded-lg hover:bg-brand-600 hover:text-white transition-colors flex items-center gap-1"
              >
                {selectedType}
                <span>×</span>
              </button>
            )}
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedType("All");
              }}
              className="text-sm text-text-muted hover:text-text underline"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Quick Calculator CTA */}
      <div className="p-6 bg-gradient-to-br from-brand to-brand-600 rounded-2xl shadow-card mb-8 text-center text-white">
        <h2 className="text-lg font-heading font-bold mb-2">Don&apos;t see your model?</h2>
        <p className="text-sm mb-4 opacity-90">
          Use the universal calculator for any e-bike
        </p>
        <Link
          href="/calculate"
          className="inline-block px-6 py-3 bg-white text-brand font-semibold rounded-lg hover:shadow-hover hover:-translate-y-0.5 transition-all duration-200"
        >
          Open Calculator
        </Link>
      </div>

      {/* Brands Grid */}
      {filteredBrands.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredBrands.map((brand) => (
            <BrandCard key={brand.slug} brand={brand} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-xl font-heading font-semibold text-text mb-2">
            No results found
          </h3>
          <p className="text-text-muted mb-6">
            Try a different search term or filter
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedType("All");
            }}
            className="px-6 py-3 bg-brand text-white font-semibold rounded-lg hover:bg-brand-600 hover:shadow-hover transition-all duration-200"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Footer info */}
      <div className="mt-12 p-6 bg-white border border-slate-200 rounded-xl">
        <h2 className="text-lg font-heading font-bold text-text mb-3">About This Tool</h2>
        <p className="text-sm text-text-muted leading-relaxed">
          Click any brand to expand and view models. Each model includes tire specs and a direct link to our calculator with pre-filled settings. Pressure recommendations account for bike weight, tire construction, rider weight, cargo, and terrain.
        </p>
      </div>
    </div>
  );
}
