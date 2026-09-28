import { 
  Clock, 
  ArrowRight, 
  Play, 
  Lock, 
  Users,
  CheckCircle2
} from 'lucide-react';
import { useChallenges } from '../hooks/useChallenges';
import { Card } from './ui/Card';
import { 
  DifficultyBadge, 
  TimelineBadge, 
  UserStatusBadge, 
  PointsBadge, 
  TagBadge 
} from './ui/Badge';
import { Button } from './ui/Button';

export const ChallengeCard = ({ challenge }) => {
  const { 
    userStatuses, 
    navigateToChallenge, 
    startChallenge 
  } = useChallenges();

  const userStatus = userStatuses[challenge.id] || 'Not Started';

  const handleCardClick = () => {
    navigateToChallenge(challenge.id);
  };

  const handleActionClick = (e) => {
    e.stopPropagation();
    if (challenge.timelineStatus === 'upcoming') {
      navigateToChallenge(challenge.id);
      return;
    }
    
    if (userStatus === 'Not Started') {
      startChallenge(challenge.id);
    }
    navigateToChallenge(challenge.id);
  };

  return (
    <Card 
      hoverLift
      onClick={handleCardClick}
      className="relative flex flex-col justify-between group overflow-hidden border-slate-800 hover:border-slate-700/90 transition-all duration-200"
    >
      {/* Top subtle status line with smooth transition */}
      {userStatus === 'In Progress' && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-blue-500 transition-all duration-300" />
      )}
      {userStatus === 'Submitted' && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-purple-500 transition-all duration-300" />
      )}
      {userStatus === 'Completed' && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-emerald-500 transition-all duration-300" />
      )}

      {/* Card Header & Body */}
      <div>
        {/* Meta badges row */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-mono uppercase font-semibold text-slate-400">
              {challenge.category}
            </span>
            <span className="text-slate-700">•</span>
            <TimelineBadge status={challenge.timelineStatus} />
          </div>

          <UserStatusBadge status={userStatus} />
        </div>

        {/* Challenge Title */}
        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-orange-400 transition-colors line-clamp-2 mb-2 leading-snug">
          {challenge.title}
        </h3>

        {/* Short Description */}
        <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed mb-4">
          {challenge.shortDescription}
        </p>

        {/* Technical Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {challenge.tags.slice(0, 3).map((tag, idx) => (
            <TagBadge key={idx} label={tag} />
          ))}
          {challenge.tags.length > 3 && (
            <span className="text-[11px] font-mono text-slate-500 px-1 py-0.5">
              +{challenge.tags.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Card Footer: Points, Difficulty, Deadline, CTA */}
      <div className="pt-4 border-t border-slate-800/80">
        <div className="flex items-center justify-between text-xs mb-3.5">
          <PointsBadge points={challenge.points} />

          <DifficultyBadge difficulty={challenge.difficulty} />

          <div className="flex items-center gap-1 text-slate-400 font-mono text-[11px]">
            <Clock className="w-3 h-3 text-slate-500" />
            <span>{challenge.deadlineFormatted}</span>
          </div>
        </div>

        {/* Action Button Row */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
            <Users className="w-3.5 h-3.5 text-slate-500" />
            <span>{challenge.solvedCount} solved</span>
          </div>

          {userStatus === 'Completed' ? (
            <Button
              size="xs"
              variant="outline"
              iconRight={CheckCircle2}
              onClick={handleActionClick}
            >
              Review
            </Button>
          ) : userStatus === 'Submitted' ? (
            <Button
              size="xs"
              variant="outline"
              iconRight={Clock}
              onClick={handleActionClick}
            >
              Submitted
            </Button>
          ) : userStatus === 'In Progress' ? (
            <Button
              size="xs"
              variant="primary"
              iconRight={Play}
              onClick={handleActionClick}
            >
              Continue
            </Button>
          ) : challenge.timelineStatus === 'upcoming' ? (
            <Button
              size="xs"
              variant="outline"
              iconRight={Lock}
              onClick={handleActionClick}
            >
              Preview
            </Button>
          ) : (
            <Button
              size="xs"
              variant="secondary"
              iconRight={ArrowRight}
              onClick={handleActionClick}
            >
              Start
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};
