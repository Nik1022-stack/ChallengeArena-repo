import { ChallengeProvider } from './context/ChallengeContext';
import { useChallenges } from './hooks/useChallenges';
import { Navbar } from './components/Navbar';
import { ChallengeList } from './components/ChallengeList';
import { ChallengeDetail } from './components/ChallengeDetail';
import { Leaderboard } from './components/Leaderboard';
import { UserProgress } from './components/UserProgress';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';

const AppContent = () => {
  const { activeTab } = useChallenges();

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 selection:bg-orange-500/30 selection:text-orange-200">
      <Navbar />

      <main className="flex-1">
        <div key={activeTab} className="animate-page-enter">
          {activeTab === 'challenges' && <ChallengeList />}
          {activeTab === 'detail' && <ChallengeDetail />}
          {activeTab === 'leaderboard' && <Leaderboard />}
          {activeTab === 'progress' && <UserProgress />}
        </div>
      </main>

      <Footer />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <ChallengeProvider>
      <AppContent />
    </ChallengeProvider>
  );
}
