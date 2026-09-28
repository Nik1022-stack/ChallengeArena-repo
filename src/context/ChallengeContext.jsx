import { useState, useEffect } from 'react';
import { CHALLENGES } from '../data/challengesData';
import { INITIAL_LEADERBOARD } from '../data/leaderboardData';
import { BADGES_CATALOG } from '../data/badgesData';
import { ChallengeContext } from './ChallengeContextInstance';
export { ChallengeContext } from './ChallengeContextInstance';

const STORAGE_KEYS = {
  STATUSES: 'gitclub_user_challenge_statuses_v1',
  SUBMISSIONS: 'gitclub_user_submissions_v1'
};

const DEFAULT_STATUSES = {
  'gc-07': 'Completed',
  'gc-08': 'Completed',
  'gc-01': 'In Progress',
  'gc-02': 'Not Started',
  'gc-03': 'Not Started',
  'gc-04': 'Not Started',
  'gc-05': 'Not Started',
  'gc-06': 'Not Started'
};

const DEFAULT_SUBMISSIONS = [
  {
    challengeId: 'gc-07',
    repoUrl: 'https://github.com/dev-charusat/community-toolkit',
    branchName: 'profile/dev-patel',
    commitHash: 'd3a1f49',
    description: 'Added student profile JSON card with CSPIT IT details conforming to data schema.',
    submittedAt: '2026-09-19T14:30:00Z',
    status: 'Completed',
    score: 100,
    logs: [
      'Cloning gitclub-charusat/community-toolkit...',
      'Validating data/students/22IT045.json schema...',
      'Lint checks passed (0 errors, 0 warnings)',
      'PR #142 automated validation successful!'
    ]
  },
  {
    challengeId: 'gc-08',
    repoUrl: 'https://github.com/dev-charusat/challenge-semver-automation',
    branchName: 'ci/release-automation',
    commitHash: '8b2f0a1',
    description: 'Configured GitHub Actions release-please workflow with SemVer 2.0 specs and changelog automation.',
    submittedAt: '2026-09-24T18:15:00Z',
    status: 'Completed',
    score: 220,
    logs: [
      'Validating .github/workflows/release.yml...',
      'Simulating git tag v1.1.0 bump from feat commit...',
      'Changelog generator passed with conventional commits',
      'All automated suites passed!'
    ]
  }
];

export const ChallengeProvider = ({ children }) => {
  // Route & Deep Link Parsing
  const getInitialRoute = () => {
    if (typeof window === 'undefined') return { tab: 'challenges', challengeId: 'gc-01' };
    const hash = window.location.hash.replace(/^#\/?/, '').trim();
    if (hash === 'leaderboard') return { tab: 'leaderboard', challengeId: 'gc-01' };
    if (hash === 'progress') return { tab: 'progress', challengeId: 'gc-01' };
    if (hash === 'challenges' || !hash) return { tab: 'challenges', challengeId: 'gc-01' };
    if (hash.startsWith('challenge-')) {
      const id = hash.replace('challenge-', '');
      if (CHALLENGES.some(c => c.id === id)) {
        return { tab: 'detail', challengeId: id };
      }
    }
    if (CHALLENGES.some(c => c.id === hash)) {
      return { tab: 'detail', challengeId: hash };
    }
    return { tab: 'challenges', challengeId: 'gc-01' };
  };

  const initialRoute = getInitialRoute();

  // Navigation State
  const [activeTab, setActiveTab] = useState(initialRoute.tab); // 'challenges' | 'detail' | 'leaderboard' | 'progress'
  const [selectedChallengeId, setSelectedChallengeId] = useState(initialRoute.challengeId);

  // Sync state to URL hash for deep linking and static host routing
  useEffect(() => {
    if (typeof window === 'undefined') return;
    let targetHash = '#challenges';
    if (activeTab === 'leaderboard') {
      targetHash = '#leaderboard';
    } else if (activeTab === 'progress') {
      targetHash = '#progress';
    } else if (activeTab === 'detail') {
      targetHash = `#challenge-${selectedChallengeId}`;
    }

    if (window.location.hash !== targetHash) {
      window.history.replaceState(null, '', targetHash);
    }
  }, [activeTab, selectedChallengeId]);

  // Listen to browser back/forward and manual hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const route = getInitialRoute();
      setActiveTab(route.tab);
      setSelectedChallengeId(route.challengeId);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Filters State
  const [timelineFilter, setTimelineFilter] = useState('all'); // 'all' | 'active' | 'upcoming' | 'completed'
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'Not Started' | 'In Progress' | 'Completed' | 'Submitted'
  const [searchQuery, setSearchQuery] = useState('');

  // LocalStorage-backed state with defensive fallback
  const [userStatuses, setUserStatuses] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STATUSES);
      return saved ? JSON.parse(saved) : DEFAULT_STATUSES;
    } catch {
      return DEFAULT_STATUSES;
    }
  });

  const [submissions, setSubmissions] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SUBMISSIONS);
      return saved ? JSON.parse(saved) : DEFAULT_SUBMISSIONS;
    } catch {
      return DEFAULT_SUBMISSIONS;
    }
  });

  // Toast message state
  const [toastMessage, setToastMessage] = useState(null);

  // Sync to localStorage with defensive try/catch
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.STATUSES, JSON.stringify(userStatuses));
    } catch {
      // Safe fallback if storage quota exceeded or restricted
    }
  }, [userStatuses]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(submissions));
    } catch {
      // Safe fallback
    }
  }, [submissions]);

  const showToast = (title, message, type = 'success') => {
    setToastMessage({ title, message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const navigateToChallenge = (id) => {
    setSelectedChallengeId(id);
    setActiveTab('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startChallenge = (id) => {
    const challenge = CHALLENGES.find(c => c.id === id);
    if (!challenge) return;

    if (challenge.timelineStatus === 'upcoming') {
      showToast('Upcoming Challenge', 'This challenge has not opened yet. Check back when the countdown ends!', 'info');
      return;
    }

    setUserStatuses(prev => ({
      ...prev,
      [id]: 'In Progress'
    }));

    showToast('Challenge Started!', `You have begun "${challenge.title}". Good luck!`, 'success');
  };

  const recordSubmission = (challengeId, submissionData) => {
    const challenge = CHALLENGES.find(c => c.id === challengeId);
    if (!challenge) return;

    const newSubmission = {
      challengeId,
      repoUrl: submissionData.repoUrl,
      demoUrl: submissionData.demoUrl || '',
      description: submissionData.description || submissionData.notes || '',
      branchName: submissionData.branchName || 'main',
      commitHash: submissionData.commitHash || 'a1b2c3d',
      submittedAt: new Date().toISOString(),
      status: 'Submitted',
      score: challenge.points,
      logs: [
        `Connecting to repository ${submissionData.repoUrl}...`,
        `Branch '${submissionData.branchName || 'main'}' verified at commit ${submissionData.commitHash || 'HEAD'}`,
        `Checking live demo URL ${submissionData.demoUrl || 'N/A'} (HTTP 200 OK)`,
        `Validating commit history topology and commitlint conventions...`,
        `Executing automated test matrix against upstream criteria...`,
        `Local validation stages complete (100% tests green)`,
        `Submission recorded with status: Submitted`
      ]
    };

    setSubmissions(prev => [newSubmission, ...prev.filter(s => s.challengeId !== challengeId)]);

    setUserStatuses(prev => ({
      ...prev,
      [challengeId]: 'Submitted'
    }));

    showToast('Solution Submitted!', `"${challenge.title}" successfully submitted. Status: Submitted.`, 'success');
  };

  const approveSubmission = (challengeId) => {
    const challenge = CHALLENGES.find(c => c.id === challengeId);
    if (!challenge) return;

    setUserStatuses(prev => ({
      ...prev,
      [challengeId]: 'Completed'
    }));

    setSubmissions(prev => prev.map(s => {
      if (s.challengeId === challengeId) {
        return { ...s, status: 'Completed' };
      }
      return s;
    }));

    showToast('Challenge Approved!', `Congratulations! "${challenge.title}" verified and +${challenge.points} XP awarded!`, 'success');
  };

  const updateChallengeStatus = (id, newStatus) => {
    const challenge = CHALLENGES.find(c => c.id === id);
    setUserStatuses(prev => ({
      ...prev,
      [id]: newStatus
    }));

    if (newStatus === 'Completed') {
      setSubmissions(prev => {
        const existing = prev.find(s => s.challengeId === id);
        if (existing) {
          return prev.map(s => s.challengeId === id ? { ...s, status: 'Completed' } : s);
        }
        return [
          {
            challengeId: id,
            repoUrl: `https://github.com/dev-charusat/${id}-solution`,
            branchName: 'solution/verified',
            commitHash: 'e4f7a2c',
            submittedAt: new Date().toISOString(),
            status: 'Completed',
            score: challenge ? challenge.points : 150,
            description: 'Solution verified and passed all acceptance criteria.',
            logs: ['Automated grader suites passed 100%']
          },
          ...prev
        ];
      });
      showToast('Challenge Completed!', `"${challenge ? challenge.title : id}" marked as Completed!`, 'success');
    } else {
      showToast('Status Updated', `Challenge status set to "${newStatus}".`, 'info');
    }
  };

  const resetAllProgress = () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.STATUSES);
      localStorage.removeItem(STORAGE_KEYS.SUBMISSIONS);
    } catch {
      // Safe fallback
    }

    setUserStatuses(DEFAULT_STATUSES);
    setSubmissions(DEFAULT_SUBMISSIONS);

    showToast('Arena Reset', 'All simulated challenge statuses and points have been reset to default state.', 'info');
  };

  // Dynamic status-based groupings
  const userCompletedChallenges = CHALLENGES.filter(c => userStatuses[c.id] === 'Completed');
  const userInProgressChallenges = CHALLENGES.filter(c => userStatuses[c.id] === 'In Progress');
  const userSubmittedChallenges = CHALLENGES.filter(c => userStatuses[c.id] === 'Submitted');
  const userNotStartedChallenges = CHALLENGES.filter(c => !userStatuses[c.id] || userStatuses[c.id] === 'Not Started');

  const userCompletedCount = userCompletedChallenges.length;
  const userInProgressCount = userInProgressChallenges.length;
  const userSubmittedCount = userSubmittedChallenges.length;
  const userNotStartedCount = userNotStartedChallenges.length;

  // Dynamic point & streak calculation
  const basePoints = 530; // Points earned from previous campus sprint activities
  const earnedChallengeXP = userCompletedChallenges.reduce((sum, c) => sum + c.points, 0);
  const submittedBonusXP = userSubmittedCount * 25; // Modest submission bonus
  const totalEarnedXP = basePoints + earnedChallengeXP + submittedBonusXP;

  // Streak: base 5 days + 1 for each additional completion + active submission
  const currentStreak = Math.min(14, 5 + Math.max(0, userCompletedCount - 2) + (userSubmittedCount > 0 ? 1 : 0));

  // Dynamic badges unlocked
  const unlockedBadges = BADGES_CATALOG.filter(b => b.checkUnlocked(userStatuses)).map(b => b.name);

  // Dynamic Leaderboard Calculation with Reactive Current User Entry
  const dynamicLeaderboard = INITIAL_LEADERBOARD.map(entry => {
    if (entry.id === 'user-current' || entry.isCurrentUser) {
      return {
        ...entry,
        points: totalEarnedXP,
        solved: userCompletedCount,
        streak: currentStreak,
        badges: unlockedBadges
      };
    }
    return entry;
  })
    .sort((a, b) => b.points - a.points)
    .map((item, idx) => ({ ...item, rank: idx + 1 }));

  const currentUserRank = dynamicLeaderboard.find(u => u.isCurrentUser || u.id === 'user-current')?.rank || 5;

  // Dynamic User Profile
  const userProfile = {
    id: 'user-current',
    name: 'Dev Patel',
    handle: 'dev_charusat',
    department: 'CSPIT — Information Technology',
    studentId: '22IT045',
    semester: '4th Sem',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&h=120&q=80',
    points: totalEarnedXP,
    streak: currentStreak,
    badges: unlockedBadges,
    rank: currentUserRank,
    joinedDate: 'August 2026'
  };

  const activeChallengesCount = CHALLENGES.filter(c => c.timelineStatus === 'active').length;
  const upcomingChallengesCount = CHALLENGES.filter(c => c.timelineStatus === 'upcoming').length;
  const completedChallengesCount = CHALLENGES.filter(c => c.timelineStatus === 'completed').length;
  const totalEarnableXP = CHALLENGES.reduce((sum, c) => sum + c.points, 0);
  const progressPercent = Math.round((userCompletedCount / CHALLENGES.length) * 100);

  const currentChallenge = CHALLENGES.find(c => c.id === selectedChallengeId) || CHALLENGES[0];

  return (
    <ChallengeContext.Provider
      value={{
        challenges: CHALLENGES,
        activeTab,
        setActiveTab,
        selectedChallengeId,
        setSelectedChallengeId,
        currentChallenge,
        navigateToChallenge,
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
        startChallenge,
        updateChallengeStatus,
        recordSubmission,
        approveSubmission,
        submissions,
        userProfile,
        leaderboard: dynamicLeaderboard,
        currentUserRank,
        badgesCatalog: BADGES_CATALOG,
        resetAllProgress,
        toastMessage,
        setToastMessage,
        stats: {
          activeChallengesCount,
          upcomingChallengesCount,
          completedChallengesCount,
          userCompletedCount,
          userInProgressCount,
          userSubmittedCount,
          userNotStartedCount,
          totalChallenges: CHALLENGES.length,
          progressPercent,
          totalEarnableXP,
          earnedChallengeXP,
          userCompletedChallenges,
          userInProgressChallenges,
          userSubmittedChallenges,
          userNotStartedChallenges
        }
      }}
    >
      {children}
    </ChallengeContext.Provider>
  );
};
