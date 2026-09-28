# Git Club CHARUSAT — Challenge Arena

> **Problem Statement 4 — Challenge Arena**  
> Official technical competition and open-source contribution platform built for **Git Club CHARUSAT** (Charotar University of Science and Technology, Changa, Gujarat).

---

## 🌟 Production Deployment Status

- **Build Pipeline**: Vite 8.3 + React 19 + Tailwind CSS v4
- **Lint Status**: 0 errors, 0 warnings (`eslint .`)
- **Verification**: 100% passed (`npm run verify:build`)
- **Hosting Compatibility**: GitHub Pages, Vercel, Netlify, Cloudflare Pages
- **Zero Localhost Dependencies**: Standalone client-side application with self-contained mock data and resilient `localStorage` state simulation.

---

## 🚀 Quick Deployment Guide

### Option 1: GitHub Pages (Recommended)

This repository includes a pre-configured GitHub Actions workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) and an SPA fallback in [`public/404.html`](public/404.html).

#### Steps:
1. **Initialize Git & Push to GitHub**:
   ```bash
   cd challenge
   git init
   git add .
   git commit -m "feat: Git Club Challenge Arena production release"
   git branch -M main
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPOSITORY_NAME>.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub.
   - Navigate to **Settings** → **Pages**.
   - Under **Build and deployment** → **Source**, select **GitHub Actions**.
   - GitHub Actions will automatically run the deployment workflow and publish your site at:
     ```
     https://<YOUR_GITHUB_USERNAME>.github.io/<YOUR_REPOSITORY_NAME>/
     ```

---

### Option 2: Vercel (Instant CLI or Web)

A [`vercel.json`](vercel.json) file with SPA rewrite rules is already configured in the root directory.

#### Using Vercel CLI:
```bash
cd challenge
npx vercel
```
- Select your project scope and default settings.
- When prompted for output directory, confirm `dist`.
- For production deployment:
  ```bash
  npx vercel --prod
  ```

#### Using Vercel Web Dashboard:
1. Push your repository to GitHub.
2. Go to [vercel.com](https://vercel.com) and click **Add New Project**.
3. Import the repository.
4. Set **Root Directory** to `challenge` (if deploying from parent folder) or leave root.
5. Click **Deploy**.

---

### Option 3: Netlify (Drag-and-Drop or CLI)

A [`netlify.toml`](netlify.toml) and [`public/_redirects`](public/_redirects) file are already configured.

#### Drag-and-Drop (No CLI required):
1. Run the local production build:
   ```bash
   npm run build
   ```
2. Log in to [app.netlify.com](https://app.netlify.com).
3. Navigate to **Sites** → drag and drop the `challenge/dist` folder into the dropzone.
4. Your site will immediately receive an active live public URL.

#### Using Netlify CLI:
```bash
cd challenge
npx netlify deploy --prod --dir=dist
```

---

## 🧪 Local Production Verification

To verify the production build locally before or after deploying:

```bash
# 1. Run ESLint checks
npm run lint

# 2. Compile optimized production bundle
npm run build

# 3. Run automated bundle & asset verification
npm run verify:build

# 4. Preview the production build locally
npm run preview
```

---

## 🎯 Evaluator Guide & Interactive Features

| Section | Route | What to Evaluate |
| :--- | :--- | :--- |
| **Main Dashboard & Challenges** | `/#challenges` | Search, timeline filters (Active, Upcoming, Completed), category tags, difficulty pills, points breakdown |
| **Challenge Detail & CTA** | `/#challenge-gc-01` | Problem description, terminal commands, step-by-step requirements, interactive checklist, rules |
| **Simulated Submission Flow** | `/#challenge-gc-01` | Click **Submit Solution**, enter Git branch, commit hash, repo URL, and test real-time terminal verification logs |
| **Participant Leaderboard** | `/#leaderboard` | Live podium, dynamic ranking for user **Dev Patel**, reactive XP updates |
| **My Progress & Badges** | `/#progress` | Completion metrics, streak, badge unlocks, submission history cards with verification logs |
| **One-Click Reset** | Header Menu / Avatar | Click the reset button (↺) anytime in the top-right header to restore simulated data to default |

---

## 🛠 Tech Stack & Architecture

- **Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS v4 (Zero runtime overhead, modern technical dark theme)
- **Icons**: Lucide React
- **State Management**: React Context (`ChallengeContext`) with safe `localStorage` synchronization
- **Routing**: Client-side hash routing (`window.location.hash`) for zero-configuration static hosting support
