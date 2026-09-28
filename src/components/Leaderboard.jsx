import { useState, useMemo } from 'react';
import { 
  Trophy, 
  Search, 
  Flame, 
  Sparkles, 
  Crown, 
  Award, 
  Medal, 
  X,
  ArrowRight,
  Filter
} from 'lucide-react';
import { useChallenges } from '../hooks/useChallenges';
import { Input } from './ui/Input';
import { Button } from './ui/Button';

export const Leaderboard = () => {
  const { leaderboard, userProfile, currentUserRank, setActiveTab } = useChallenges();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All'); // 'All' | 'CSPIT' | 'DEPSTAR'
  const [sortBy, setSortBy] = useState('points'); // 'points' | 'solved' | 'streak'
  const [selectedParticipant, setSelectedParticipant] = useState(null);

  // Sorting and filtering
  const processedLeaderboard = useMemo(() => {
    let list = [...leaderboard];

    // Filter by department / college
    if (selectedDept !== 'All') {
      list = list.filter(p => p.department.toLowerCase().includes(selectedDept.toLowerCase()));
    }

    // Filter by search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.handle.toLowerCase().includes(q) ||
        p.department.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortBy === 'solved') {
      list.sort((a, b) => b.solved - a.solved || b.points - a.points);
    } else if (sortBy === 'streak') {
      list.sort((a, b) => b.streak - a.streak || b.points - a.points);
    } else {
      list.sort((a, b) => b.points - a.points);
    }

    return list;
  }, [leaderboard, selectedDept, searchQuery, sortBy]);

  // Top 3 Podium (from global leaderboard or filtered if filtering)
  const isFiltering = selectedDept !== 'All' || searchQuery.trim() !== '' || sortBy !== 'points';
  
  // When not filtering, top3 is strictly ranks 1, 2, 3
  const top3 = isFiltering ? processedLeaderboard.slice(0, 3) : leaderboard.slice(0, 3);
  
  // Remaining participants for the ranked list
  const remainingParticipants = isFiltering 
    ? processedLeaderboard 
    : processedLeaderboard.slice(3);

  // Check if current user is in top 3
  const isCurrentUserInTop3 = currentUserRank <= 3 && !isFiltering;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in space-y-8">
      
      {/* 1. Header & Standing Summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-amber-950/60 border border-amber-800/60 text-amber-400 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
            <Trophy className="w-3.5 h-3.5" />
            <span>CHARUSAT ARENA HALL OF FAME</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Participant Leaderboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Live rankings based on completed Git challenge verification test suites, accumulated XP, and daily commit streaks.
          </p>
        </div>

        {/* Current User Standing Banner */}
        <div 
          onClick={() => setActiveTab('progress')}
          className="p-3 rounded-xl bg-slate-900/80 border border-orange-500/30 hover:border-orange-500/60 transition-all cursor-pointer group shrink-0"
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <img 
                src={userProfile.avatar} 
                alt={userProfile.name}
                className="w-10 h-10 rounded-xl object-cover border border-orange-500/50"
              />
              <span className="absolute -bottom-1 -right-1 px-1 py-0.2 rounded bg-orange-600 text-white font-mono text-[9px] font-bold">
                YOU
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white group-hover:text-orange-300 transition-colors">
                  {userProfile.name}
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-950/80 text-amber-300 border border-amber-800/50 font-bold">
                  Rank #{currentUserRank} {isCurrentUserInTop3 ? '🏆 PODIUM' : ''}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mt-0.5">
                <span className="text-orange-400 font-bold">{userProfile.points} XP</span>
                <span>•</span>
                <span>{userProfile.streak}d streak</span>
                <span>•</span>
                <span className="text-emerald-400">{userProfile.badges.length} badges</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Top-Three Podium Presentation */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
            <Medal className="w-4 h-4" />
            <span>Top Three Podium</span>
          </div>
          <span className="text-xs font-mono text-slate-500">
            {isFiltering ? 'Top 3 Matching Criteria' : 'CHARUSAT Champions'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          
          {/* SILVER - Rank 2 (Pedestal height: Medium) */}
          {top3[1] && (
            <div 
              onClick={() => setSelectedParticipant(top3[1])}
              className={`order-2 md:order-1 p-5 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border transition-all duration-200 cursor-pointer text-center relative overflow-hidden group hover-lift ${
                top3[1].isCurrentUser || top3[1].id === 'user-current'
                  ? 'border-orange-500/60 shadow-lg shadow-orange-500/5'
                  : 'border-slate-700/70 hover:border-slate-500'
              } md:translate-y-3`}
            >
              {/* Silver badge header */}
              <div className="flex items-center justify-between mb-3 font-mono text-xs">
                <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-bold border border-slate-600 text-[11px] flex items-center gap-1">
                  <span>🥈 #2 SILVER</span>
                </span>
                {(top3[1].isCurrentUser || top3[1].id === 'user-current') && (
                  <span className="px-1.5 py-0.2 rounded bg-orange-950 text-orange-400 border border-orange-800/60 text-[10px] font-bold">
                    YOU
                  </span>
                )}
              </div>

              {/* Avatar with rank medal */}
              <div className="relative mx-auto w-16 h-16 sm:w-18 sm:h-18 mb-3">
                <img 
                  src={top3[1].avatar} 
                  alt={top3[1].name}
                  className="w-full h-full rounded-2xl object-cover border-2 border-slate-400 shadow-md"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-slate-300 text-slate-950 flex items-center justify-center font-bold text-xs shadow">
                  2
                </div>
              </div>

              <h3 className="font-bold text-white text-base group-hover:text-slate-200 transition-colors line-clamp-1">
                {top3[1].name}
              </h3>
              <p className="text-xs text-slate-400 font-mono mb-1">@{top3[1].handle}</p>
              <p className="text-[11px] text-slate-500 line-clamp-1 mb-3">{top3[1].department.split('—')[0]}</p>

              {/* XP and stats badge */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-center gap-3 font-mono text-xs">
                <div className="inline-flex items-center gap-1 text-slate-200 font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-slate-400" />
                  <span>{top3[1].points} XP</span>
                </div>
                <div className="text-slate-500">•</div>
                <div className="text-slate-400">
                  {top3[1].solved} solved
                </div>
                <div className="text-slate-500">•</div>
                <div className="text-amber-400 flex items-center gap-0.5">
                  <Flame className="w-3 h-3 text-orange-500 fill-orange-500" />
                  <span>{top3[1].streak}d</span>
                </div>
              </div>
            </div>
          )}

          {/* GOLD - Rank 1 (Pedestal height: Tallest, Center) */}
          {top3[0] && (
            <div 
              onClick={() => setSelectedParticipant(top3[0])}
              className={`order-1 md:order-2 p-6 rounded-2xl bg-gradient-to-b from-slate-850 via-slate-900 to-slate-950 border transition-all duration-200 cursor-pointer text-center relative overflow-hidden group hover-lift ${
                top3[0].isCurrentUser || top3[0].id === 'user-current'
                  ? 'border-amber-400 shadow-xl shadow-amber-500/10'
                  : 'border-amber-500/60 hover:border-amber-400 shadow-lg shadow-amber-500/5'
              } md:-translate-y-2`}
            >
              {/* Crown Icon floating above */}
              <div className="flex justify-center mb-1">
                <Crown className="w-6 h-6 text-amber-400 fill-amber-400 animate-pulse" />
              </div>

              {/* Gold badge header */}
              <div className="flex items-center justify-between mb-3 font-mono text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-950/80 text-amber-300 font-bold border border-amber-600/70 text-[11px] flex items-center gap-1 mx-auto">
                  <span>👑 #1 GOLD CHAMPION</span>
                </span>
                {(top3[0].isCurrentUser || top3[0].id === 'user-current') && (
                  <span className="absolute top-4 right-4 px-1.5 py-0.2 rounded bg-orange-950 text-orange-400 border border-orange-800/60 text-[10px] font-bold">
                    YOU
                  </span>
                )}
              </div>

              {/* Avatar with gold ring */}
              <div className="relative mx-auto w-20 h-20 sm:w-22 sm:h-22 mb-3">
                <img 
                  src={top3[0].avatar} 
                  alt={top3[0].name}
                  className="w-full h-full rounded-2xl object-cover border-2 border-amber-400 shadow-xl shadow-amber-500/20"
                />
                <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xs shadow-md">
                  1
                </div>
              </div>

              <h3 className="font-extrabold text-white text-lg group-hover:text-amber-300 transition-colors line-clamp-1">
                {top3[0].name}
              </h3>
              <p className="text-xs text-amber-400 font-mono mb-1">@{top3[0].handle}</p>
              <p className="text-[11px] text-slate-400 line-clamp-1 mb-3">{top3[0].department.split('—')[0]}</p>

              {/* XP and stats badge */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-center gap-3 font-mono text-xs">
                <div className="inline-flex items-center gap-1 text-amber-300 font-bold px-2 py-0.5 rounded bg-amber-950/60 border border-amber-800/50">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>{top3[0].points} XP</span>
                </div>
                <div className="text-slate-500">•</div>
                <div className="text-slate-300 font-semibold">
                  {top3[0].solved} solved
                </div>
                <div className="text-slate-500">•</div>
                <div className="text-amber-400 font-bold flex items-center gap-0.5">
                  <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
                  <span>{top3[0].streak}d</span>
                </div>
              </div>
            </div>
          )}

          {/* BRONZE - Rank 3 (Pedestal height: Low) */}
          {top3[2] && (
            <div 
              onClick={() => setSelectedParticipant(top3[2])}
              className={`order-3 md:order-3 p-5 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border transition-all duration-200 cursor-pointer text-center relative overflow-hidden group hover-lift ${
                top3[2].isCurrentUser || top3[2].id === 'user-current'
                  ? 'border-orange-500/60 shadow-lg shadow-orange-500/5'
                  : 'border-amber-900/60 hover:border-amber-700'
              } md:translate-y-5`}
            >
              {/* Bronze badge header */}
              <div className="flex items-center justify-between mb-3 font-mono text-xs">
                <span className="px-2 py-0.5 rounded-full bg-amber-950/60 text-amber-500 font-bold border border-amber-800/60 text-[11px] flex items-center gap-1">
                  <span>🥉 #3 BRONZE</span>
                </span>
                {(top3[2].isCurrentUser || top3[2].id === 'user-current') && (
                  <span className="px-1.5 py-0.2 rounded bg-orange-950 text-orange-400 border border-orange-800/60 text-[10px] font-bold">
                    YOU
                  </span>
                )}
              </div>

              {/* Avatar with bronze ring */}
              <div className="relative mx-auto w-16 h-16 sm:w-18 sm:h-18 mb-3">
                <img 
                  src={top3[2].avatar} 
                  alt={top3[2].name}
                  className="w-full h-full rounded-2xl object-cover border-2 border-amber-700 shadow-md"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-amber-700 text-white flex items-center justify-center font-bold text-xs shadow">
                  3
                </div>
              </div>

              <h3 className="font-bold text-white text-base group-hover:text-amber-200 transition-colors line-clamp-1">
                {top3[2].name}
              </h3>
              <p className="text-xs text-slate-400 font-mono mb-1">@{top3[2].handle}</p>
              <p className="text-[11px] text-slate-500 line-clamp-1 mb-3">{top3[2].department.split('—')[0]}</p>

              {/* XP and stats badge */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-center gap-3 font-mono text-xs">
                <div className="inline-flex items-center gap-1 text-amber-500 font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>{top3[2].points} XP</span>
                </div>
                <div className="text-slate-500">•</div>
                <div className="text-slate-400">
                  {top3[2].solved} solved
                </div>
                <div className="text-slate-500">•</div>
                <div className="text-amber-400 flex items-center gap-0.5">
                  <Flame className="w-3 h-3 text-orange-500 fill-orange-500" />
                  <span>{top3[2].streak}d</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* 3. Search & College Filter Controls Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-sm">
        
        {/* Search Input */}
        <div className="flex-1 max-w-md">
          <Input
            icon={Search}
            placeholder="Search participant name, handle, or institute..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* College & Sort Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* College Filter */}
          <div className="flex items-center gap-1.5 text-xs font-mono flex-wrap">
            <span className="text-slate-500 mr-1 flex items-center gap-1 shrink-0">
              <Filter className="w-3 h-3" /> College:
            </span>
            {['All', 'CSPIT', 'DEPSTAR'].map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3 py-1.5 rounded-lg transition-colors font-medium ${
                  selectedDept === dept
                    ? 'bg-amber-950/80 text-amber-300 border border-amber-800/60 font-bold'
                    : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          <div className="hidden sm:block w-px h-5 bg-slate-800" />

          {/* Sort Selector */}
          <div className="flex items-center gap-1 text-xs font-mono flex-wrap">
            <span className="text-slate-500 mr-1 shrink-0">Sort:</span>
            {[
              { id: 'points', label: 'XP' },
              { id: 'solved', label: 'Solved' },
              { id: 'streak', label: 'Streak' }
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setSortBy(s.id)}
                className={`px-2.5 py-1.5 rounded-lg transition-colors ${
                  sortBy === s.id
                    ? 'bg-slate-800 text-white border border-slate-700 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* 4. Clean Ranked List for Remaining Participants */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
              {isFiltering ? `Filtered Rankings (${remainingParticipants.length})` : `Ranked Contenders (Ranks #4 – #${leaderboard.length})`}
            </span>
            {!isFiltering && (
              <span className="text-[11px] font-mono px-2 py-0.2 rounded bg-slate-900 text-slate-400 border border-slate-800">
                {remainingParticipants.length} Participants
              </span>
            )}
          </div>

          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedDept('All');
                setSortBy('points');
              }}
              className="text-xs font-mono text-orange-400 hover:underline"
            >
              Reset filters
            </button>
          )}
        </div>

        {remainingParticipants.length > 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden shadow-sm">
            
            {/* Desktop & Tablet Table View */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/80 text-[11px] font-mono uppercase text-slate-400 tracking-wider select-none">
                    <th className="py-3 px-4 text-center w-16">Rank</th>
                    <th className="py-3 px-4">Participant</th>
                    <th className="py-3 px-4 hidden md:table-cell">Institute & Dept</th>
                    <th className="py-3 px-4 text-center">Solved</th>
                    <th className="py-3 px-4 text-center">Streak</th>
                    <th className="py-3 px-4 hidden lg:table-cell">Top Badges</th>
                    <th className="py-3 px-4 text-right">Points</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-xs sm:text-sm">
                  {remainingParticipants.map((item, idx) => {
                    const isCurrent = item.isCurrentUser || item.id === 'user-current';

                    return (
                      <tr 
                        key={item.id}
                        onClick={() => setSelectedParticipant(item)}
                        style={{ animationDelay: `${idx * 45}ms` }}
                        className={`animate-row-enter cursor-pointer transition-colors ${
                          isCurrent
                            ? 'bg-orange-950/20 hover:bg-orange-950/30 text-white font-medium border-l-4 border-l-orange-500'
                            : 'hover:bg-slate-800/40 text-slate-300'
                        }`}
                      >
                        {/* Rank */}
                        <td className="py-3 px-4 text-center font-mono font-bold">
                          <span className={`inline-flex items-center justify-center px-2 py-0.5 rounded text-xs ${
                            item.rank <= 3
                              ? 'bg-amber-400 text-slate-950 font-extrabold'
                              : isCurrent
                              ? 'bg-orange-950 text-orange-400 border border-orange-800/60'
                              : 'text-slate-400 bg-slate-950 border border-slate-800/80'
                          }`}>
                            #{item.rank}
                          </span>
                        </td>

                        {/* Participant Name & Avatar */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="relative shrink-0">
                              <img 
                                src={item.avatar} 
                                alt={item.name}
                                className={`w-8 h-8 rounded-xl object-cover border ${
                                  isCurrent ? 'border-orange-500' : 'border-slate-800'
                                }`} 
                              />
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-semibold text-white text-xs sm:text-sm hover:text-orange-400 transition-colors">
                                  {item.name}
                                </span>
                                {isCurrent && (
                                  <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-orange-600 text-white">
                                    YOU
                                  </span>
                                )}
                              </div>
                              <span className="text-[11px] font-mono text-slate-400">@{item.handle}</span>
                            </div>
                          </div>
                        </td>

                        {/* Institute & Dept */}
                        <td className="py-3 px-4 hidden md:table-cell text-xs text-slate-400">
                          <div className="line-clamp-1">{item.department}</div>
                          <div className="text-[11px] font-mono text-slate-500">{item.semester}</div>
                        </td>

                        {/* Challenges Solved */}
                        <td className="py-3 px-4 text-center font-mono font-semibold text-slate-200">
                          <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800/80">
                            {item.solved}
                          </span>
                        </td>

                        {/* Streak */}
                        <td className="py-3 px-4 text-center">
                          <div className="inline-flex items-center gap-1 font-mono text-amber-400 font-bold text-xs">
                            <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
                            <span>{item.streak}d</span>
                          </div>
                        </td>

                        {/* Badges */}
                        <td className="py-3 px-4 hidden lg:table-cell">
                          <div className="flex flex-wrap gap-1">
                            {item.badges.slice(0, 2).map((badge, bIdx) => (
                              <span 
                                key={bIdx}
                                className="inline-flex items-center gap-1 text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800"
                              >
                                <Award className="w-2.5 h-2.5 text-orange-400" />
                                {badge}
                              </span>
                            ))}
                            {item.badges.length > 2 && (
                              <span className="text-[10px] font-mono px-1 py-0.5 rounded bg-slate-950 text-slate-500 border border-slate-800">
                                +{item.badges.length - 2}
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Points */}
                        <td className="py-3 px-4 text-right font-mono font-bold text-orange-400 text-sm">
                          {item.points} XP
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Responsive Cards View (< 640px) */}
            <div className="sm:hidden divide-y divide-slate-800">
              {remainingParticipants.map((item, idx) => {
                const isCurrent = item.isCurrentUser || item.id === 'user-current';

                return (
                  <div 
                    key={item.id}
                    onClick={() => setSelectedParticipant(item)}
                    style={{ animationDelay: `${idx * 40}ms` }}
                    className={`p-3.5 animate-row-enter transition-colors cursor-pointer ${
                      isCurrent ? 'bg-orange-950/25 border-l-4 border-l-orange-500' : 'hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <span className={`inline-flex items-center justify-center px-2 py-0.5 rounded text-xs font-mono font-bold ${
                          isCurrent
                            ? 'bg-orange-950 text-orange-400 border border-orange-800/60'
                            : 'text-slate-400 bg-slate-950 border border-slate-800'
                        }`}>
                          #{item.rank}
                        </span>

                        <img 
                          src={item.avatar} 
                          alt={item.name}
                          className="w-7 h-7 rounded-lg object-cover border border-slate-800" 
                        />

                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-white text-xs">{item.name}</span>
                            {isCurrent && (
                              <span className="px-1 py-0.2 rounded text-[9px] font-mono font-bold bg-orange-600 text-white">
                                YOU
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] font-mono text-slate-500">@{item.handle}</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-mono font-bold text-orange-400">
                          {item.points} XP
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1 border-t border-slate-800/50">
                      <span>{item.department.split('—')[0]}</span>
                      <div className="flex items-center gap-2.5">
                        <span>{item.solved} solved</span>
                        <span className="flex items-center gap-0.5 text-amber-400">
                          <Flame className="w-3 h-3 text-orange-500 fill-orange-500" />
                          {item.streak}d
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        ) : (
          <div className="text-center py-12 bg-slate-900/30 rounded-2xl border border-slate-800">
            <Trophy className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-xs text-slate-300 font-semibold">No participants match your filter</p>
            <p className="text-[11px] text-slate-500 mt-1">
              Try adjusting your search query or college selection.
            </p>
            <Button
              size="xs"
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setSelectedDept('All');
              }}
              className="mt-3"
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>

      {/* 5. Participant Profile Inspection Modal */}
      {selectedParticipant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-6 space-y-5 animate-modal-in">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3.5">
                <img 
                  src={selectedParticipant.avatar} 
                  alt={selectedParticipant.name}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-orange-500/50 shadow-md"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white">
                      {selectedParticipant.name}
                    </h3>
                    {(selectedParticipant.isCurrentUser || selectedParticipant.id === 'user-current') && (
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-orange-600 text-white">
                        YOU
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 font-mono">@{selectedParticipant.handle}</p>
                  <p className="text-xs text-slate-300 mt-0.5">{selectedParticipant.department}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedParticipant(null)}
                className="w-9 h-9 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors flex items-center justify-center shrink-0"
                aria-label="Close participant modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Core Stats Grid */}
            <div className="grid grid-cols-3 gap-2.5 pt-1 font-mono text-center">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 block uppercase">Rank</span>
                <span className="text-base font-bold text-amber-300">#{selectedParticipant.rank}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 block uppercase">Experience</span>
                <span className="text-base font-bold text-orange-400">{selectedParticipant.points} XP</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 block uppercase">Streak</span>
                <span className="text-base font-bold text-amber-400 flex items-center justify-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
                  {selectedParticipant.streak}d
                </span>
              </div>
            </div>

            {/* Solved & Activity info */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-1.5">
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-500">SOLVED CHALLENGES:</span>
                <span className="text-emerald-400 font-bold">{selectedParticipant.solved} Verified</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-500">LAST ACTIVE:</span>
                <span className="text-slate-300">{selectedParticipant.lastActive || 'Recently active'}</span>
              </div>
            </div>

            {/* Badges Earned */}
            <div>
              <span className="text-xs font-mono uppercase text-slate-400 font-semibold block mb-2">
                Earned Badges ({selectedParticipant.badges.length})
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedParticipant.badges.map((b, bIdx) => (
                  <span 
                    key={bIdx}
                    className="inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-950 text-slate-200 border border-slate-800"
                  >
                    <Award className="w-3.5 h-3.5 text-orange-400" />
                    <span>{b}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-800">
              {(selectedParticipant.isCurrentUser || selectedParticipant.id === 'user-current') ? (
                <Button
                  size="sm"
                  variant="primary"
                  icon={ArrowRight}
                  onClick={() => {
                    setSelectedParticipant(null);
                    setActiveTab('progress');
                  }}
                  className="w-full justify-center"
                >
                  View My Full Progress Hub
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedParticipant(null)}
                  className="w-full justify-center"
                >
                  Close Profile
                </Button>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
