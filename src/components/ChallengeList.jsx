import { useMemo } from 'react';
import { 
  Search, 
  Filter, 
  RotateCcw, 
  CheckCircle2, 
  Lock
} from 'lucide-react';
import { useChallenges } from '../hooks/useChallenges';
import { ChallengeCard } from './ChallengeCard';
import { HeroBanner } from './HeroBanner';
import { Input, Select } from './ui/Input';
import { Button } from './ui/Button';

export const ChallengeList = () => {
  const { 
    challenges, 
    timelineFilter, 
    setTimelineFilter,
    categoryFilter,
    setCategoryFilter,
    difficultyFilter,
    setDifficultyFilter,
    statusFilter,
    setStatusFilter,
    searchQuery,
    setSearchQuery,
    userStatuses,
    stats
  } = useChallenges();

  const categories = ['All', 'Git Branching', 'Merge & Rebase', 'CI/CD & DevOps', 'Open Source & PR', 'Git Forensics'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  const participantStatuses = [
    { id: 'all', label: 'All Statuses' },
    { id: 'Not Started', label: 'Not Started' },
    { id: 'In Progress', label: 'In Progress' },
    { id: 'Submitted', label: 'Submitted' },
    { id: 'Completed', label: 'Completed' }
  ];

  const filteredChallenges = useMemo(() => {
    return challenges.filter(challenge => {
      if (timelineFilter !== 'all' && challenge.timelineStatus !== timelineFilter) {
        return false;
      }

      if (categoryFilter !== 'All' && challenge.category !== categoryFilter) {
        return false;
      }

      if (difficultyFilter !== 'All' && challenge.difficulty !== difficultyFilter) {
        return false;
      }

      const userStatus = userStatuses[challenge.id] || 'Not Started';
      if (statusFilter !== 'all' && userStatus !== statusFilter) {
        return false;
      }

      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesTitle = challenge.title.toLowerCase().includes(q);
        const matchesDesc = challenge.shortDescription.toLowerCase().includes(q);
        const matchesCategory = challenge.category.toLowerCase().includes(q);
        const matchesTags = challenge.tags.some(tag => tag.toLowerCase().includes(q));
        if (!matchesTitle && !matchesDesc && !matchesCategory && !matchesTags) {
          return false;
        }
      }

      return true;
    });
  }, [challenges, timelineFilter, categoryFilter, difficultyFilter, statusFilter, searchQuery, userStatuses]);

  const resetFilters = () => {
    setTimelineFilter('all');
    setCategoryFilter('All');
    setDifficultyFilter('All');
    setStatusFilter('all');
    setSearchQuery('');
  };

  const hasActiveFilters = timelineFilter !== 'all' || categoryFilter !== 'All' || difficultyFilter !== 'All' || statusFilter !== 'all' || searchQuery.trim() !== '';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Hero Banner with Personalized Next Action */}
      <HeroBanner />

      {/* Main Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <span>Engineering Challenges</span>
            <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-slate-900 text-orange-400 border border-slate-800">
              {filteredChallenges.length} of {challenges.length}
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Authentic Git problems curated by Git Club CHARUSAT for developer skill evaluation.
          </p>
        </div>

        {/* Timeline Filter Tabs (All, Active, Upcoming, Completed) */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-xl overflow-x-auto scrollbar-none">
          <button
            onClick={() => setTimelineFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              timelineFilter === 'all'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Challenges ({challenges.length})
          </button>

          <button
            onClick={() => setTimelineFilter('active')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              timelineFilter === 'active'
                ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Active ({stats.activeChallengesCount})</span>
          </button>

          <button
            onClick={() => setTimelineFilter('upcoming')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              timelineFilter === 'upcoming'
                ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-800/60 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Lock className="w-3 h-3 text-cyan-400" />
            <span>Upcoming ({stats.upcomingChallengesCount})</span>
          </button>

          <button
            onClick={() => setTimelineFilter('completed')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              timelineFilter === 'completed'
                ? 'bg-slate-800 text-slate-200 border border-slate-700 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <CheckCircle2 className="w-3 h-3 text-slate-400" />
            <span>Archived ({stats.completedChallengesCount})</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar Controls */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5 mb-8 space-y-3.5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
          
          {/* Search Input */}
          <div className="lg:col-span-4">
            <Input
              icon={Search}
              placeholder="Search topic, keyword, or git command..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              rightAction={
                searchQuery ? (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    Clear
                  </button>
                ) : null
              }
            />
          </div>

          {/* Category Dropdown */}
          <div className="lg:col-span-3">
            <Select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categories.map((cat, idx) => (
                <option key={idx} value={cat} className="bg-slate-900 text-slate-100">
                  Category: {cat}
                </option>
              ))}
            </Select>
          </div>

          {/* Difficulty Dropdown */}
          <div className="lg:col-span-2">
            <Select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
            >
              {difficulties.map((diff, idx) => (
                <option key={idx} value={diff} className="bg-slate-900 text-slate-100">
                  Difficulty: {diff}
                </option>
              ))}
            </Select>
          </div>

          {/* User Status Filter */}
          <div className="lg:col-span-3 flex items-center gap-2">
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {participantStatuses.map((st) => (
                <option key={st.id} value={st.id} className="bg-slate-900 text-slate-100">
                  My Status: {st.label}
                </option>
              ))}
            </Select>

            {hasActiveFilters && (
              <Button
                variant="secondary"
                size="md"
                icon={RotateCcw}
                onClick={resetFilters}
                title="Reset all filters"
                className="shrink-0 px-3"
              />
            )}
          </div>
        </div>

        {/* Quick Tag Pills */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pt-2 border-t border-slate-800/60">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Filter className="w-3 h-3 text-orange-400" />
            Tags:
          </span>
          {['git checkout -b', 'merge-conflict', 'git rebase -i', 'github-actions', 'git bisect', 'git reflog'].map((tag, idx) => (
            <button
              key={idx}
              onClick={() => setSearchQuery(searchQuery === tag ? '' : tag)}
              className={`shrink-0 px-2.5 py-0.5 rounded text-[11px] font-mono transition-all ${
                searchQuery === tag
                  ? 'bg-orange-600 text-white font-semibold'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Challenges with subtle entrance animation */}
      {filteredChallenges.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredChallenges.map((challenge, idx) => (
            <div 
              key={challenge.id}
              style={{ animationDelay: `${Math.min(idx, 8) * 35}ms` }}
              className="animate-row-enter flex flex-col"
            >
              <ChallengeCard challenge={challenge} />
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 rounded-2xl bg-slate-900/30 border border-slate-800">
          <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-slate-800/80 flex items-center justify-center text-slate-400">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white mb-1">No matching challenges found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto mb-5">
            We couldn't find any challenges matching your current search query or active filters.
          </p>
          <Button
            size="sm"
            variant="primary"
            icon={RotateCcw}
            onClick={resetFilters}
          >
            Reset All Filters
          </Button>
        </div>
      )}
    </div>
  );
};
