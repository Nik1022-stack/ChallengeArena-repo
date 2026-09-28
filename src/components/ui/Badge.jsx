import { 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Lock, 
  Archive, 
  GitCommit 
} from 'lucide-react';

export const DifficultyBadge = ({ difficulty }) => {
  const styles = {
    Beginner: 'text-emerald-400 bg-emerald-950/40 border-emerald-800/40',
    Intermediate: 'text-amber-400 bg-amber-950/40 border-amber-800/40',
    Advanced: 'text-rose-400 bg-rose-950/40 border-rose-800/40'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-mono font-semibold border ${styles[difficulty] || styles.Beginner}`}>
      {difficulty}
    </span>
  );
};

export const TimelineBadge = ({ status }) => {
  if (status === 'active') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium text-emerald-400 bg-emerald-950/40 border border-emerald-800/40">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>Active</span>
      </span>
    );
  }

  if (status === 'upcoming') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium text-cyan-400 bg-cyan-950/40 border border-cyan-800/40">
        <Lock className="w-3 h-3 text-cyan-400" />
        <span>Upcoming</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium text-slate-400 bg-slate-900 border border-slate-800">
      <Archive className="w-3 h-3 text-slate-400" />
      <span>Archived</span>
    </span>
  );
};

export const UserStatusBadge = ({ status }) => {
  switch (status) {
    case 'Completed':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-emerald-950/50 text-emerald-300 border border-emerald-800/50">
          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          <span>Solved</span>
        </span>
      );
    case 'In Progress':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-blue-950/50 text-blue-300 border border-blue-800/50">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          <span>In Progress</span>
        </span>
      );
    case 'Submitted':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-purple-950/50 text-purple-300 border border-purple-800/50">
          <Clock className="w-3 h-3 text-purple-400" />
          <span>Submitted</span>
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-900 text-slate-400 border border-slate-800">
          Not Started
        </span>
      );
  }
};

export const PointsBadge = ({ points, size = 'sm' }) => {
  return (
    <span className={`inline-flex items-center gap-1 font-mono font-bold text-orange-400 bg-orange-950/30 border border-orange-900/50 rounded-md ${
      size === 'lg' ? 'px-3 py-1 text-sm' : 'px-2 py-0.5 text-xs'
    }`}>
      <Sparkles className="w-3 h-3 text-orange-400" />
      <span>{points} XP</span>
    </span>
  );
};

export const TagBadge = ({ label }) => {
  return (
    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-300 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800/80 hover:border-slate-700 transition-colors">
      <GitCommit className="w-2.5 h-2.5 text-slate-500" />
      <span>{label}</span>
    </span>
  );
};
