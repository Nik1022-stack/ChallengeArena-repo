import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useChallenges } from '../hooks/useChallenges';

export const Toast = () => {
  const { toastMessage, setToastMessage } = useChallenges();

  if (!toastMessage) return null;

  const isSuccess = toastMessage.type === 'success';
  const isInfo = toastMessage.type === 'info';

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-toast-enter transition-all duration-200">
      <div className={`flex items-start gap-3 p-4 rounded-xl shadow-2xl border backdrop-blur-xl ${
        isSuccess
          ? 'bg-slate-900/95 border-emerald-500/40 text-slate-100 shadow-emerald-500/10'
          : isInfo
          ? 'bg-slate-900/95 border-cyan-500/40 text-slate-100 shadow-cyan-500/10'
          : 'bg-slate-900/95 border-rose-500/40 text-slate-100 shadow-rose-500/10'
      }`}>
        <div className="mt-0.5 shrink-0">
          {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
          {isInfo && <Info className="w-5 h-5 text-cyan-400" />}
          {!isSuccess && !isInfo && <AlertCircle className="w-5 h-5 text-rose-400" />}
        </div>
        <div className="flex-1 pr-2">
          <h4 className="text-sm font-semibold tracking-wide text-white">
            {toastMessage.title}
          </h4>
          <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
            {toastMessage.message}
          </p>
        </div>
        <button
          onClick={() => setToastMessage(null)}
          className="text-slate-400 hover:text-slate-200 transition-colors p-1"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
