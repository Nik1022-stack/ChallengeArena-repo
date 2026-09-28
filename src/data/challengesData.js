export const CHALLENGES = [
  {
    id: "gc-01",
    title: "Feature Branching & Clean PR Workflow",
    category: "Git Branching",
    difficulty: "Beginner",
    points: 150,
    duration: "40 mins",
    timelineStatus: "active",
    deadline: "2026-10-15T23:59:59",
    deadlineFormatted: "Oct 15, 2026",
    solvedCount: 94,
    tags: ["git branch", "pull-request", "git checkout -b", "conventional-commits"],
    shortDescription: "Master the standard GitHub Flow used at CHARUSAT Git Club. Create isolated feature branches, write atomic commits, and draft a peer-reviewable Pull Request.",
    problemDescription: `In professional software engineering teams and active open-source repositories like Git Club CHARUSAT, pushing directly to \`main\` is strictly disallowed. Every feature, bugfix, or enhancement must originate from an isolated feature branch and undergo peer code review via Pull Requests.

Your task is to take our sample student portal repository (\`charusat-portal-frontend\`), create a proper feature branch conforming to our naming standard \`feature/<feature-name>\`, implement the requested Student Directory search component, and craft a clean Git history with descriptive atomic commits.`,
    requirements: [
      "Fork the official starter repository `gitclub-charusat/challenge-feature-branch` to your GitHub account.",
      "Clone your fork and configure upstream remote tracking correctly.",
      "Create a feature branch named `feature/student-search-filter` from the latest `main` branch.",
      "Implement the search filter logic in `src/components/StudentSearch.jsx` to filter by Department and Enrolment Number.",
      "Make at least 3 distinct atomic commits following the Conventional Commits specification (e.g., `feat:`, `test:`, `docs:`).",
      "Ensure `npm run test` passes 100% without lint warnings.",
      "Open a clean Pull Request targeting the upstream `main` branch with our standard PR checklist template completed."
    ],
    rules: [
      "Direct commits or pushes to the `main` branch are strictly prohibited.",
      "Commit messages must not contain generic text like 'update', 'fix bug', or 'changes'.",
      "No binary files or `node_modules` should ever be tracked in Git history (enforce `.gitignore`).",
      "All pull requests must include a clear summary and screenshots or verification steps in the description."
    ],
    starterRepo: "https://github.com/gitclub-charusat/challenge-feature-branch",
    cloneCommand: "git clone https://github.com/gitclub-charusat/challenge-feature-branch.git",
    testCases: [
      { name: "Branch name matches feature/student-search-filter", weight: "20%" },
      { name: "At least 3 atomic commits with Conventional Commit format", weight: "30%" },
      { name: "Unit tests for search filtering pass completely", weight: "30%" },
      { name: "Pull Request template filled with test results", weight: "20%" }
    ],
    hints: [
      "Use `git checkout -b feature/student-search-filter` to create and switch in one step.",
      "Keep commits focused: separate UI scaffolding from data filtering logic.",
      "Verify your remote tracking branches using `git remote -v`."
    ]
  },
  {
    id: "gc-02",
    title: "Resolving Complex 3-Way Merge Conflicts",
    category: "Merge & Rebase",
    difficulty: "Intermediate",
    points: 250,
    duration: "1 hour",
    timelineStatus: "active",
    deadline: "2026-10-18T23:59:59",
    deadlineFormatted: "Oct 18, 2026",
    solvedCount: 62,
    tags: ["merge-conflict", "git merge", "diff3", "conflict-resolution"],
    shortDescription: "Simulate a real collaborative clash where two teams updated identical API routes simultaneously. Resolve the conflict without losing critical route parameters.",
    problemDescription: `During the CHARUSAT Spoural Hackathon development sprint, the Authentication team and the Academic Results team both modified \`server/routes/api.js\` concurrently on separate branches. When attempting to merge branch \`team/auth-v2\` into \`main\`, Git halted with severe conflict markers (\`<<<<<<<\`, \`=======\`, \`>>>>>>>\`).

In this challenge, you will step into the shoes of the Repository Maintainer. You must inspect both sets of conflicting changes, preserve the new JWT validation middleware from Auth Team while retaining the newly added Semester Exam endpoints from Results Team, and produce a flawless merge commit with all unit tests passing.`,
    requirements: [
      "Clone the conflict sandbox repository containing conflicting branches `feature/auth-v2` and `feature/exam-routes`.",
      "Checkout a working integration branch `integration/release-v1`.",
      "Initiate the merge with `feature/auth-v2` and reproduce the merge conflict in `server/routes/api.js`.",
      "Use Git diff / conflict markers to understand the conflicting chunks.",
      "Synthesize both codebases: keep JWT authentication guards on all protected routes while preserving the new `/api/results/semester` handler.",
      "Ensure all conflict markers are completely eliminated.",
      "Run `npm test` to verify that both auth and results test suites pass simultaneously.",
      "Finalize the merge with an informative merge commit message referencing both feature branches."
    ],
    rules: [
      "Do NOT discard either team's functional logic (no blind `git checkout --ours` or `git checkout --theirs`).",
      "No conflict marker leftovers (`<<<<<<<`, `=======`, `>>>>>>>`) may remain in any file.",
      "Commit message must explain how the conflicting routes were harmonized.",
      "All legacy endpoints must maintain backward compatibility."
    ],
    starterRepo: "https://github.com/gitclub-charusat/challenge-merge-conflict-sandbox",
    cloneCommand: "git clone https://github.com/gitclub-charusat/challenge-merge-conflict-sandbox.git",
    testCases: [
      { name: "Clean removal of all conflict markers", weight: "25%" },
      { name: "JWT Auth middleware properly injected", weight: "25%" },
      { name: "Exam results endpoints intact and responsive", weight: "25%" },
      { name: "End-to-end integration test passes (HTTP 200)", weight: "25%" }
    ],
    hints: [
      "Configure `git config merge.conflictStyle zdiff3` to view the common ancestor alongside both branches!",
      "Use `git status` to see which files are 'both modified'.",
      "Run `git log --merge -p <filename>` to inspect the precise conflicting changes from both commits."
    ]
  },
  {
    id: "gc-03",
    title: "Interactive Rebase & Git History Rewriting",
    category: "Merge & Rebase",
    difficulty: "Advanced",
    points: 350,
    duration: "1.5 hours",
    timelineStatus: "active",
    deadline: "2026-10-22T23:59:59",
    deadlineFormatted: "Oct 22, 2026",
    solvedCount: 38,
    tags: ["git rebase -i", "squash", "commit-hygiene", "fixup"],
    shortDescription: "Turn a messy 12-commit branch full of 'typo', 'wip', and 'fix again' into 3 pristine, atomic commits ready for upstream production merge.",
    problemDescription: `A junior contributor submitted a pull request with 14 commits. While the final code functions well, the commit log is cluttered with messages like:
- \`wip\`
- \`fixed syntax error\`
- \`oops forgot file\`
- \`testing on vercel\`
- \`temp commit before lunch\`

In open source engineering at Git Club CHARUSAT, maintaining an immutable, readable, bisectable git history is essential. Your objective is to use \`git rebase -i\` (interactive rebase) to squash noise commits, reword unclear messages, reorder dependent commits, and drop accidental debug files.`,
    requirements: [
      "Clone the repository `challenge-interactive-rebase-sandbox` and checkout branch `messy-work`.",
      "Run an interactive rebase against `main` using `git rebase -i main`.",
      "Squash and fixup minor typo/patch commits into their respective parent feature commits.",
      "Reword commit messages to follow the format: `<type>(<scope>): <subject>`.",
      "Completely drop the accidental commit that introduced `secret_api_key.env` from history.",
      "Resulting branch must contain exactly 3 clean, logical commits: `feat(api)`, `test(api)`, and `docs(readme)`.",
      "Ensure project builds and runs without errors at every commit in the new history."
    ],
    rules: [
      "The final Git history must have EXACTLY 3 commits on top of `main`.",
      "No debug console logs or temporary `.env` files may remain in any commit snapshot.",
      "Every single commit in the rebased history must be self-contained and buildable."
    ],
    starterRepo: "https://github.com/gitclub-charusat/challenge-rebase-mastery",
    cloneCommand: "git clone https://github.com/gitclub-charusat/challenge-rebase-mastery.git",
    testCases: [
      { name: "Git history reduced to exactly 3 commits", weight: "30%" },
      { name: "Secret key commit completely purged from history", weight: "25%" },
      { name: "Conventional commit format verified on all commits", weight: "25%" },
      { name: "All build steps succeed on each individual commit", weight: "20%" }
    ],
    hints: [
      "Use `fixup` (or `f`) instead of `squash` if you don't need to retain the intermediate commit message.",
      "Use `drop` (or `d`) to eliminate the commit that added secret credentials.",
      "If you make a mistake during rebase, remember `git rebase --abort` brings you back to safety."
    ]
  },
  {
    id: "gc-04",
    title: "GitHub Actions CI Pipeline: Automated Lint & Test Matrix",
    category: "CI/CD & DevOps",
    difficulty: "Intermediate",
    points: 300,
    duration: "1 hour",
    timelineStatus: "active",
    deadline: "2026-10-25T23:59:59",
    deadlineFormatted: "Oct 25, 2026",
    solvedCount: 45,
    tags: ["github-actions", "ci-cd", "yaml", "matrix-testing"],
    shortDescription: "Construct a robust GitHub Actions workflow that executes matrix testing across Node 18, 20, and 22, caching dependencies and enforcing code quality gates.",
    problemDescription: `To maintain high software reliability across all Git Club CHARUSAT open source initiatives, every repository must have automated continuous integration (CI).

In this challenge, you will design and write a production-ready \`.github/workflows/ci.yml\` pipeline from scratch. The pipeline must trigger on all Pull Requests targeting \`main\` and on all direct pushes to \`main\`. It must run linting, run unit tests across multiple Node.js versions in parallel using a test matrix, and report test coverage summary back to the PR.`,
    requirements: [
      "Initialize `.github/workflows/ci.yml` in the starter repository.",
      "Set trigger events for `push` to `main` and `pull_request` targeting `main`.",
      "Configure a `matrix` strategy targeting Node.js versions `[18.x, 20.x, 22.x]` on `ubuntu-latest`.",
      "Implement dependency caching using `actions/setup-node` with `cache: 'npm'` to speed up pipeline execution.",
      "Add job steps for: `npm ci`, `npm run lint`, and `npm test -- --coverage`.",
      "Fail the pipeline if lint errors exist or if code coverage falls below 80%."
    ],
    rules: [
      "YAML syntax must be 100% valid and conform to GitHub Actions v2 specs.",
      "Must use `npm ci` rather than `npm install` for reproducible CI builds.",
      "No hardcoded credentials or unpinned insecure third-party actions."
    ],
    starterRepo: "https://github.com/gitclub-charusat/challenge-ci-pipeline",
    cloneCommand: "git clone https://github.com/gitclub-charusat/challenge-ci-pipeline.git",
    testCases: [
      { name: "Valid YAML workflow syntax", weight: "20%" },
      { name: "Matrix execution configured for Node 18, 20, 22", weight: "30%" },
      { name: "Dependency cache correctly defined", weight: "25%" },
      { name: "Coverage threshold and lint gate enforced", weight: "25%" }
    ],
    hints: [
      "Use `strategy: matrix: node-version: [18, 20, 22]` in your YAML job definition.",
      "Always use `npm ci` in CI environments to ensure lockfile compliance."
    ]
  },
  {
    id: "gc-05",
    title: "Git Forensics: Debugging with Git Bisect & Blame",
    category: "Git Forensics",
    difficulty: "Advanced",
    points: 400,
    duration: "1.5 hours",
    timelineStatus: "upcoming",
    deadline: "2026-11-05T23:59:59",
    deadlineFormatted: "Nov 05, 2026",
    solvedCount: 0,
    tags: ["git bisect", "git blame", "binary-search", "regression"],
    shortDescription: "A critical memory leak was introduced somewhere within the last 150 commits. Use binary search with Git Bisect to isolate the culprit commit in under 8 steps.",
    problemDescription: `A high-traffic CHARUSAT Student Portal service experienced a major regression that causes memory starvation during file uploads. The regression is known to be absent in release \`v2.0.0\` (commit \`a8b1c4e\`) but occurs in \`v2.4.0\` (commit \`f9e2d1a\`). Between these two tags lie 142 commits from 18 contributors.

Rather than manually checking out each commit, you will utilize the power of \`git bisect\` to conduct an automated binary search over git history. You will write an automated test script and let Git pinpoint the exact commit and developer responsible for the regression within minutes.`,
    requirements: [
      "Study the regression symptom and inspect test runner `scripts/leak-check.sh`.",
      "Initiate bisect mode with `git bisect start`.",
      "Mark `HEAD` as bad and `v2.0.0` as good.",
      "Automate the search process using `git bisect run ./scripts/leak-check.sh` or manually step through `git bisect good` / `git bisect bad`.",
      "Identify the faulty commit hash, commit author, and the exact lines of code that caused the memory leak.",
      "Submit a detailed incident report and patch commit reverting or fixing the offending line."
    ],
    rules: [
      "You must provide the exact 40-character SHA of the culprit commit.",
      "Provide the output of `git bisect log` demonstrating the binary search progression.",
      "Write a short Root Cause Analysis (RCA) explaining why the change failed."
    ],
    starterRepo: "https://github.com/gitclub-charusat/challenge-git-bisect-investigation",
    cloneCommand: "git clone https://github.com/gitclub-charusat/challenge-git-bisect-investigation.git",
    testCases: [
      { name: "Accurate culprit commit SHA identified", weight: "40%" },
      { name: "Git bisect log demonstrates logarithmic efficiency (<= 8 steps)", weight: "30%" },
      { name: "Root Cause Analysis report meets engineering standards", weight: "30%" }
    ],
    hints: [
      "Formula: log2(150) ≈ 7.2, meaning Git Bisect requires only 7 to 8 tests to locate the bug!",
      "Run `git bisect reset` when finished to return to your original HEAD."
    ]
  },
  {
    id: "gc-06",
    title: "Disaster Recovery: Rescuing Code with Git Reflog",
    category: "Git Forensics",
    difficulty: "Intermediate",
    points: 300,
    duration: "45 mins",
    timelineStatus: "upcoming",
    deadline: "2026-11-12T23:59:59",
    deadlineFormatted: "Nov 12, 2026",
    solvedCount: 0,
    tags: ["git reflog", "detached-head", "git reset --hard", "recovery"],
    shortDescription: "A developer ran 'git reset --hard HEAD~5' and accidentally deleted an unpushed branch. Use Git Reflog to recover the orphaned commits without data loss.",
    problemDescription: `Disaster strikes: Late at night, a developer intended to discard uncommitted file modifications, but accidentally executed \`git reset --hard HEAD~5\`, blowing away 5 crucial commits that contained an entire weekend's worth of hackathon code. Furthermore, the branch was deleted with \`git branch -D feature/payment-gateway\`.

Panicked, they came to the Git Club CHARUSAT helpdesk. As a Git wizard, you know that Git almost never truly deletes data immediately. Every pointer movement is recorded in the reference log (\`reflog\`). Your mission is to inspect the reflog, locate the orphaned tip commit, resurrect the branch, and verify no data was lost.`,
    requirements: [
      "Clone the damaged state repository.",
      "Inspect history with `git log` to observe the truncated state.",
      "Run `git reflog` to inspect all previous HEAD transitions.",
      "Locate the commit hash corresponding to the state right before the hard reset.",
      "Create and switch to a restored branch `recovery/payment-gateway` pointing to that commit.",
      "Verify all 5 missing commits and code files are completely restored intact."
    ],
    rules: [
      "All 5 lost commits must be restored in their exact chronological order with intact hashes.",
      "No commits may be cherry-picked individually—restore the branch reference directly.",
      "Submit the commit hash of the recovered branch tip."
    ],
    starterRepo: "https://github.com/gitclub-charusat/challenge-reflog-recovery",
    cloneCommand: "git clone https://github.com/gitclub-charusat/challenge-reflog-recovery.git",
    testCases: [
      { name: "Recovery branch created at exact pre-reset commit", weight: "50%" },
      { name: "All 5 commits verified in recovered git log", weight: "50%" }
    ],
    hints: [
      "Use `git reflog show HEAD` or `git log -g` to view the reflog entries.",
      "Once you locate `HEAD@{index}`, run `git branch recovery/payment-gateway HEAD@{index}`."
    ]
  },
  {
    id: "gc-07",
    title: "Open Source First PR: CHARUSAT Community Toolkit",
    category: "Open Source & PR",
    difficulty: "Beginner",
    points: 100,
    duration: "30 mins",
    timelineStatus: "completed",
    deadline: "2026-09-20T23:59:59",
    deadlineFormatted: "Sep 20, 2026",
    solvedCount: 142,
    tags: ["first-pr", "markdown", "fork", "upstream"],
    shortDescription: "The inaugural challenge for all first-year CHARUSAT developers. Fork the community repository, add your student profile card, and make your first verified PR.",
    problemDescription: `Welcome to Git Club CHARUSAT! This inaugural challenge is designed to get every developer comfortable with the complete open source lifecycle: forking, cloning, branching, opening a PR, addressing code review suggestions, and celebrating your first merged contribution!`,
    requirements: [
      "Fork `gitclub-charusat/community-toolkit` to your GitHub profile.",
      "Add your student profile JSON in `data/students/<your-id>.json`.",
      "Ensure JSON schema validation passes with `npm run validate`.",
      "Submit your PR with the title `profile: add <your-name> (<dept>)`."
    ],
    rules: [
      "Only edit your own JSON file in the `data/students/` directory.",
      "Must follow the standard schema format provided in `schema.json`."
    ],
    starterRepo: "https://github.com/gitclub-charusat/community-toolkit",
    cloneCommand: "git clone https://github.com/gitclub-charusat/community-toolkit.git",
    testCases: [
      { name: "JSON schema passes automated validation", weight: "50%" },
      { name: "Correct directory and naming convention", weight: "50%" }
    ],
    hints: [
      "Validate your JSON syntax locally with `npm test` before pushing."
    ]
  },
  {
    id: "gc-08",
    title: "Semantic Versioning & Automated Release Drafter",
    category: "CI/CD & DevOps",
    difficulty: "Intermediate",
    points: 220,
    duration: "50 mins",
    timelineStatus: "completed",
    deadline: "2026-09-25T23:59:59",
    deadlineFormatted: "Sep 25, 2026",
    solvedCount: 78,
    tags: ["semver", "changelog", "release-please", "tags"],
    shortDescription: "Automate semantic release notes and version tagging using commit analysis. Understand SemVer principles: major, minor, and patch releases.",
    problemDescription: `Manual changelog writing and version bumping are error-prone. In this challenge, participants configured automated semantic release tagging based on commit history analysis. Whenever a feature is merged, release-please calculates whether to trigger a v1.1.0 or v1.0.1 tag automatically.`,
    requirements: [
      "Analyze commit logs to distinguish fix (patch), feat (minor), and breaking changes (major).",
      "Setup Release Please workflow `.github/workflows/release.yml`.",
      "Generate an automated CHANGELOG.md that compiles all merged commits.",
      "Publish simulated Git tags with signed GPG keys."
    ],
    rules: [
      "Strict SemVer 2.0.0 compliance required.",
      "CHANGELOG must group changes by Features, Bug Fixes, and Documentation."
    ],
    starterRepo: "https://github.com/gitclub-charusat/challenge-semver-automation",
    cloneCommand: "git clone https://github.com/gitclub-charusat/challenge-semver-automation.git",
    testCases: [
      { name: "Proper SemVer bump calculated", weight: "50%" },
      { name: "Structured CHANGELOG.md generated", weight: "50%" }
    ],
    hints: [
      "Remember: `feat:` bumps MINOR, `fix:` bumps PATCH, and `BREAKING CHANGE:` bumps MAJOR."
    ]
  }
];
