import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, Clock3 } from 'lucide-react';
import useCountdown from '../hooks/useCountdown';
import {
  SUBMISSION_OPEN_DATE,
  formatIstDateTime,
  getSubmissionStatus,
} from '../lib/submissionWindow';

const timerUnits = [
  { key: 'days', label: 'Days' },
  { key: 'hours', label: 'Hours' },
  { key: 'minutes', label: 'Minutes' },
  { key: 'seconds', label: 'Seconds' },
];

export default function CountdownTimer({
  targetDate = SUBMISSION_OPEN_DATE,
  className = '',
  onComplete,
}: {
  targetDate?: Date;
  className?: string;
  onComplete?: () => void;
}) {
  const hasTriggeredCompletion = useRef(false);
  const countdown = useCountdown(targetDate);
  const submissionStatus = getSubmissionStatus(countdown.now);

  useEffect(() => {
    if (countdown.isComplete && onComplete && !hasTriggeredCompletion.current) {
      hasTriggeredCompletion.current = true;
      onComplete();
    }
  }, [countdown.isComplete, onComplete]);

  if (submissionStatus !== 'pre') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className={`relative overflow-hidden rounded-[2rem] border border-white/75 bg-white/72 p-6 shadow-[0_34px_110px_-72px_rgba(23,34,52,0.88)] backdrop-blur-xl sm:p-8 ${className}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(196,168,130,0.16),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(44,74,110,0.08),transparent_28%)]" />

        <div className="relative">
          <p className="font-body text-[0.68rem] uppercase tracking-[0.38em] text-storm-slate/58">
            Countdown timer
          </p>
          <h2 className="mt-4 font-heading text-4xl leading-[0.92] text-storm-slate sm:text-5xl">
            {submissionStatus === 'open' ? 'Submissions Open' : 'Submissions Closed'}
          </h2>
          <p className="mt-4 flex items-center gap-2 font-body text-sm leading-7 text-deep-ink/72 sm:text-base">
            <CalendarDays size={18} className="text-warm-sand" />
            Window opened on {formatIstDateTime(targetDate)}.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={`relative overflow-hidden rounded-[2rem] border border-white/75 bg-white/72 p-6 shadow-[0_34px_110px_-72px_rgba(23,34,52,0.88)] backdrop-blur-xl sm:p-8 ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(196,168,130,0.16),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(44,74,110,0.08),transparent_28%)]" />

      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="font-body text-[0.68rem] uppercase tracking-[0.38em] text-storm-slate/58">
            Countdown timer
          </p>
          <h2 className="mt-4 font-heading text-4xl leading-[0.92] text-storm-slate sm:text-5xl">
            Submissions open in
          </h2>
          <p className="mt-4 flex items-center gap-2 font-body text-sm leading-7 text-deep-ink/72 sm:text-base">
            <CalendarDays size={18} className="text-warm-sand" />
            Window opens on {formatIstDateTime(targetDate)}.
          </p>
          <p className="mt-2 flex items-center gap-2 font-body text-sm leading-7 text-deep-ink/64 sm:text-base">
            <Clock3 size={18} className="text-warm-sand" />
            The timer updates every second and automatically unlocks the form at zero.
          </p>
        </div>

        <div aria-live="polite" className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {timerUnits.map((unit) => {
            const value = countdown[unit.key as keyof typeof countdown];
            const displayValue = String(value).padStart(2, '0');

            return (
              <motion.div
                key={unit.key}
                layout
                className="min-w-[7rem] rounded-[1.6rem] border border-storm-slate/10 bg-rain-mist/82 p-4 text-center shadow-[0_14px_36px_-28px_rgba(23,34,52,0.76)] sm:p-5"
              >
                <p className="font-heading text-4xl leading-none text-deep-ink sm:text-[2.8rem]">
                  {displayValue}
                </p>
                <p className="mt-2 font-body text-[0.68rem] uppercase tracking-[0.32em] text-storm-slate/55">
                  {unit.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
