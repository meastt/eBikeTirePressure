import { psiToBar } from '@/lib/programmatic/geo';

interface PSIQuickTableProps {
  riderWeights?: number[];
  minPSI: number;
  maxPSI: number;
  showBar?: boolean;
  bikeWeight?: number;
}

export function PSIQuickTable({
  riderWeights = [140, 160, 180, 200, 220, 240],
  minPSI,
  maxPSI,
  showBar = false,
  bikeWeight = 65,
}: PSIQuickTableProps) {
  // Calculate PSI based on rider weight
  const calculatePSI = (riderLbs: number): number => {
    const totalLoad = riderLbs + bikeWeight;
    // Linear interpolation based on typical load range (150-350 lbs total)
    const loadFactor = Math.min(1, Math.max(0, (totalLoad - 150) / 200));
    const psi = minPSI + (maxPSI - minPSI) * loadFactor;
    return Math.round(Math.min(maxPSI, Math.max(minPSI, psi)));
  };

  const formatPSI = (psi: number): string => {
    if (showBar) {
      return `${psi} (${psiToBar(psi).toFixed(1)} Bar)`;
    }
    return `${psi}`;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-surface-light border-b-2 border-slate-200">
            <th className="px-4 py-3 text-left text-sm font-bold text-text">Rider Weight</th>
            <th className="px-4 py-3 text-center text-sm font-bold text-text">
              Recommended PSI{showBar ? ' (Bar)' : ''}
            </th>
            <th className="px-4 py-3 text-center text-sm font-bold text-text">Feel</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {riderWeights.map((weight) => {
            const psi = calculatePSI(weight);
            const psiRange = maxPSI - minPSI;
            const psiPosition = (psi - minPSI) / psiRange;
            const feel = psiPosition < 0.35 ? 'Soft' : psiPosition < 0.65 ? 'Balanced' : 'Firm';

            return (
              <tr key={weight} className="hover:bg-surface-light/50 transition-colors">
                <td className="px-4 py-3 font-medium text-text">{weight} lbs</td>
                <td className="px-4 py-3 text-center font-semibold text-brand">{formatPSI(psi)}</td>
                <td className="px-4 py-3 text-center text-muted">{feel}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
