"use client";

export default function ResultsCardSkeleton() {
  return (
    <div className="card animate-pulse">
      {/* Header skeleton */}
      <div className="mb-6">
        <div className="h-6 bg-slate-200 rounded w-48 mb-2"></div>
        <div className="h-4 bg-slate-200 rounded w-64"></div>
      </div>

      {/* PSI display skeleton */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="text-center">
          <div className="h-4 bg-slate-200 rounded w-20 mx-auto mb-2"></div>
          <div className="h-12 bg-slate-200 rounded w-16 mx-auto mb-2"></div>
          <div className="h-3 bg-slate-200 rounded w-24 mx-auto"></div>
        </div>
        <div className="text-center">
          <div className="h-4 bg-slate-200 rounded w-20 mx-auto mb-2"></div>
          <div className="h-12 bg-slate-200 rounded w-16 mx-auto mb-2"></div>
          <div className="h-3 bg-slate-200 rounded w-24 mx-auto"></div>
        </div>
      </div>

      {/* PSI Band skeleton */}
      <div className="mb-8">
        <div className="h-14 bg-slate-200 rounded-lg"></div>
        <div className="flex justify-between mt-1">
          <div className="h-3 bg-slate-200 rounded w-12"></div>
          <div className="h-3 bg-slate-200 rounded w-20"></div>
        </div>
      </div>

      {/* Warnings skeleton */}
      <div className="space-y-3 mb-6">
        <div className="flex items-start gap-3 p-3 bg-slate-200 rounded-lg">
          <div className="w-6 h-6 bg-slate-300 rounded"></div>
          <div className="flex-1">
            <div className="h-4 bg-slate-300 rounded w-32 mb-1"></div>
            <div className="h-3 bg-slate-300 rounded w-48"></div>
          </div>
        </div>
        <div className="flex items-start gap-3 p-3 bg-slate-200 rounded-lg">
          <div className="w-6 h-6 bg-slate-300 rounded"></div>
          <div className="flex-1">
            <div className="h-4 bg-slate-300 rounded w-28 mb-1"></div>
            <div className="h-3 bg-slate-300 rounded w-40"></div>
          </div>
        </div>
      </div>

      {/* Action buttons skeleton */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="h-10 bg-slate-200 rounded-lg flex-1"></div>
        <div className="h-10 bg-slate-200 rounded-lg flex-1"></div>
      </div>
    </div>
  );
}
