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
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-heading font-bold text-text mb-2 tracking-tight">
          Model Database
        </h1>
        <p className="text-muted">
          {totalModels} bikes • {allBrands.length} brands
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="card p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <label htmlFor="search" className="block text-sm font-semibold text-text mb-2">
              Search Models
            </label>
            <input
              id="search"
              type="search"
              placeholder="Type brand, model, or tire size..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 border-2 border-line rounded-xl focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors duration-150 bg-white"
            />
          </div>

          {/* Type Filter */}
          <div className="lg:w-56">
            <label htmlFor="type-filter" className="block text-sm font-semibold text-text mb-2">
              Filter by Type
            </label>
            <select
              id="type-filter"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as ModelType | "All")}
              className="w-full px-4 py-2.5 border-2 border-line rounded-xl focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors duration-150 cursor-pointer bg-white"
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
            <span className="text-sm text-muted">Active:</span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="pill bg-brand-100 text-brand hover:bg-brand hover:text-white transition-all duration-150 gap-1.5"
              >
                &quot;{searchQuery}&quot;
                <span>×</span>
              </button>
            )}
            {selectedType !== "All" && (
              <button
                onClick={() => setSelectedType("All")}
                className="pill bg-brand-100 text-brand hover:bg-brand hover:text-white transition-all duration-150 gap-1.5"
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
              className="text-sm text-muted hover:text-text underline ml-2"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Quick Calculator CTA */}
      <div className="card p-6 bg-gradient-to-br from-brand to-brand-hover mb-6 text-center text-white">
        <h2 className="text-lg font-heading font-bold mb-1">Model not listed?</h2>
        <p className="text-sm mb-4 opacity-90">
          Universal calculator works for any e-bike
        </p>
        <Link
          href="/calculate"
          className="inline-block px-6 py-2.5 bg-white text-brand font-semibold rounded-lg hover:shadow-hover hover:-translate-y-0.5 transition-all duration-150"
        >
          Open Calculator
        </Link>
      </div>

      {/* Search Results Header */}
      {searchQuery && (
        <div className="mb-4 text-sm text-muted">
          Showing {filteredBrands.length} of {allBrands.length} brands
          {selectedType !== "All" && ` (${selectedType} only)`}
        </div>
      )}

      {/* Popular Searches */}
      {!searchQuery && selectedType === "All" && (
        <div className="mb-4 p-4 bg-surface-light rounded-xl border border-slate-200">
          <div className="text-xs text-muted uppercase tracking-wide mb-2">Popular Searches</div>
          <div className="flex flex-wrap gap-2">
            {[
              { query: "rad power", label: "Rad Power" },
              { query: "aventon", label: "Aventon" },
              { query: "fat tire", label: "Fat Tire" },
              { query: "cargo", label: "Cargo Bikes" },
              { query: "26x4", label: "26×4″ Tires" },
            ].map(({ query, label }) => (
              <button
                key={query}
                onClick={() => setSearchQuery(query)}
                className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg hover:border-brand hover:text-brand transition-colors duration-150"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Brands Grid */}
      {filteredBrands.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredBrands.map((brand) => (
            <BrandCard key={brand.slug} brand={brand} />
          ))}
        </div>
      ) : (
        <div className="card text-center py-16">
          <div className="text-4xl mb-3">🔍</div>
          <h3 className="text-xl font-heading font-semibold text-text mb-2">
            No matches
          </h3>
          <p className="text-muted mb-6">
            Try a different search or clear filters
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedType("All");
            }}
            className="px-6 py-2.5 bg-brand text-white font-semibold rounded-lg hover:bg-brand-hover hover:shadow-hover transition-all duration-150"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Footer info */}
      <div className="mt-8 p-4 bg-surface-light rounded-xl border border-slate-200">
        <p className="text-sm text-muted leading-relaxed">
          Click any brand to expand. Each model links to the calculator with pre-filled specs. Calculations factor bike weight, tire construction, rider load, cargo, and terrain.
        </p>
      </div>
    </div>
  );
}
