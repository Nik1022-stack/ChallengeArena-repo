import { useState } from 'react';
import { 
  X, 
  Send, 
  Terminal, 
  CheckCircle2, 
  Sparkles, 
  GitBranch, 
  GitCommit, 
  Link2, 
  Globe, 
  Loader2,
  Check,
  AlertCircle,
  ExternalLink,
  Award
} from 'lucide-react';
import { useChallenges } from '../hooks/useChallenges';
import { Input, Textarea } from './ui/Input';
import { Button } from './ui/Button';

const SubmissionModalContent = ({ challenge, onClose }) => {
  const { recordSubmission, approveSubmission } = useChallenges();

  const [repoUrl, setRepoUrl] = useState(`https://github.com/dev-charusat/${challenge.id}-solution`);
  const [demoUrl, setDemoUrl] = useState(`https://${challenge.id}-dev-charusat.vercel.app`);
  const [branchName, setBranchName] = useState(
    challenge.tags[0] === 'git branch' ? 'feature/student-search-filter' : 'solution/final-branch'
  );
  const [commitHash, setCommitHash] = useState('f7c2b4a');
  const [description, setDescription] = useState(
    'Implemented atomic conventional commits, isolated branch topology, and verified all unit test suites.'
  );

  // Field validation errors
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Simulation states: 'idle' | 'validating' | 'success'
  const [evaluationState, setEvaluationState] = useState('idle');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [terminalLogs, setTerminalLogs] = useState([]);
  const [isApproved, setIsApproved] = useState(false);

  const evaluationSteps = [
    { title: 'Verifying repository access & branch reference', time: 700 },
    { title: 'Checking live demo deployment response (HTTP 200 OK)', time: 800 },
    { title: 'Analyzing Git history, commit topology & conventional format', time: 900 },
    { title: 'Executing automated evaluation test harness & lint matrix', time: 1000 }
  ];

  const validate = () => {
    const newErrors = {};

    // Validate Repository URL
    const urlPattern = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;
    if (!repoUrl.trim()) {
      newErrors.repoUrl = 'Repository URL is required.';
    } else if (!urlPattern.test(repoUrl.trim())) {
      newErrors.repoUrl = 'Please enter a valid URL (e.g. https://github.com/user/repo).';
    } else if (!repoUrl.includes('github.com') && !repoUrl.includes('gitlab.com')) {
      newErrors.repoUrl = 'Must be a valid GitHub or Git repository link.';
    }

    // Validate Live Demo URL
    if (!demoUrl.trim()) {
      newErrors.demoUrl = 'Live demo URL is required.';
    } else if (!urlPattern.test(demoUrl.trim())) {
      newErrors.demoUrl = 'Please enter a valid URL (e.g. https://my-demo.vercel.app).';
    }

    // Validate Solution Description
    if (!description.trim()) {
      newErrors.description = 'Solution description is required.';
    } else if (description.trim().length < 15) {
      newErrors.description = `Description too short (minimum 15 characters, currently ${description.trim().length}).`;
    }

    // Validate Branch Name
    if (!branchName.trim()) {
      newErrors.branchName = 'Branch name is required.';
    }

    return newErrors;
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const currentErrors = validate();
    setErrors(currentErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({
      repoUrl: true,
      demoUrl: true,
      description: true,
      branchName: true
    });

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setEvaluationState('validating');
    setCurrentStepIndex(0);
    setTerminalLogs([
      `$ git clone ${repoUrl} --branch ${branchName} --single-branch`,
      `[info] Remote tracking branch '${branchName}' detected at commit ${commitHash || 'HEAD'}`
    ]);

    // Step 1
    setTimeout(() => {
      setCurrentStepIndex(1);
      setTerminalLogs(prev => [
        ...prev,
        `$ curl -I ${demoUrl}`,
        `[info] Live demo server responded HTTP/2 200 OK (${demoUrl})`
      ]);

      // Step 2
      setTimeout(() => {
        setCurrentStepIndex(2);
        setTerminalLogs(prev => [
          ...prev,
          `[info] Validating Conventional Commits specification...`,
          `[success] Found atomic commits. Formats verified: feat, test, docs.`
        ]);

        // Step 3
        setTimeout(() => {
          setCurrentStepIndex(3);
          setTerminalLogs(prev => [
            ...prev,
            `$ npm test -- --runInBand --coverage`,
            `[pass] PASS test/challenge.spec.js (100% tests green)`,
            `[pass] Code coverage threshold satisfied (> 85%)`,
            `✔ All automated verification steps passed with 100/100 score!`
          ]);

          // Final Success -> status becomes 'Submitted'
          setTimeout(() => {
            setEvaluationState('success');
            recordSubmission(challenge.id, {
              repoUrl,
              demoUrl,
              description,
              branchName,
              commitHash: commitHash || 'f7c2b4a'
            });
          }, 600);

        }, evaluationSteps[2].time);

      }, evaluationSteps[1].time);

    }, evaluationSteps[0].time);
  };

  const handleApproveFinal = () => {
    approveSubmission(challenge.id);
    setIsApproved(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-modal-in">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-950/80 border border-orange-800/60 text-orange-400">
              <Send className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>Submit Solution</span>
                <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-orange-950/60 text-orange-300 border border-orange-800/60">
                  +{challenge.points} XP
                </span>
              </h3>
              <p className="text-xs text-slate-400 line-clamp-1">{challenge.title}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={evaluationState === 'validating'}
            className="w-9 h-9 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors disabled:opacity-50 flex items-center justify-center shrink-0"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {evaluationState === 'idle' && (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <span>
                  Submit your public repository, live demo URL, and approach description. Our local test harness will evaluate your solution.
                </span>
              </div>

              {/* GitHub Repository URL */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider font-semibold text-slate-300 mb-1.5">
                  GitHub Repository URL <span className="text-rose-400">*</span>
                </label>
                <Input
                  type="url"
                  icon={Link2}
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  onBlur={() => handleBlur('repoUrl')}
                  placeholder="https://github.com/your-username/challenge-repo"
                  className={touched.repoUrl && errors.repoUrl ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/30' : ''}
                />
                {touched.repoUrl && errors.repoUrl && (
                  <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.repoUrl}</span>
                  </p>
                )}
              </div>

              {/* Live Demo URL */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider font-semibold text-slate-300 mb-1.5">
                  Live Demo URL <span className="text-rose-400">*</span>
                </label>
                <Input
                  type="url"
                  icon={Globe}
                  value={demoUrl}
                  onChange={(e) => setDemoUrl(e.target.value)}
                  onBlur={() => handleBlur('demoUrl')}
                  placeholder="https://challenge-demo.vercel.app"
                  className={touched.demoUrl && errors.demoUrl ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/30' : ''}
                />
                {touched.demoUrl && errors.demoUrl && (
                  <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.demoUrl}</span>
                  </p>
                )}
              </div>

              {/* Branch Name & Commit Hash Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider font-semibold text-slate-300 mb-1.5">
                    Branch Name <span className="text-rose-400">*</span>
                  </label>
                  <Input
                    type="text"
                    icon={GitBranch}
                    value={branchName}
                    onChange={(e) => setBranchName(e.target.value)}
                    onBlur={() => handleBlur('branchName')}
                    placeholder="e.g. feature/student-search"
                    className={touched.branchName && errors.branchName ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/30' : ''}
                  />
                  {touched.branchName && errors.branchName && (
                    <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.branchName}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider font-semibold text-slate-300 mb-1.5">
                    Commit Hash (Optional)
                  </label>
                  <Input
                    type="text"
                    icon={GitCommit}
                    value={commitHash}
                    onChange={(e) => setCommitHash(e.target.value)}
                    placeholder="e.g. f7c2b4a"
                  />
                </div>
              </div>

              {/* Solution Description */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-mono uppercase tracking-wider font-semibold text-slate-300">
                    Solution Description & Approach <span className="text-rose-400">*</span>
                  </label>
                  <span className="text-[11px] font-mono text-slate-500">
                    {description.trim().length} chars (min 15)
                  </span>
                </div>
                <Textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  onBlur={() => handleBlur('description')}
                  placeholder="Describe your solution architecture, git commands used, and how requirements were met..."
                  className={touched.description && errors.description ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/30' : ''}
                />
                {touched.description && errors.description && (
                  <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.description}</span>
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-slate-800">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  variant="primary"
                  icon={Send}
                >
                  Submit Solution
                </Button>
              </div>
            </form>
          )}

          {/* Validating Simulated Evaluation Flow */}
          {evaluationState === 'validating' && (
            <div className="space-y-5 py-2">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-orange-950/80 border border-orange-800/60 text-orange-400 mb-2.5">
                  <Loader2 className="w-5 h-5 animate-spin" />
                </div>
                <h4 className="text-sm font-bold text-white">Running Automated Evaluation</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Simulating local verification test runner & deployment check...
                </p>
              </div>

              {/* Progress Steps */}
              <div className="space-y-2.5">
                {evaluationSteps.map((step, idx) => {
                  const isDone = idx < currentStepIndex;
                  const isCurrent = idx === currentStepIndex;
                  return (
                    <div 
                      key={idx}
                      className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs transition-all ${
                        isDone
                          ? 'bg-emerald-950/30 border-emerald-800/40 text-emerald-300'
                          : isCurrent
                          ? 'bg-orange-950/30 border-orange-800/40 text-orange-300 font-semibold'
                          : 'bg-slate-950 border-slate-800 text-slate-500'
                      }`}
                    >
                      <div className="shrink-0">
                        {isDone ? (
                          <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                            <Check className="w-2.5 h-2.5" />
                          </div>
                        ) : isCurrent ? (
                          <div className="w-4 h-4 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center">
                            <Loader2 className="w-2.5 h-2.5 animate-spin" />
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full bg-slate-800 text-slate-500 flex items-center justify-center font-mono text-[9px]">
                            {idx + 1}
                          </div>
                        )}
                      </div>
                      <span>{step.title}</span>
                    </div>
                  );
                })}
              </div>

              {/* Terminal Logs */}
              <div className="rounded-xl bg-slate-950 border border-slate-800 p-3.5 font-mono text-xs text-slate-300 space-y-1 max-h-44 overflow-y-auto">
                <div className="flex items-center gap-1.5 text-slate-500 pb-1 border-b border-slate-800/80 text-[10px]">
                  <Terminal className="w-3 h-3 text-orange-400" />
                  <span>automated-grader.charusat.local</span>
                </div>
                {terminalLogs.map((log, idx) => (
                  <p key={idx} className={log.startsWith('$') ? 'text-amber-400' : log.includes('[pass]') || log.includes('[success]') || log.startsWith('✔') ? 'text-emerald-400' : 'text-slate-400'}>
                    {log}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Success State & Submission Summary */}
          {evaluationState === 'success' && (
            <div className="space-y-4 py-2 animate-fade-in">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto rounded-xl bg-purple-950/60 border border-purple-800/60 flex items-center justify-center text-purple-400 mb-2 animate-badge-pop shadow-md shadow-purple-500/10">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white">Solution Submitted!</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Status transitioned to <span className="text-purple-300 font-semibold font-mono">Submitted</span>. Summary recorded below.
                </p>
              </div>

              {/* Submission Summary Card */}
              <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 space-y-2.5 text-xs font-mono">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-slate-500">STATUS</span>
                  <span className="px-2 py-0.5 rounded bg-purple-950/80 text-purple-300 border border-purple-800/60 font-semibold">
                    {isApproved ? 'Completed' : 'Submitted'}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-1">
                  <span className="text-slate-500">REPOSITORY:</span>
                  <a href={repoUrl} target="_blank" rel="noreferrer" className="text-orange-400 hover:underline flex items-center gap-1 line-clamp-1">
                    {repoUrl.replace('https://github.com/', '')}
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-1">
                  <span className="text-slate-500">LIVE DEMO:</span>
                  <a href={demoUrl} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline flex items-center gap-1 line-clamp-1">
                    {demoUrl.replace('https://', '')}
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500">BRANCH:</span>
                  <span className="text-slate-200">{branchName}</span>
                </div>

                <div className="pt-2 border-t border-slate-800/60 font-sans">
                  <span className="text-slate-500 text-[11px] block font-mono mb-1">APPROACH SUMMARY:</span>
                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                    "{description}"
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-2.5 border-t border-slate-800">
                {!isApproved ? (
                  <Button
                    size="xs"
                    variant="outline"
                    icon={Award}
                    onClick={handleApproveFinal}
                    className="w-full sm:w-auto text-amber-300 border-amber-800/50"
                  >
                    Simulate Final Approval (+{challenge.points} XP)
                  </Button>
                ) : (
                  <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>+{challenge.points} XP Awarded</span>
                  </span>
                )}

                <Button
                  size="sm"
                  variant="primary"
                  onClick={onClose}
                  className="w-full sm:w-auto"
                >
                  Close & View in Arena
                </Button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export const SubmissionModal = ({ isOpen, onClose, challenge }) => {
  if (!isOpen || !challenge) return null;
  return <SubmissionModalContent key={challenge.id} challenge={challenge} onClose={onClose} />;
};
