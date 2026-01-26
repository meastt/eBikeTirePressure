import Link from 'next/link';
import type { ModelPreset } from '@/lib/types';

interface ModelGridProps {
  models: ModelPreset[];
  showBrand?: boolean;
  showPSIRange?: boolean;
  columns?: 2 | 3 | 4;
}

export function ModelGrid({ models, showBrand = true, showPSIRange = true, columns = 3 }: ModelGridProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={`grid gap-4 ${gridCols[columns]}`}>
      {models.map((model) => {
        const minPSI = model.stockTire.minPSI || 15;
        const maxPSI = model.stockTire.maxPSI || 30;

        return (
          <Link
            key={model.slug}
            href={`/models/${model.slug}`}
            className="group card card-hover p-5 bg-white"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                {showBrand && (
                  <div className="text-xs font-medium text-brand uppercase tracking-wide mb-1">
                    {model.brand}
                  </div>
                )}
                <h3 className="text-lg font-heading font-bold text-text group-hover:text-brand transition-colors truncate">
                  {model.model}
                </h3>
                <div className="mt-2 space-y-1">
                  <div className="text-sm text-muted">
                    <span className="font-medium">Tire:</span> {model.stockTire.size}
                  </div>
                  {showPSIRange && (
                    <div className="text-sm text-muted">
                      <span className="font-medium">PSI:</span> {minPSI}-{maxPSI}
                    </div>
                  )}
                </div>
              </div>
              <div className="ml-3 text-brand opacity-0 group-hover:opacity-100 transition-opacity">
                →
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
