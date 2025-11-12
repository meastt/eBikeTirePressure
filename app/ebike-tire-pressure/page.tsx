"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { getBrands, filterBrandsByType, searchBrands, type ModelType } from "@/lib/brands";
import BrandCard from "@/components/BrandCard";

const MODEL_TYPES: ModelType[] = ["Fat Tire", "Cargo", "Folding", "Standard", "Moto-Style"];

const BRANDS_PER_PAGE = 24;

export default function ModelsPage() {
  const allBrands = getBrands();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<ModelType | "All">("All");
  const [currentPage, setCurrentPage] = useState(1);

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

  // Paginated brands (only when not searching)
  const paginatedBrands = useMemo(() => {
    if (searchQuery) {
      return filteredBrands; // Show all results when searching
    }

    const startIndex = (currentPage - 1) * BRANDS_PER_PAGE;
    const endIndex = startIndex + BRANDS_PER_PAGE;
    return filteredBrands.slice(startIndex, endIndex);
  }, [filteredBrands, currentPage, searchQuery]);

  // Pagination info
  const totalPages = searchQuery ? 1 : Math.ceil(filteredBrands.length / BRANDS_PER_PAGE);

  const totalModels = allBrands.reduce((sum, brand) => sum + brand.modelCount, 0);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedType, searchQuery]);

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
      <div className="card mb-6">
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
      <div className="card bg-gradient-to-br from-brand to-brand-hover mb-6 text-center text-white">
        <h2 className="text-lg font-heading font-bold mb-1">Model not listed?</h2>
        <p className="text-sm mb-4 opacity-90">
          Universal calculator works for any e-bike
        </p>
        <Link
          href="/calculate"
          className="inline-block px-6 py-2.5 bg-purple text-white font-semibold rounded-lg hover:bg-purple-hover hover:shadow-hover hover:-translate-y-0.5 transition-all duration-150"
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

      {/* Pagination Info */}
      {!searchQuery && filteredBrands.length > BRANDS_PER_PAGE && (
        <div className="mb-4 text-sm text-muted">
          Showing {paginatedBrands.length} of {filteredBrands.length} brands
          (page {currentPage} of {totalPages})
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
      {paginatedBrands.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {paginatedBrands.map((brand) => (
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
            className="px-6 py-2.5 bg-accent text-white font-semibold rounded-lg hover:bg-accent-hover hover:shadow-hover transition-all duration-150"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Pagination Controls */}
      {!searchQuery && totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm font-medium text-text bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
            >
              ← Previous
            </button>

            {/* Page numbers */}
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150 ${
                      currentPage === pageNum
                        ? 'bg-brand text-white'
                        : 'text-text bg-white border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              {totalPages > 5 && (
                <>
                  <span className="px-2 text-muted">...</span>
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150 ${
                      currentPage === totalPages
                        ? 'bg-brand text-white'
                        : 'text-text bg-white border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </div>

            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-sm font-medium text-text bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
            >
              Next →
            </button>
          </div>
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
