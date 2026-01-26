interface StatItem {
  label: string;
  value: string | number;
}

interface QuickStatsProps {
  items: StatItem[];
}

export function QuickStats({ items }: QuickStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {items.map((item, index) => (
        <div key={index} className="card p-4 text-center">
          <div className="text-2xl font-bold text-brand mb-1">{item.value}</div>
          <div className="text-sm text-muted">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
