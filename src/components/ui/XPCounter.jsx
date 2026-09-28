import { useState, useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';

export const XPCounter = ({ 
  value = 0, 
  duration = 800, 
  size = 'md', // 'sm' | 'md' | 'lg'
  showIcon = true,
  className = '' 
}) => {
  const [displayValue, setDisplayValue] = useState(value);
  const [isGaining, setIsGaining] = useState(false);
  const [gainAmount, setGainAmount] = useState(0);
  const prevValueRef = useRef(value);

  useEffect(() => {
    const startValue = prevValueRef.current;
    const endValue = value;
    
    if (startValue !== endValue) {
      const diff = endValue - startValue;
      if (diff > 0) {
        setGainAmount(diff);
        setIsGaining(true);
        const timer = setTimeout(() => setIsGaining(false), 2200);
        return () => clearTimeout(timer);
      }
    }
  }, [value]);

  useEffect(() => {
    const startValue = prevValueRef.current;
    const endValue = value;

    if (startValue === endValue) return;

    let startTime = null;
    let animationFrameId;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Smooth ease-out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startValue + (endValue - startValue) * easeOut);
      
      setDisplayValue(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setDisplayValue(endValue);
        prevValueRef.current = endValue;
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [value, duration]);

  const sizeClasses = {
    sm: 'text-base font-bold',
    md: 'text-xl sm:text-2xl font-extrabold',
    lg: 'text-3xl sm:text-4xl font-black'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <div className={`relative inline-flex items-center gap-1.5 font-mono ${className}`}>
      {showIcon && (
        <Sparkles 
          className={`${iconSizes[size]} text-orange-400 shrink-0 transition-transform ${
            isGaining ? 'scale-125 rotate-12 text-amber-300' : ''
          }`} 
        />
      )}
      <span className={`${sizeClasses[size]} text-white tracking-tight tabular-nums transition-colors ${
        isGaining ? 'text-amber-300' : ''
      }`}>
        {displayValue.toLocaleString()}
      </span>
      <span className="text-xs font-semibold uppercase tracking-wider text-orange-400">XP</span>

      {/* Floating XP Gain Badge with subtle float animation */}
      {isGaining && (
        <span className="absolute -top-3.5 -right-9 px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold font-mono animate-xp-gain shadow-sm">
          +{gainAmount}
        </span>
      )}
    </div>
  );
};
