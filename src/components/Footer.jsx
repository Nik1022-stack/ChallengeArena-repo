import { GitBranch, GitPullRequest } from 'lucide-react';
import { useChallenges } from '../hooks/useChallenges';

export const Footer = () => {
  const { setActiveTab } = useChallenges();

  return (
    <footer className="mt-auto border-t border-slate-800/80 bg-slate-950 text-slate-400 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
              <GitBranch className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Git Club CHARUSAT</p>
              <p className="text-xs text-slate-500">
                Charotar University of Science and Technology • Changa, Gujarat
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs">
            <button
              onClick={() => {
                setActiveTab('challenges');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-white transition-colors"
            >
              Challenges
            </button>
            <button
              onClick={() => {
                setActiveTab('leaderboard');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-white transition-colors"
            >
              Leaderboard
            </button>
            <button
              onClick={() => {
                setActiveTab('progress');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-white transition-colors"
            >
              My Progress
            </button>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <GitPullRequest className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© 2026 Git Club CHARUSAT. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built for Problem Statement 4 — Challenge Arena
          </p>
        </div>
      </div>
    </footer>
  );
};
