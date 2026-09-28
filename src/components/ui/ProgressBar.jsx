export const ProgressBar = ({
  value = 0,
  max = 100,
  label,
  valueLabel,
  color = 'orange', // 'orange' | 'emerald' | 'blue' | 'purple' | 'amber'
  size = 'md', // 'sm' | 'md' | 'lg'
  segments = null, // array of { value, color, label }
  className = ''
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const colorVariants = {
    orange: 'bg-gradient-to-r from-orange-500 to-amber-400',
    emerald: 'bg-gradient-to-r from-emerald-500 to-teal-400',
    blue: 'bg-gradient-to-r from-blue-500 to-cyan-400',
    purple: 'bg-gradient-to-r from-purple-500 to-indigo-400',
    amber: 'bg-gradient-to-r from-amber-500 to-yellow-400'
  };

  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4'
  };

  return (
    <div className={`w-full ${className}`}>
      {(label || valueLabel) && (
        <div className="flex items-center justify-between text-xs font-mono mb-2">
          {label && <span className="text-slate-400 uppercase tracking-wider">{label}</span>}
          {valueLabel ? (
            <span className="text-orange-400 font-semibold">{valueLabel}</span>
          ) : (
            <span className="text-orange-400 font-semibold">{percentage}%</span>
          )}
        </div>
      )}

      {/* Multi-segmented bar */}
      {segments && segments.length > 0 ? (
        <div className={`w-full ${heightClasses[size]} rounded-full bg-slate-950 border border-slate-800/90 overflow-hidden flex p-0.5 gap-0.5`}>
          {segments.map((seg, idx) => {
            const segPercent = max > 0 ? (seg.value / max) * 100 : 0;
            if (segPercent <= 0) return null;
            return (
              <div
                key={idx}
                title={`${seg.label || ''}: ${seg.value} (${Math.round(segPercent)}%)`}
                className={`h-full first:rounded-l-full last:rounded-r-full transition-all duration-700 ease-out ${
                  colorVariants[seg.color] || seg.color
                }`}
                style={{ width: `${segPercent}%` }}
              />
            );
          })}
        </div>
      ) : (
        /* Single bar */
        <div className={`w-full ${heightClasses[size]} rounded-full bg-slate-950 border border-slate-800/90 overflow-hidden p-0.5`}>
          <div
            className={`h-full rounded-full transition-all duration-700 ease-out relative ${
              colorVariants[color] || colorVariants.orange
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      )}
    </div>
  );
};
