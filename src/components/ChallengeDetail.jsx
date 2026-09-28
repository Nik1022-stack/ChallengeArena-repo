import { useState } from 'react';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  Copy, 
  Check, 
  Send, 
  CheckCircle2, 
  Terminal, 
  ExternalLink, 
  Lock, 
  BookOpen, 
  ListChecks, 
  ShieldAlert, 
  HelpCircle,
  Play
} from 'lucide-react';
import { useChallenges } from '../hooks/useChallenges';
import { SubmissionModal } from './SubmissionModal';
import { DifficultyBadge, PointsBadge } from './ui/Badge';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

export const ChallengeDetail = () => {
  const { 
    currentChallenge, 
    setActiveTab, 
    userStatuses, 
    startChallenge, 
    updateChallengeStatus,
    approveSubmission,
    submissions 
  } = useChallenges();

  const [activeSubTab, setActiveSubTab] = useState('overview'); // 'overview' | 'requirements' | 'rules' | 'criteria' | 'hints'
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [copiedClone, setCopiedClone] = useState(false);
  const [checkedRequirements, setCheckedRequirements] = useState({});

  if (!currentChallenge) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center">
        <p className="text-slate-400 text-sm">No challenge selected.</p>
        <Button
          size="sm"
          variant="primary"
          onClick={() => setActiveTab('challenges')}
          className="mt-4"
        >
          Back to Arena
        </Button>
      </div>
    );
  }

  const userStatus = userStatuses[currentChallenge.id] || 'Not Started';
  const existingSubmission = submissions.find(s => s.challengeId === currentChallenge.id);

  const copyCloneCommand = () => {
    navigator.clipboard.writeText(currentChallenge.cloneCommand);
    setCopiedClone(true);
    setTimeout(() => setCopiedClone(false), 2000);
  };

  const toggleRequirement = (idx) => {
    setCheckedRequirements(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const completedReqsCount = Object.values(checkedRequirements).filter(Boolean).length;
  const totalReqs = currentChallenge.requirements.length;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      
      {/* Top Breadcrumb */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => setActiveTab('challenges')}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-400 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Challenge Arena</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-500">ID: {currentChallenge.id}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
          <span className="text-xs font-mono text-slate-400">{currentChallenge.category}</span>
        </div>
      </div>

      {/* Main Challenge Header Card */}
      <Card padding="lg" className="mb-8">
        <div>
          {/* Metadata badges row */}
          <div className="flex flex-wrap items-center gap-2 mb-3.5">
            <DifficultyBadge difficulty={currentChallenge.difficulty} />

            <PointsBadge points={currentChallenge.points} size="lg" />

            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono text-slate-300 bg-slate-950 border border-slate-800">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Est: {currentChallenge.duration}</span>
            </span>

            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono text-slate-300 bg-slate-950 border border-slate-800">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Deadline: {currentChallenge.deadlineFormatted}</span>
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug mb-3">
            {currentChallenge.title}
          </h1>

          {/* Short description */}
          <p className="text-sm text-slate-300 leading-relaxed max-w-3xl mb-5">
            {currentChallenge.shortDescription}
          </p>

          {/* Starter Repo Clone Snippet */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
            <div className="flex items-center gap-2.5 overflow-x-auto scrollbar-none text-slate-300">
              <Terminal className="w-4 h-4 text-orange-400 shrink-0" />
              <span className="text-orange-400 select-none">$</span>
              <span className="text-slate-200 select-all">{currentChallenge.cloneCommand}</span>
            </div>

            <Button
              size="xs"
              variant="secondary"
              icon={copiedClone ? Check : Copy}
              onClick={copyCloneCommand}
              className="shrink-0"
            >
              {copiedClone ? 'Copied' : 'Copy'}
            </Button>
          </div>

          {/* Participant Status Bar & 4-Status Flow */}
          <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="text-xs text-slate-400 font-mono">CURRENT STATUS:</span>
                {userStatus === 'Completed' && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium bg-emerald-950/60 text-emerald-300 border border-emerald-800/60">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Completed (+{currentChallenge.points} XP Awarded)</span>
                  </span>
                )}
                {userStatus === 'Submitted' && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium bg-purple-950/60 text-purple-300 border border-purple-800/60">
                    <Clock className="w-3.5 h-3.5 text-purple-400" />
                    <span>Submitted — Under Automated Review</span>
                  </span>
                )}
                {userStatus === 'In Progress' && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-950/60 text-blue-300 border border-blue-800/60">
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                    <span>In Progress</span>
                  </span>
                )}
                {userStatus === 'Not Started' && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-950 text-slate-400 border border-slate-800">
                    Not Started
                  </span>
                )}
              </div>

              {/* Status Switcher Pills (Not Started -> In Progress -> Submitted -> Completed) */}
              <div className="flex items-center gap-1.5 text-xs font-mono flex-wrap pt-1">
                <span className="text-[11px] text-slate-500 shrink-0">Set state:</span>
                {['Not Started', 'In Progress', 'Submitted', 'Completed'].map((st) => (
                  <button
                    key={st}
                    onClick={() => updateChallengeStatus(currentChallenge.id, st)}
                    className={`px-2.5 py-1 rounded text-[11px] transition-colors ${
                      userStatus === st
                        ? 'bg-slate-800 text-white font-semibold border border-slate-700'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Action CTA Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              {userStatus === 'Not Started' && currentChallenge.timelineStatus === 'active' && (
                <Button
                  size="md"
                  variant="primary"
                  icon={Play}
                  onClick={() => startChallenge(currentChallenge.id)}
                >
                  Start Challenge
                </Button>
              )}

              {userStatus === 'In Progress' && (
                <Button
                  size="md"
                  variant="primary"
                  icon={Send}
                  onClick={() => setIsSubmitModalOpen(true)}
                >
                  Submit Solution
                </Button>
              )}

              {userStatus === 'Submitted' && (
                <Button
                  size="md"
                  variant="primary"
                  icon={Send}
                  onClick={() => setIsSubmitModalOpen(true)}
                >
                  Update Submission
                </Button>
              )}

              {userStatus === 'Completed' && (
                <Button
                  size="md"
                  variant="outline"
                  icon={CheckCircle2}
                  onClick={() => setIsSubmitModalOpen(true)}
                >
                  Re-submit Solution
                </Button>
              )}

              {currentChallenge.timelineStatus === 'upcoming' && (
                <Button
                  size="md"
                  variant="outline"
                  disabled
                  icon={Lock}
                >
                  Unlocks on {currentChallenge.deadlineFormatted}
                </Button>
              )}
            </div>
          </div>

        </div>
      </Card>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-800 mb-6 overflow-x-auto scrollbar-none pb-px">
        <button
          onClick={() => setActiveSubTab('overview')}
          className={`flex items-center gap-2 px-3.5 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
            activeSubTab === 'overview'
              ? 'border-orange-500 text-orange-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Problem Description</span>
        </button>

        <button
          onClick={() => setActiveSubTab('requirements')}
          className={`flex items-center gap-2 px-3.5 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
            activeSubTab === 'requirements'
              ? 'border-orange-500 text-orange-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <ListChecks className="w-4 h-4" />
          <span>Requirements ({completedReqsCount}/{totalReqs})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('rules')}
          className={`flex items-center gap-2 px-3.5 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
            activeSubTab === 'rules'
              ? 'border-orange-500 text-orange-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>Arena Rules</span>
        </button>

        <button
          onClick={() => setActiveSubTab('criteria')}
          className={`flex items-center gap-2 px-3.5 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
            activeSubTab === 'criteria'
              ? 'border-orange-500 text-orange-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Evaluation Rubric</span>
        </button>

        <button
          onClick={() => setActiveSubTab('hints')}
          className={`flex items-center gap-2 px-3.5 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
            activeSubTab === 'hints'
              ? 'border-orange-500 text-orange-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Git Hints</span>
        </button>
      </div>

      {/* Tab 1: Overview */}
      {activeSubTab === 'overview' && (
        <div className="space-y-6">
          <Card padding="lg" className="space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Terminal className="w-4 h-4 text-orange-400" />
              <span>Background & Context</span>
            </h3>
            
            <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-line space-y-4">
              {currentChallenge.problemDescription}
            </div>
          </Card>

          {/* Step Workflow Guide */}
          <Card padding="md" className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider font-semibold text-slate-400">
              Recommended Workflow Steps
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="w-5 h-5 rounded bg-orange-950 text-orange-400 font-mono text-xs font-bold flex items-center justify-center mb-2 border border-orange-800/60">
                  1
                </span>
                <h5 className="text-xs font-bold text-white mb-1">Fork & Clone</h5>
                <p className="text-[11px] text-slate-400">Fork sandbox repo to your GitHub account and clone locally.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="w-5 h-5 rounded bg-orange-950 text-orange-400 font-mono text-xs font-bold flex items-center justify-center mb-2 border border-orange-800/60">
                  2
                </span>
                <h5 className="text-xs font-bold text-white mb-1">Branch & Code</h5>
                <p className="text-[11px] text-slate-400">Checkout feature branch and implement requested logic.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="w-5 h-5 rounded bg-orange-950 text-orange-400 font-mono text-xs font-bold flex items-center justify-center mb-2 border border-orange-800/60">
                  3
                </span>
                <h5 className="text-xs font-bold text-white mb-1">Verify Locally</h5>
                <p className="text-[11px] text-slate-400">Run test suites to ensure tests and lint rules pass green.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="w-5 h-5 rounded bg-orange-950 text-orange-400 font-mono text-xs font-bold flex items-center justify-center mb-2 border border-orange-800/60">
                  4
                </span>
                <h5 className="text-xs font-bold text-white mb-1">Submit & Score</h5>
                <p className="text-[11px] text-slate-400">Push to your fork and submit your branch URL for automated grading.</p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Tab 2: Requirements */}
      {activeSubTab === 'requirements' && (
        <Card padding="lg" className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white">Interactive Requirements Checklist</h3>
              <p className="text-xs text-slate-400 mt-0.5">Click each task to track your progress locally</p>
            </div>
            <span className="text-xs text-orange-400 font-mono font-bold px-2 py-0.5 rounded bg-orange-950/60 border border-orange-800/60">
              {completedReqsCount} of {totalReqs} Completed
            </span>
          </div>

          <div className="space-y-2.5 pt-1">
            {currentChallenge.requirements.map((req, idx) => {
              const isChecked = !!checkedRequirements[idx];
              return (
                <div
                  key={idx}
                  onClick={() => toggleRequirement(idx)}
                  className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                    isChecked
                      ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-200'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center border shrink-0 transition-colors ${
                    isChecked
                      ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                      : 'border-slate-700 bg-slate-900 text-transparent'
                  }`}>
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span className={`text-xs sm:text-sm leading-relaxed ${isChecked ? 'line-through text-slate-400' : ''}`}>
                    {req}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Tab 3: Rules */}
      {activeSubTab === 'rules' && (
        <Card padding="lg" className="space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span>Git Club CHARUSAT Arena Rules</span>
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            All submissions are checked automatically and subject to maintainer code review. Violations result in submission rejection.
          </p>

          <div className="space-y-2.5 pt-1">
            {currentChallenge.rules.map((rule, idx) => (
              <div 
                key={idx}
                className="flex items-start gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-300"
              >
                <span className="font-mono text-orange-400 font-bold shrink-0">#{idx + 1}</span>
                <span className="leading-relaxed">{rule}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Tab 4: Evaluation Criteria */}
      {activeSubTab === 'criteria' && (
        <Card padding="lg" className="space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-orange-400" />
            <span>Automated Grader Evaluation Matrix</span>
          </h3>

          <div className="space-y-2.5 pt-1">
            {currentChallenge.testCases.map((tc, idx) => (
              <div 
                key={idx}
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800"
              >
                <span className="text-xs sm:text-sm text-slate-200 font-medium">
                  {tc.name}
                </span>
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-orange-950/60 text-orange-300 border border-orange-800/60">
                  {tc.weight}
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Tab 5: Hints */}
      {activeSubTab === 'hints' && (
        <Card padding="lg" className="space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-cyan-400" />
            <span>Git Commands & Mentorship Hints</span>
          </h3>

          <div className="space-y-2.5 pt-1">
            {currentChallenge.hints.map((hint, idx) => (
              <div 
                key={idx}
                className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-cyan-200/90 leading-relaxed font-mono flex items-start gap-2.5"
              >
                <Terminal className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{hint}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Recorded Submission Summary */}
      {existingSubmission && (
        <Card padding="md" className="mt-8 space-y-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider font-semibold text-slate-300">
                Recorded Submission Summary
              </h4>
              <p className="text-[11px] text-slate-500 font-mono">
                Submitted on {new Date(existingSubmission.submittedAt).toLocaleDateString()} at {new Date(existingSubmission.submittedAt).toLocaleTimeString()}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-semibold ${
                existingSubmission.status === 'Completed'
                  ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/60'
                  : 'bg-purple-950/60 text-purple-300 border border-purple-800/60'
              }`}>
                {existingSubmission.status}
              </span>
              {existingSubmission.status === 'Submitted' && (
                <Button
                  size="xs"
                  variant="primary"
                  onClick={() => approveSubmission(currentChallenge.id)}
                >
                  Simulate Maintainer Approval (+{currentChallenge.points} XP)
                </Button>
              )}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-2 text-slate-300">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-slate-500">REPOSITORY:</span>
              <a href={existingSubmission.repoUrl} target="_blank" rel="noreferrer" className="text-orange-400 hover:underline flex items-center gap-1">
                {existingSubmission.repoUrl} <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {existingSubmission.demoUrl && (
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-slate-500">LIVE DEMO:</span>
                <a href={existingSubmission.demoUrl} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline flex items-center gap-1">
                  {existingSubmission.demoUrl} <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}

            <div className="flex items-center justify-between">
              <span className="text-slate-500">BRANCH:</span>
              <span className="text-slate-200">{existingSubmission.branchName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">COMMIT SHA:</span>
              <span className="text-slate-200">{existingSubmission.commitHash}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">SCORE:</span>
              <span className="text-emerald-400 font-bold">{existingSubmission.score} XP (100%)</span>
            </div>

            {existingSubmission.description && (
              <div className="pt-2 border-t border-slate-800/80 font-sans">
                <span className="text-slate-500 text-[11px] block font-mono mb-1">SOLUTION DESCRIPTION:</span>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/60">
                  "{existingSubmission.description}"
                </p>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Submission Modal */}
      <SubmissionModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        challenge={currentChallenge}
      />

    </div>
  );
};
