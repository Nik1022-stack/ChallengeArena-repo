import { 
  Terminal, 
  Sparkles, 
  ArrowRight, 
  Play, 
  Flame, 
  Trophy, 
  Code2
} from 'lucide-react';
import { useChallenges } from '../hooks/useChallenges';
import { Button } from './ui/Button';

export const HeroBanner = () => {
  const { 
    challenges, 
    userStatuses, 
    navigateToChallenge, 
    userProfile, 
    leaderboard,
    setActiveTab 
  } = useChallenges();

  const inProgressChallenge = challenges.find(c => userStatuses[c.id] === 'In Progress');
  const recommendedChallenge = inProgressChallenge || 
    challenges.find(c => c.timelineStatus === 'active' && userStatuses[c.id] !== 'Completed') ||
    challenges[0];

  const currentUserRank = leaderboard.find(u => u.isCurrentUser || u.id === 'user-current')?.rank || 5;

  return (
    <div className="relative mb-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
      
      {/* Top Banner Content Grid */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800/80">
        
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-orange-950/60 border border-orange-800/60 text-orange-400 text-xs font-mono font-semibold uppercase tracking-wider mb-3.5">
            <Code2 className="w-3.5 h-3.5 text-orange-400" />
            <span>Git Club CHARUSAT • Challenge Arena</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Solve Authentic Git Workflows & Compete
          </h1>

          <p className="mt-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
            Resolve 3-way merge conflicts, automate GitHub Actions CI/CD matrix builds, rewrite history with interactive rebase, and test your engineering craft on the CHARUSAT leaderboard.
          </p>
        </div>

        {/* Live User Snapshot Card */}
        <div className="shrink-0 bg-slate-950 border border-slate-800 rounded-xl p-4 sm:p-5 min-w-[280px]">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5">
              <img 
                src={userProfile.avatar} 
                alt={userProfile.name}
                className="w-9 h-9 rounded-xl object-cover border border-orange-500/40" 
              />
              <div>
                <p className="text-xs font-bold text-white flex items-center gap-1.5">
                  {userProfile.name}
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-orange-950 text-orange-300 border border-orange-800/60">
                    YOU
                  </span>
                </p>
                <p className="text-[11px] font-mono text-slate-400">
                  {userProfile.department.split('—')[0].trim()} • {userProfile.studentId}
                </p>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('progress')}
              className="text-xs font-semibold text-orange-400 hover:text-orange-300 transition-colors"
            >
              Profile →
            </button>
          </div>

          {/* Quick Metrics grid */}
          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-800/80 text-center">
            <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800/60">
              <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400 mb-0.5 font-mono">
                <Trophy className="w-3 h-3 text-amber-400" />
                <span>Rank</span>
              </div>
              <span className="font-mono font-bold text-sm text-white">#{currentUserRank}</span>
            </div>

            <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800/60">
              <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400 mb-0.5 font-mono">
                <Sparkles className="w-3 h-3 text-orange-400" />
                <span>XP</span>
              </div>
              <span className="font-mono font-bold text-sm text-orange-400">{userProfile.points}</span>
            </div>

            <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800/60">
              <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400 mb-0.5 font-mono">
                <Flame className="w-3 h-3 text-rose-400" />
                <span>Streak</span>
              </div>
              <span className="font-mono font-bold text-sm text-amber-300">{userProfile.streak}d</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Action Banner: Participant always understands what to do next */}
      <div className="mt-5 pt-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
          <div className="flex items-center gap-3.5">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-orange-950/60 border border-orange-800/60 text-orange-400 shrink-0">
              {inProgressChallenge ? <Play className="w-4 h-4 fill-current animate-pulse" /> : <Terminal className="w-4 h-4" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono uppercase font-bold tracking-wider text-orange-400">
                  {inProgressChallenge ? 'Current Mission in Progress' : 'Next Recommended Objective'}
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  +{recommendedChallenge.points} XP
                </span>
              </div>
              <h4 className="text-sm sm:text-base font-bold text-white line-clamp-1">
                {recommendedChallenge.title}
              </h4>
            </div>
          </div>

          <Button
            size="sm"
            variant="primary"
            iconRight={ArrowRight}
            onClick={() => navigateToChallenge(recommendedChallenge.id)}
            className="shrink-0"
          >
            {inProgressChallenge ? 'Continue Challenge' : 'Start Challenge'}
          </Button>
        </div>
      </div>

    </div>
  );
};
