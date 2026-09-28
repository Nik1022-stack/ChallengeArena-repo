export const Input = ({
  icon: Icon,
  className = '',
  rightAction,
  ...props
}) => {
  return (
    <div className="relative w-full">
      {Icon && (
        <Icon className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      )}
      <input
        className={`w-full py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500/80 focus:ring-1 focus:ring-orange-500/30 transition-all ${
          Icon ? 'pl-10' : 'pl-3.5'
        } ${rightAction ? 'pr-12' : 'pr-3.5'} ${className}`}
        {...props}
      />
      {rightAction && (
        <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
          {rightAction}
        </div>
      )}
    </div>
  );
};

export const Select = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div className="relative w-full">
      <select
        className={`w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-orange-500/80 focus:ring-1 focus:ring-orange-500/30 transition-all cursor-pointer ${className}`}
        {...props}
      >
        {children}
      </select>
    </div>
  );
};

export const Textarea = ({
  className = '',
  rows = 3,
  ...props
}) => {
  return (
    <textarea
      rows={rows}
      className={`w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500/80 focus:ring-1 focus:ring-orange-500/30 transition-all ${className}`}
      {...props}
    />
  );
};
