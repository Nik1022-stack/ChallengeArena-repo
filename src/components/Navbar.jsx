import { useState } from 'react';
import { 
  GitBranch, 
  Trophy, 
  Flame, 
  Sparkles, 
  Menu, 
  X, 
  RotateCcw,
  LayoutGrid,
  UserCheck
} from 'lucide-react';
import { useChallenges } from '../hooks/useChallenges';
import { Button } from './ui/Button';

export const Navbar = () => {
  const { 
    activeTab, 
    setActiveTab, 
    userProfile, 
    leaderboard, 
    stats,
    resetAllProgress 
  } = useChallenges();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Find user's current rank in leaderboard
  const currentUserRank = leaderboard.find(u => u.isCurrentUser || u.id === 'user-current')?.rank || 5;

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Brand Identity */}
          <div 
            onClick={() => handleNavClick('challenges')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-slate-900 border border-orange-500/40 text-orange-400 group-hover:border-orange-500 group-hover:bg-slate-850 transition-all">
              <GitBranch className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
            </div>
            
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-white">
                  Git Club
                </span>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-orange-950/60 border border-orange-800/60 text-orange-400">
                  CHARUSAT
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                <span>CHALLENGE ARENA</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5">
            <button
              onClick={() => handleNavClick('challenges')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'challenges' || activeTab === 'detail'
                  ? 'bg-slate-800 text-white border border-slate-700 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80'
              }`}
            >
              <LayoutGrid className="w-4 h-4 text-orange-400" />
              <span>Challenges</span>
              <span className="px-1.5 py-0.2 rounded text-[11px] font-mono bg-slate-900 text-orange-300 border border-slate-800">
                {stats.activeChallengesCount}
              </span>
            </button>

            <button
              onClick={() => handleNavClick('leaderboard')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'leaderboard'
                  ? 'bg-slate-800 text-white border border-slate-700 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80'
              }`}
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Leaderboard</span>
              <span className="px-1.5 py-0.2 rounded text-[11px] font-mono bg-amber-950/60 text-amber-300 border border-amber-800/50">
                #{currentUserRank}
              </span>
            </button>

            <button
              onClick={() => handleNavClick('progress')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'progress'
                  ? 'bg-slate-800 text-white border border-slate-700 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80'
              }`}
            >
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <span>My Progress</span>
              <span className="px-1.5 py-0.2 rounded text-[11px] font-mono bg-emerald-950/60 text-emerald-300 border border-emerald-800/50">
                {stats.userCompletedCount} Solved
              </span>
            </button>
          </nav>

          {/* Right Action: User Status Pill & Reset */}
          <div className="hidden sm:flex items-center gap-3">
            {/* User XP & Streak Badge */}
            <div 
              onClick={() => handleNavClick('progress')}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 cursor-pointer transition-all group"
            >
              <div className="flex items-center gap-1 text-xs font-mono font-semibold text-amber-400">
                <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
                <span>{userProfile.streak}d</span>
              </div>
              <div className="w-px h-3.5 bg-slate-800" />
              <div className="flex items-center gap-1 text-xs font-mono font-bold text-orange-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{userProfile.points} XP</span>
              </div>
              <div className="w-px h-3.5 bg-slate-800" />
              <div className="flex items-center gap-1.5">
                <img 
                  src={userProfile.avatar} 
                  alt={userProfile.name}
                  className="w-5 h-5 rounded-full object-cover border border-orange-500/40" 
                />
                <span className="text-xs font-medium text-slate-300 group-hover:text-white transition-colors">
                  {userProfile.name.split(' ')[0]}
                </span>
              </div>
            </div>

            {/* Reset Demo Button */}
            <div className="relative">
              <button
                onClick={() => setShowResetConfirm(!showResetConfirm)}
                title="Reset simulation data to default"
                className="p-2 rounded-xl text-slate-500 hover:text-slate-300 hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-all text-xs flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              {showResetConfirm && (
                <div className="absolute right-0 mt-2 w-56 p-3 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl z-50 text-left">
                  <p className="text-xs text-slate-300 mb-2.5 font-medium">
                    Reset all challenge statuses & points to default test values?
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="xs"
                      variant="primary"
                      onClick={() => {
                        resetAllProgress();
                        setShowResetConfirm(false);
                      }}
                    >
                      Yes, Reset
                    </Button>
                    <Button
                      size="xs"
                      variant="outline"
                      onClick={() => setShowResetConfirm(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <div 
              onClick={() => handleNavClick('progress')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-orange-400 cursor-pointer min-h-[38px]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{userProfile.points}</span>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800 transition-colors flex items-center justify-center shrink-0"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950 px-4 pt-3 pb-5 space-y-2">
          <button
            onClick={() => handleNavClick('challenges')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'challenges' || activeTab === 'detail'
                ? 'bg-slate-800 text-white border border-slate-700'
                : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <LayoutGrid className="w-4 h-4 text-orange-400" />
              <span>Challenges</span>
            </div>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-900 text-orange-300 border border-slate-800">
              {stats.activeChallengesCount} Active
            </span>
          </button>

          <button
            onClick={() => handleNavClick('leaderboard')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'leaderboard'
                ? 'bg-slate-800 text-white border border-slate-700'
                : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Leaderboard</span>
            </div>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-800/50">
              Rank #{currentUserRank}
            </span>
          </button>

          <button
            onClick={() => handleNavClick('progress')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'progress'
                ? 'bg-slate-800 text-white border border-slate-700'
                : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <span>My Progress & Submissions</span>
            </div>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/50">
              {stats.userCompletedCount} Solved
            </span>
          </button>

          {/* User profile summary in mobile */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img 
                src={userProfile.avatar} 
                alt={userProfile.name}
                className="w-8 h-8 rounded-full object-cover border border-orange-500/40" 
              />
              <div>
                <p className="text-xs font-semibold text-white">{userProfile.name}</p>
                <p className="text-[11px] text-slate-400">{userProfile.department.split('—')[0]}</p>
              </div>
            </div>
            <button
              onClick={() => {
                resetAllProgress();
                setMobileMenuOpen(false);
              }}
              className="text-xs text-rose-400 flex items-center gap-1 hover:underline"
            >
              <RotateCcw className="w-3 h-3" /> Reset Demo
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
