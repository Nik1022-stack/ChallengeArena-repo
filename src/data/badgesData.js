export const BADGES_CATALOG = [
  {
    id: 'badge-branch-explorer',
    name: 'Branch Explorer',
    category: 'Git Basics',
    rarity: 'Common',
    icon: '🌿',
    desc: 'Created first feature branch conforming to naming specs and isolated topology.',
    criteria: 'Start or participate in any Git Branching challenge',
    checkUnlocked: () => true // Participant badge
  },
  {
    id: 'badge-commit-crafter',
    name: 'Commit Crafter',
    category: 'Commit Hygiene',
    rarity: 'Common',
    icon: '📝',
    desc: 'Crafted 5+ atomic conventional commits following feat, test, docs schema.',
    criteria: 'Submit atomic commits with conventional commit message format',
    checkUnlocked: () => true // Earned during workshop
  },
  {
    id: 'badge-community-champion',
    name: 'Community Champion',
    category: 'Open Source',
    rarity: 'Special',
    icon: '🌟',
    desc: 'Contributed verified feature to the open-source Git Club community toolkit.',
    criteria: 'Complete the "Open Source Community Toolkit Contribution" challenge (gc-07)',
    targetChallengeId: 'gc-07',
    checkUnlocked: (statuses) => statuses['gc-07'] === 'Completed'
  },
  {
    id: 'badge-cicd-wizard',
    name: 'CI/CD Wizard',
    category: 'DevOps & Automation',
    rarity: 'Special',
    icon: '⚡',
    desc: 'Constructed automated GitHub Actions matrix pipelines with automated releases.',
    criteria: 'Complete any DevOps or GitHub Actions challenge (gc-08 or gc-05)',
    targetChallengeId: 'gc-08',
    checkUnlocked: (statuses) => statuses['gc-08'] === 'Completed' || statuses['gc-05'] === 'Completed'
  },
  {
    id: 'badge-branch-master',
    name: 'Branch Master',
    category: 'Git Branching',
    rarity: 'Epic',
    icon: '🌳',
    desc: 'Mastered the complete GitHub Flow, clean feature branching, and pull request review.',
    criteria: 'Complete the "Feature Branching & Clean PR Workflow" challenge (gc-01)',
    targetChallengeId: 'gc-01',
    checkUnlocked: (statuses) => statuses['gc-01'] === 'Completed'
  },
  {
    id: 'badge-conflict-solver',
    name: 'Conflict Solver',
    category: 'Merge & Rebase',
    rarity: 'Epic',
    icon: '⚔️',
    desc: 'Resolved high-complexity 3-way merge conflict without regression bugs.',
    criteria: 'Complete the "Resolving Complex 3-Way Merge Conflicts" challenge (gc-02)',
    targetChallengeId: 'gc-02',
    checkUnlocked: (statuses) => statuses['gc-02'] === 'Completed'
  },
  {
    id: 'badge-merge-samurai',
    name: 'Merge Samurai',
    category: 'Merge & Rebase',
    rarity: 'Epic',
    icon: '🥋',
    desc: 'Mastered interactive rebasing, history squashing, and commit rewriting.',
    criteria: 'Complete the "Interactive Rebase & Commit Squashing" challenge (gc-03)',
    targetChallengeId: 'gc-03',
    checkUnlocked: (statuses) => statuses['gc-03'] === 'Completed'
  },
  {
    id: 'badge-bug-hunter',
    name: 'Bug Hunter',
    category: 'Git Bisect',
    rarity: 'Legendary',
    icon: '🔍',
    desc: 'Pinpointed binary search regression in historical codebase using git bisect.',
    criteria: 'Complete the "Git Bisect: Hunting Regressions in Production" challenge (gc-04)',
    targetChallengeId: 'gc-04',
    checkUnlocked: (statuses) => statuses['gc-04'] === 'Completed'
  }
];
