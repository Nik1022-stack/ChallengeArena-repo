export const Card = ({
  children,
  className = '',
  hoverLift = false,
  padding = 'md',
  onClick,
  ...props
}) => {
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-5 sm:p-6',
    lg: 'p-6 sm:p-8'
  };

  return (
    <div
      onClick={onClick}
      className={`rounded-2xl bg-slate-900/70 border border-slate-800/90 text-slate-100 ${
        hoverLift ? 'hover-lift cursor-pointer hover:border-slate-700 hover:bg-slate-900/90' : ''
      } ${paddings[padding] || paddings.md} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
