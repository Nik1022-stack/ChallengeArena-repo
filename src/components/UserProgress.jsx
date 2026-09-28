import { useState } from 'react';
import { 
  Sparkles, 
  Flame, 
  Trophy, 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  Award, 
  Terminal, 
  ChevronDown, 
  ChevronUp,
  Play,
  ArrowRight,
  Lock,
  Check,
  RotateCcw,
  CircleDot,
  CircleDashed,
  Layers,
  Send,
  UserCheck
} from 'lucide-react';
import { useChallenges } from '../hooks/useChallenges';
import { Card } from './ui/Card';
import { ProgressBar } from './ui/ProgressBar';
import { Button } from './ui/Button';
import { XPCounter } from './ui/XPCounter';
import { DifficultyBadge } from './ui/Badge';

export const UserProgress = () => {
  const { 
    userProfile, 
    challenges, 
    submissions, 
    currentUserRank, 
    navigateToChallenge, 
    startChallenge,
    approveSubmission,
    badgesCatalog,
    resetAllProgress,
    stats 
  } = useChallenges();

  const [expandedLogId, setExpandedLogId] = useState(null);
  const [badgeFilter, setBadgeFilter] = useState('all'); // 'all' | 'unlocked' | 'locked'
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Grouped challenges based on reactive state
  const completedChallenges = stats.userCompletedChallenges || [];
  const inProgressChallenges = stats.userInProgressChallenges || [];
  const submittedChallenges = stats.userSubmittedChallenges || [];
  const notStartedChallenges = stats.userNotStartedChallenges || [];

  // Recommended Next Challenge: First active challenge with 'Not Started'
  const recommendedNextChallenge = challenges.find(
    c => c.timelineStatus === 'active' && (!completedChallenges.some(ch => ch.id === c.id) && !inProgressChallenges.some(ch => ch.id === c.id) && !submittedChallenges.some(ch => ch.id === c.id))
  ) || challenges.find(c => c.timelineStatus === 'active');

  // Badge list with computed unlock state
  const badgesWithStatus = (badgesCatalog || []).map(badge => {
    const isUnlocked = userProfile.badges.includes(badge.name);
    return {
      ...badge,
      unlocked: isUnlocked
    };
  });

  const filteredBadges = badgesWithStatus.filter(b => {
    if (badgeFilter === 'unlocked') return b.unlocked;
    if (badgeFilter === 'locked') return !b.unlocked;
    return true;
  });

  const unlockedCount = badgesWithStatus.filter(b => b.unlocked).length;
  const totalBadges = badgesWithStatus.length;

  // Segmented progress distribution for the status overview
  const statusSegments = [
    { value: stats.userCompletedCount, color: 'emerald', label: 'Completed' },
    { value: stats.userSubmittedCount, color: 'purple', label: 'Submitted' },
    { value: stats.userInProgressCount, color: 'blue', label: 'In Progress' },
    { value: stats.userNotStartedCount, color: 'bg-slate-800', label: 'Not Started' }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in space-y-8">
      
      {/* Top Breadcrumb & Reset Demo Utility */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <UserCheck className="w-4 h-4 text-emerald-400" />
          <span>ARENA / PARTICIPANT PROGRESS HUB</span>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowResetConfirm(!showResetConfirm)}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-slate-200 transition-colors py-1.5 px-2.5 rounded-lg hover:bg-slate-900 border border-transparent hover:border-slate-800"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Arena Simulation</span>
          </button>

          {showResetConfirm && (
            <div className="absolute right-0 mt-2 w-64 p-3.5 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl z-50 text-left">
              <p className="text-xs text-slate-300 mb-3 font-medium">
                Reset all challenges, points, submissions, and badges to default state?
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

      {/* 1. Hero Participant Profile Card */}
      <Card padding="lg" className="relative overflow-hidden">
        {/* Subtle decorative background gradient */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800/80">
          
          {/* Avatar & Student Info */}
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              <img 
                src={userProfile.avatar} 
                alt={userProfile.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-orange-500/50 shadow-lg shadow-orange-500/10"
              />
              <div 
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center shadow-sm"
                title="Participant Active & Online"
              >
                <Check className="w-3.5 h-3.5 text-slate-950 stroke-[3]" />
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {userProfile.name}
                </h1>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-orange-950/70 text-orange-400 border border-orange-800/60">
                  {userProfile.studentId}
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                  {userProfile.semester}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                {userProfile.department}
              </p>
              <div className="flex items-center gap-3 mt-2 text-xs text-slate-500 font-mono">
                <span>Member since {userProfile.joinedDate}</span>
                <span>•</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Active Round 1 Participant
                </span>
              </div>
            </div>
          </div>

          {/* Dynamic XP Hero Counter Pill */}
          <div className="flex items-center gap-3">
            <div className="px-5 py-3 rounded-2xl bg-slate-950 border border-orange-500/30 text-right shadow-inner">
              <div className="text-[11px] font-mono text-orange-400 uppercase font-semibold flex items-center justify-end gap-1 mb-0.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Total Accumulated XP</span>
              </div>
              <div className="flex items-center justify-end">
                <XPCounter value={userProfile.points} size="lg" />
              </div>
              <div className="text-[11px] font-mono text-slate-400 mt-1">
                Rank <span className="text-amber-300 font-bold">#{currentUserRank}</span> on CHARUSAT Leaderboard
              </div>
            </div>
          </div>

        </div>

        {/* 4 Core KPI Stat Cards with Completion Indicators */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mt-6">
          
          {/* KPI 1: Arena Rank */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-amber-500/40 transition-colors">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>Arena Rank</span>
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-950/60 text-amber-300 border border-amber-800/50">
                CAMPUS
              </span>
            </div>
            <div className="text-2xl font-black text-white font-mono flex items-baseline gap-1">
              <span>#{currentUserRank}</span>
              <span className="text-xs font-normal text-slate-500">of 10 participants</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              {currentUserRank <= 3 ? '🏆 Top 3 Podiums' : currentUserRank <= 5 ? '⭐ Top 5 Leaderboard' : 'Participating Contender'}
            </p>
          </div>

          {/* KPI 2: Completed Challenges */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-emerald-500/40 transition-colors">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Solved Count</span>
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/50">
                {stats.progressPercent}%
              </span>
            </div>
            <div className="text-2xl font-black text-emerald-400 font-mono flex items-baseline gap-1">
              <span>{stats.userCompletedCount}</span>
              <span className="text-xs font-normal text-slate-500">/ {stats.totalChallenges} Challenges</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              {stats.earnedChallengeXP} XP earned in Arena
            </p>
          </div>

          {/* KPI 3: Current Streak */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-orange-500/40 transition-colors">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
                <span>Current Streak</span>
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-orange-950/60 text-orange-300 border border-orange-800/50">
                ACTIVE
              </span>
            </div>
            <div className="text-2xl font-black text-amber-300 font-mono flex items-baseline gap-1">
              <span>{userProfile.streak}</span>
              <span className="text-xs font-normal text-slate-500">Days</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Consecutive daily Git commits
            </p>
          </div>

          {/* KPI 4: In Progress / Active Mission */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-blue-500/40 transition-colors">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                <span>Active Status</span>
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-blue-950/60 text-blue-300 border border-blue-800/50">
                {stats.userInProgressCount + stats.userSubmittedCount} ACTIVE
              </span>
            </div>
            <div className="text-2xl font-black text-blue-300 font-mono flex items-baseline gap-1">
              <span>{stats.userInProgressCount}</span>
              <span className="text-xs font-normal text-slate-500">in progress</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              {stats.userSubmittedCount} awaiting review
            </p>
          </div>

        </div>

        {/* Overall Completion Animated Progress Bar */}
        <div className="mt-6 pt-5 border-t border-slate-800/80">
          <ProgressBar
            value={stats.userCompletedCount}
            max={stats.totalChallenges}
            size="lg"
            color="orange"
            label="Overall Challenge Arena Progression"
            valueLabel={`${stats.progressPercent}% (${stats.userCompletedCount} of ${stats.totalChallenges} Solved)`}
          />
        </div>
      </Card>


      {/* 2. Challenge Status Overview & Distribution */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-orange-400" />
            <h2 className="text-base sm:text-lg font-bold text-white">Challenge Status Overview</h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {stats.totalChallenges} Total Arena Challenges
          </span>
        </div>

        {/* Multi-Segmented Progress Bar */}
        <div className="mb-4">
          <ProgressBar
            max={stats.totalChallenges}
            size="md"
            segments={statusSegments}
          />
        </div>

        {/* 4 Status Breakdown Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
          
          {/* Completed Card */}
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-emerald-900/40 hover:border-emerald-700/60 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Completed</span>
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 font-bold">
                {stats.userCompletedCount}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {Math.round((stats.userCompletedCount / stats.totalChallenges) * 100)}% of total challenges
            </p>
            <div className="mt-2 text-[11px] text-emerald-300 font-mono">
              +{stats.earnedChallengeXP} XP Scored
            </div>
          </div>

          {/* In Progress Card */}
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-blue-900/40 hover:border-blue-700/60 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-blue-400">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span>In Progress</span>
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-950/80 text-blue-300 border border-blue-800/60 font-bold">
                {stats.userInProgressCount}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {Math.round((stats.userInProgressCount / stats.totalChallenges) * 100)}% active branch work
            </p>
            <div className="mt-2 text-[11px] text-blue-300 font-mono">
              Ready for submission
            </div>
          </div>

          {/* Submitted Card */}
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-purple-900/40 hover:border-purple-700/60 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-purple-400">
                <Clock className="w-3.5 h-3.5" />
                <span>Submitted</span>
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-purple-950/80 text-purple-300 border border-purple-800/60 font-bold">
                {stats.userSubmittedCount}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {Math.round((stats.userSubmittedCount / stats.totalChallenges) * 100)}% in review stage
            </p>
            <div className="mt-2 text-[11px] text-purple-300 font-mono">
              Automated tests passed
            </div>
          </div>

          {/* Not Started Card */}
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-slate-400">
                <CircleDashed className="w-3.5 h-3.5" />
                <span>Not Started</span>
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800 font-bold">
                {stats.userNotStartedCount}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {Math.round((stats.userNotStartedCount / stats.totalChallenges) * 100)}% available in arena
            </p>
            <div className="mt-2 text-[11px] text-slate-500 font-mono">
              Ready to attempt
            </div>
          </div>

        </div>
      </div>


      {/* 3. Action Mission Matrix: What you have completed, what you're doing, what you can do next */}
      <div className="space-y-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <CircleDot className="w-4 h-4 text-orange-400" />
            <span>Mission Action Center</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Your immediate next moves, ongoing tasks, and verified milestones
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          
          {/* Card A: What You Are Currently Doing */}
          <Card padding="md" className="flex flex-col justify-between border-blue-900/40 bg-gradient-to-b from-blue-950/20 to-slate-900">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  Currently Doing
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-950/80 text-blue-300 border border-blue-800/50">
                  {inProgressChallenges.length + submittedChallenges.length} Active
                </span>
              </div>

              {inProgressChallenges.length > 0 || submittedChallenges.length > 0 ? (
                <div className="space-y-3">
                  {/* In Progress Items */}
                  {inProgressChallenges.map(ch => (
                    <div key={ch.id} className="p-3 rounded-xl bg-slate-950 border border-blue-800/40 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-blue-950/80 text-blue-300 border border-blue-800/60">
                          IN PROGRESS
                        </span>
                        <span className="text-xs font-mono font-bold text-orange-400">+{ch.points} XP</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-1">{ch.title}</h4>
                      <p className="text-xs text-slate-400 line-clamp-2">{ch.shortDescription}</p>
                      <div className="pt-2 flex items-center justify-between">
                        <span className="text-[11px] font-mono text-slate-500">Est: {ch.duration}</span>
                        <Button
                          size="xs"
                          variant="primary"
                          icon={ArrowRight}
                          onClick={() => navigateToChallenge(ch.id)}
                        >
                          Continue
                        </Button>
                      </div>
                    </div>
                  ))}

                  {/* Submitted Items */}
                  {submittedChallenges.map(ch => (
                    <div key={ch.id} className="p-3 rounded-xl bg-slate-950 border border-purple-800/40 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-purple-950/80 text-purple-300 border border-purple-800/60">
                          SUBMITTED
                        </span>
                        <span className="text-xs font-mono font-bold text-emerald-400">+{ch.points} XP Pending</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-1">{ch.title}</h4>
                      <p className="text-xs text-slate-400">Solution under automated verification review.</p>
                      <div className="pt-2 flex items-center justify-between gap-2">
                        <Button
                          size="xs"
                          variant="outline"
                          onClick={() => navigateToChallenge(ch.id)}
                        >
                          View
                        </Button>
                        <Button
                          size="xs"
                          variant="primary"
                          onClick={() => approveSubmission(ch.id)}
                        >
                          Simulate Approval
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 px-3">
                  <div className="w-10 h-10 mx-auto rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-500 mb-2">
                    <Clock className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-semibold text-slate-300">No challenges currently in progress</p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Pick a recommended challenge from next door to start your next coding session!
                  </p>
                </div>
              )}
            </div>

            <div className="mt-3 pt-3 border-t border-slate-800/60 text-[11px] font-mono text-slate-500 text-center">
              Active branch work persists in browser storage
            </div>
          </Card>

          {/* Card B: What You Can Do Next (Smart Recommendation) */}
          <Card padding="md" className="flex flex-col justify-between border-orange-500/40 bg-gradient-to-b from-orange-950/20 to-slate-900">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-orange-400 flex items-center gap-1.5">
                  <Play className="w-3.5 h-3.5 text-orange-500" />
                  What You Can Do Next
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-orange-950 text-orange-300 border border-orange-800/50">
                  RECOMMENDED
                </span>
              </div>

              {recommendedNextChallenge ? (
                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-orange-800/50 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <DifficultyBadge difficulty={recommendedNextChallenge.difficulty} />
                      <span className="text-xs font-mono font-bold text-orange-400 px-2 py-0.5 rounded bg-orange-950/70 border border-orange-800/60">
                        +{recommendedNextChallenge.points} XP
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white leading-snug">
                      {recommendedNextChallenge.title}
                    </h4>

                    <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                      {recommendedNextChallenge.shortDescription}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-[11px] text-slate-400">
                      <span>Category: {recommendedNextChallenge.category}</span>
                      <span>•</span>
                      <span>Est: {recommendedNextChallenge.duration}</span>
                    </div>

                    <div className="pt-2">
                      <Button
                        size="sm"
                        variant="primary"
                        className="w-full justify-center"
                        icon={Play}
                        onClick={() => {
                          startChallenge(recommendedNextChallenge.id);
                          navigateToChallenge(recommendedNextChallenge.id);
                        }}
                      >
                        Start Challenge (+{recommendedNextChallenge.points} XP)
                      </Button>
                    </div>
                  </div>

                  {/* Other unstarted challenges */}
                  {notStartedChallenges.filter(c => c.id !== recommendedNextChallenge.id).length > 0 && (
                    <div className="pt-1">
                      <span className="text-[10px] font-mono uppercase text-slate-500 block mb-1.5">
                        More Available Challenges ({notStartedChallenges.filter(c => c.id !== recommendedNextChallenge.id).length})
                      </span>
                      <div className="space-y-1.5 max-h-28 overflow-y-auto pr-1">
                        {notStartedChallenges
                          .filter(c => c.id !== recommendedNextChallenge.id)
                          .slice(0, 3)
                          .map(c => (
                            <div 
                              key={c.id} 
                              onClick={() => navigateToChallenge(c.id)}
                              className="p-2 rounded-lg bg-slate-950 border border-slate-800/80 hover:border-slate-700 flex items-center justify-between text-xs cursor-pointer group"
                            >
                              <span className="text-slate-300 group-hover:text-white line-clamp-1">{c.title}</span>
                              <span className="font-mono text-[11px] text-orange-400 shrink-0 ml-2">+{c.points} XP</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 px-3">
                  <div className="w-10 h-10 mx-auto rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-emerald-400 mb-2">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-semibold text-white">All Active Challenges Attempted!</p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Check upcoming challenges releasing soon in the Arena.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-3 pt-3 border-t border-slate-800/60 text-[11px] font-mono text-slate-500 text-center">
              Target this challenge to climb leaderboard ranks
            </div>
          </Card>

          {/* Card C: What You Have Completed */}
          <Card padding="md" className="flex flex-col justify-between border-emerald-900/40 bg-gradient-to-b from-emerald-950/20 to-slate-900">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Completed Milestones
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/50">
                  {completedChallenges.length} Solved
                </span>
              </div>

              {completedChallenges.length > 0 ? (
                <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                  {completedChallenges.map(ch => (
                    <div 
                      key={ch.id} 
                      className="p-3 rounded-xl bg-slate-950 border border-emerald-900/50 space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-950/90 text-emerald-300 border border-emerald-800/60 flex items-center gap-1">
                          <Check className="w-2.5 h-2.5" /> VERIFIED
                        </span>
                        <span className="text-xs font-mono font-bold text-emerald-400">
                          +{ch.points} XP
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-1">
                        {ch.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 font-mono">
                        Category: {ch.category}
                      </p>
                      <div className="pt-1 flex items-center justify-end">
                        <Button
                          size="xs"
                          variant="ghost"
                          onClick={() => navigateToChallenge(ch.id)}
                          className="text-slate-400 hover:text-white"
                        >
                          Review Solution →
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 px-3">
                  <p className="text-xs text-slate-400">No challenges completed yet.</p>
                </div>
              )}
            </div>

            <div className="mt-3 pt-3 border-t border-slate-800/60 text-[11px] font-mono text-slate-500 text-center">
              Total XP from solutions: {stats.earnedChallengeXP} XP
            </div>
          </Card>

        </div>
      </div>


      {/* 4. Badges & Achievements Showcase */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-orange-400" />
              <span>Earned Achievements & Badges</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Unlock prestigious Git Club credentials by conquering specialized challenge tracks
            </p>
          </div>

          {/* Badge Filter Pills with responsive wrapping and comfortable touch targets */}
          <div className="flex items-center gap-1.5 text-xs font-mono flex-wrap">
            <button
              onClick={() => setBadgeFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                badgeFilter === 'all'
                  ? 'bg-slate-800 text-white font-bold border border-slate-700'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All ({totalBadges})
            </button>
            <button
              onClick={() => setBadgeFilter('unlocked')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                badgeFilter === 'unlocked'
                  ? 'bg-emerald-950/80 text-emerald-300 font-bold border border-emerald-800/60'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Unlocked ({unlockedCount})
            </button>
            <button
              onClick={() => setBadgeFilter('locked')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                badgeFilter === 'locked'
                  ? 'bg-slate-800 text-slate-300 font-bold border border-slate-700'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Locked ({totalBadges - unlockedCount})
            </button>
          </div>
        </div>

        {/* Badge Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {filteredBadges.map((badge) => {
            const isUnlocked = badge.unlocked;

            return (
              <div 
                key={badge.id}
                className={`p-4 rounded-xl border flex flex-col justify-between transition-all duration-200 hover-lift group ${
                  isUnlocked
                    ? 'bg-slate-900/90 border-slate-700 hover:border-orange-500/50 shadow-md shadow-orange-500/5'
                    : 'bg-slate-950/50 border-slate-800/60 opacity-60 hover:opacity-80'
                }`}
              >
                <div>
                  {/* Top row: Icon and status pill */}
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-transform duration-200 ${
                      isUnlocked
                        ? 'bg-slate-950 border border-orange-500/30 shadow-inner group-hover:scale-105'
                        : 'bg-slate-950/80 border border-slate-800 text-slate-600 grayscale'
                    }`}>
                      {badge.icon}
                    </div>

                    {isUnlocked ? (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/90 text-emerald-300 border border-emerald-800/60 font-bold flex items-center gap-1 animate-badge-pop">
                        <Check className="w-3 h-3 stroke-[3]" /> UNLOCKED
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-950 text-slate-500 border border-slate-800 flex items-center gap-1">
                        <Lock className="w-3 h-3" /> LOCKED
                      </span>
                    )}
                  </div>

                  {/* Title & Category */}
                  <div className="flex items-center gap-1.5 mb-1">
                    <h3 className="text-sm font-bold text-white">
                      {badge.name}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-orange-400/90 block mb-2">
                    {badge.category}
                  </span>

                  {/* Description */}
                  <p className="text-xs text-slate-400 leading-relaxed mb-3">
                    {badge.desc}
                  </p>
                </div>

                {/* Bottom Unlock Status / Action */}
                <div className="pt-2.5 border-t border-slate-800/80">
                  {isUnlocked ? (
                    <div className="text-[11px] font-mono text-emerald-400/90 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>Verified achievement earned</span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-[10px] text-slate-500 font-mono line-clamp-2">
                        {badge.criteria}
                      </p>
                      {badge.targetChallengeId && (
                        <button
                          onClick={() => navigateToChallenge(badge.targetChallengeId)}
                          className="w-full py-1 px-2 rounded-lg bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-orange-500/40 text-orange-400 text-[11px] font-mono font-medium transition-colors flex items-center justify-center gap-1"
                        >
                          <span>Attempt Challenge</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </div>


      {/* 5. Verified Submissions & Activity Log */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-orange-400" />
            <h2 className="text-base sm:text-lg font-bold text-white">Verified Activity & Submission Log</h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {submissions.length} Total Submissions Recorded
          </span>
        </div>

        {submissions.length > 0 ? (
          <div className="space-y-3.5">
            {submissions.map((sub, idx) => {
              const ch = challenges.find(c => c.id === sub.challengeId);
              const isExpanded = expandedLogId === idx;

              return (
                <Card key={idx} padding="md">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-orange-400">
                          {sub.challengeId.toUpperCase()}
                        </span>
                        <h3 
                          onClick={() => navigateToChallenge(sub.challengeId)}
                          className="text-sm sm:text-base font-bold text-white hover:text-orange-400 cursor-pointer transition-colors"
                        >
                          {ch ? ch.title : 'Git Challenge'}
                        </h3>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          sub.status === 'Completed'
                            ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/60'
                            : 'bg-purple-950/80 text-purple-300 border border-purple-800/60'
                        }`}>
                          {sub.status.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 font-mono">
                        Submitted: {new Date(sub.submittedAt).toLocaleDateString()} at {new Date(sub.submittedAt).toLocaleTimeString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-emerald-950/60 text-emerald-300 border border-emerald-800/60">
                        +{sub.score} XP
                      </span>
                      <Button
                        size="xs"
                        variant="secondary"
                        onClick={() => navigateToChallenge(sub.challengeId)}
                      >
                        View Challenge →
                      </Button>
                    </div>
                  </div>

                  {/* Submission details */}
                  <div className="pt-3 grid grid-cols-1 sm:grid-cols-3 gap-2.5 font-mono text-xs">
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase">Branch Reference</span>
                      <span className="text-slate-200">{sub.branchName || 'main'}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase">Commit Hash</span>
                      <span className="text-slate-200">{sub.commitHash || 'HEAD'}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase">Repository URL</span>
                      <a 
                        href={sub.repoUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-orange-400 hover:underline flex items-center gap-1 line-clamp-1"
                      >
                        {sub.repoUrl.replace('https://github.com/', '')}
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    </div>
                  </div>

                  {/* Live demo if any */}
                  {sub.demoUrl && (
                    <div className="pt-2 flex items-center gap-2 font-mono text-xs">
                      <span className="text-slate-500 text-[10px] uppercase">Live Demo:</span>
                      <a 
                        href={sub.demoUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-cyan-400 hover:underline flex items-center gap-1 line-clamp-1"
                      >
                        {sub.demoUrl}
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    </div>
                  )}

                  {/* Approach description if any */}
                  {(sub.description || sub.notes) && (
                    <p className="mt-2.5 text-xs text-slate-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800/80 leading-relaxed font-sans">
                      "{sub.description || sub.notes}"
                    </p>
                  )}

                  {/* Terminal grader log toggle */}
                  {sub.logs && sub.logs.length > 0 && (
                    <div className="mt-3">
                      <button
                        onClick={() => setExpandedLogId(isExpanded ? null : idx)}
                        className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-slate-200 transition-colors"
                      >
                        <Terminal className="w-3.5 h-3.5 text-orange-400" />
                        <span>{isExpanded ? 'Hide Automated Test Logs' : 'View Automated Test Logs'}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>

                      {isExpanded && (
                        <div className="mt-2 p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                          <div className="text-[10px] text-slate-500 pb-1 border-b border-slate-800/80 flex items-center justify-between">
                            <span>automated-test-runner.local</span>
                            <span className="text-emerald-400 font-bold">100% SUITES GREEN</span>
                          </div>
                          {sub.logs.map((log, lIdx) => (
                            <p 
                              key={lIdx} 
                              className={
                                log.includes('passed') || log.includes('successful') || log.startsWith('✔')
                                  ? 'text-emerald-400' 
                                  : log.startsWith('$')
                                  ? 'text-amber-400'
                                  : 'text-slate-400'
                              }
                            >
                              {log}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-slate-900/30 rounded-2xl border border-slate-800">
            <Send className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-xs text-slate-400">No submissions recorded yet.</p>
            <p className="text-[11px] text-slate-500 mt-1">
              Start an active challenge and submit your GitHub repository branch to log your work.
            </p>
          </div>
        )}
      </div>

    </div>
  );
};
