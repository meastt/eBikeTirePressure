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
      <div className="mb-5">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-text mb-3 tracking-tight bg-gradient-to-r from-text via-brand-600 to-text bg-clip-text text-transparent">
          E-Bike Model Database
        </h1>
        <p className="text-muted text-base font-medium">
          Expert PSI specifications for {totalModels} models across {allBrands.length} brands. Updated for 2026.
        </p>
      </div>

      {/* Experience Signal - Subtle Expert Intro */}
      <div className="mb-8 p-4 bg-surface rounded-xl border border-brand-100 flex items-start gap-3">
        <span className="text-2xl pt-1">🔍</span>
        <div>
          <h2 className="font-bold text-text text-sm uppercase tracking-wide mb-1">Expert Verified Specs</h2>
          <p className="text-sm text-muted leading-relaxed">
            Our team has verified tire sizes, weight limits, and pressure ranges for these models. Unlike generic charts, our calculator adapts to your specific bike's geometry and weight distribution.
          </p>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-4 mb-4">
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Search */}
          <div className="flex-1">
            <label htmlFor="search" className="block text-xs font-semibold text-text mb-1.5">
              Search Models
            </label>
            <input
              id="search"
              type="search"
              placeholder="Type brand, model, or tire size..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-all duration-200 bg-white text-sm hover:border-brand/30"
            />
          </div>

          {/* Type Filter */}
          <div className="lg:w-56">
            <label htmlFor="type-filter" className="block text-xs font-semibold text-text mb-1.5">
              Filter by Type
            </label>
            <select
              id="type-filter"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as ModelType | "All")}
              className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-all duration-200 cursor-pointer bg-white text-sm hover:border-brand/30"
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
          <div className="mt-3 flex items-center gap-2 flex-wrap">
            <span className="text-xs text-muted">Active:</span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="pill bg-brand-100 text-brand hover:bg-brand hover:text-white transition-all duration-150 gap-1.5 text-xs"
              >
                &quot;{searchQuery}&quot;
                <span>×</span>
              </button>
            )}
            {selectedType !== "All" && (
              <button
                onClick={() => setSelectedType("All")}
                className="pill bg-brand-100 text-brand hover:bg-brand hover:text-white transition-all duration-150 gap-1.5 text-xs"
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
              className="text-xs text-muted hover:text-text underline ml-2"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Results Summary - Always visible */}
      <div className="mb-3 text-sm font-medium text-muted">
        Showing {searchQuery ? filteredBrands.length : paginatedBrands.length} brand{(searchQuery ? filteredBrands.length : paginatedBrands.length) !== 1 ? 's' : ''} ({filteredBrands.reduce((sum, brand) => sum + brand.modelCount, 0)} models)
        {!searchQuery && totalPages > 1 && ` • Page ${currentPage} of ${totalPages}`}
      </div>

      {/* Popular Searches - Right under search */}
      {!searchQuery && selectedType === "All" && (
        <div className="mb-4 p-3 bg-gradient-to-br from-brand-50/30 to-white rounded-lg border border-brand/10">
          <div className="text-xs text-muted uppercase tracking-wide mb-2 font-semibold">Popular Searches</div>
          <div className="flex flex-wrap gap-2">
            {[
              { query: "aventon", label: "Aventon" },
              { query: "lectric", label: "Lectric" },
              { query: "rad power", label: "Rad Power" },
              { query: "ride1up", label: "Ride1Up" },
              { query: "velotric", label: "Velotric" },
            ].map(({ query, label }) => (
              <button
                key={query}
                onClick={() => setSearchQuery(query)}
                className="px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 rounded-lg hover:border-brand hover:text-brand hover:shadow-sm transition-all duration-200"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Brands Grid */}
      {paginatedBrands.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedBrands.map((brand) => (
            <BrandCard key={brand.slug} brand={brand} />
          ))}
        </div>
      ) : (
        <div className="card text-center py-12">
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
        <div className="mt-6 flex justify-center">
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

      {/* Hint text */}
      <div className="mt-6 text-center">
        <p className="text-sm text-muted">
          💡 Tap any brand to expand and view its models
        </p>
      </div>

      {/* Model not listed CTA - Redesigned at bottom */}
      <div className="mt-6 bg-gradient-to-br from-blue-50 via-indigo-50/30 to-blue-50/20 rounded-lg border border-brand/20 p-5 text-center shadow-sm">
        <div className="flex items-center justify-center gap-2 mb-2">
          <svg className="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-heading font-bold text-text">Can&apos;t find your model?</h3>
        </div>
        <p className="text-sm text-muted mb-4">
          Use the universal calculator for any e-bike
        </p>
        <Link
          href="/calculate"
          className="inline-block px-8 py-3 bg-brand text-white font-semibold rounded-lg hover:bg-brand-hover hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
        >
          Open Universal Calculator →
        </Link>
      </div>

      {/* Footer info */}
      <div className="mt-6 p-4 bg-surface-light rounded-lg border border-slate-200">
        <p className="text-sm text-muted leading-relaxed">
          Click any brand to expand. Each model links to the calculator with pre-filled specs. Calculations factor bike weight, tire construction, rider load, cargo, and terrain.
        </p>
      </div>
    </div>
  );
}
