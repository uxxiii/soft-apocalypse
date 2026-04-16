import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import useSubmissionWindow from '../hooks/useSubmissionWindow';
import {
  SUBMISSION_CLOSE_DATE,
  SUBMISSION_OPEN_DATE,
  formatIstDate,
  getCountdownParts,
} from '../lib/submissionWindow';

const heroStats = [
  { value: '200', label: 'Selected voices' },
  { value: '3', label: 'Open genres' },
  { value: '25 and Below', label: 'Eligibility' },
];

export default function Hero() {
  const { now, status } = useSubmissionWindow();
  const countdown = getCountdownParts(SUBMISSION_OPEN_DATE, now);
  const countdownLabel = `${String(countdown.days).padStart(2, '0')}d ${String(countdown.hours).padStart(2, '0')}h ${String(countdown.minutes).padStart(2, '0')}m ${String(countdown.seconds).padStart(2, '0')}s`;
  const submissionWindowValue =
    status === 'pre'
      ? countdownLabel
      : status === 'open'
        ? 'Submissions Open'
        : 'Submissions Closed';
  const submissionWindowNote =
    status === 'pre'
      ? `Opens ${formatIstDate(SUBMISSION_OPEN_DATE)}`
      : status === 'open'
        ? `Open until ${formatIstDate(SUBMISSION_CLOSE_DATE)}`
        : `Closed ${formatIstDate(SUBMISSION_CLOSE_DATE)}`;

  return (
    <section className="overflow-hidden" aria-label="Hero">
      {/* Main Hero Section with Background */}
      <div 
        className="relative px-4 pb-14 pt-2 sm:px-6 sm:pb-16 lg:px-8 min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: 'url(/images/bg.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
        aria-label="Hero"
      >
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/10" />
        
        <div className="mx-auto max-w-7xl relative z-10 w-full">
          <div className="rounded-[2.5rem] border border-warm-sand/20 bg-deep-ink/50 backdrop-blur-md px-6 py-12 sm:px-10 sm:py-16 lg:px-14 lg:py-20 shadow-[0_38px_120px_-70px_rgba(196,168,130,0.4)]">
            <div className="relative grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(320px,0.7fr)] lg:items-end">
              <div>
                <motion.p
                  className="inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/15 px-4 py-2 font-body text-[0.68rem] uppercase tracking-[0.38em] text-white shadow-[0_16px_30px_-24px_rgba(255,255,255,0.3)]"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  National literary anthology
                </motion.p>

                <motion.div
                  className="mt-8 grid gap-4 lg:grid-cols-[auto_auto]"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div>
                    <h1 className="font-heading text-[clamp(4rem,11vw,9rem)] leading-[0.82] !text-white">
                      <span className="block !text-white">Soft</span>
                      <span className="block !text-white">Apocalypse</span>
                    </h1>
                  </div>

                  <div className="pt-2 lg:pt-6">
                    <span className="font-body text-[0.7rem] uppercase tracking-[0.42em] text-white/72">
                      Edition 2026
                    </span>
                  </div>
                </motion.div>

                <motion.p
                  className="mt-8 max-w-2xl font-body text-lg leading-8 text-white/84 sm:text-xl"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
                >
                  A curated volume for young Indian writers working across poetry,
                  prose, and flash fiction, crafted to feel like the opening page of
                  a generation.
                </motion.p>

                <motion.div
                  className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    to="/submission"
                    className="group inline-flex items-center justify-center gap-3 rounded-full bg-warm-sand px-6 py-3.5 font-body text-sm font-semibold uppercase tracking-[0.24em] text-deep-ink shadow-[0_22px_50px_-30px_rgba(196,168,130,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-400"
                  >
                    Submit Your Work
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>

                  <Link
                    to="/judges"
                    className="group inline-flex items-center gap-3 font-body text-sm font-semibold uppercase tracking-[0.24em] text-white transition-colors duration-300 hover:text-white/70"
                  >
                    Judge reveal
                  <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </motion.div>

              <motion.div
                className="mt-12 grid gap-4 sm:grid-cols-3"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                {heroStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-[1.5rem] border border-warm-sand/20 bg-deep-ink/70 backdrop-blur-sm px-5 py-4 shadow-[0_18px_32px_-28px_rgba(196,168,130,0.4)]"
                  >
                    <p className="font-heading text-4xl leading-none text-white">
                      {stat.value}
                    </p>
                    <p className="mt-2 font-body text-[0.68rem] uppercase tracking-[0.3em] text-white/60">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.aside
              className="relative"
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-deep-ink/50 backdrop-blur-md p-7 text-white shadow-[0_36px_80px_-46px_rgba(255,255,255,0.1)] sm:p-8">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(196,168,130,0.15),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.05),transparent_28%)]" />

                <div className="relative">
                  <img
                    src="/images/moth-logo.png"
                    alt="Soft Apocalypse moth emblem"
                    className="h-14 w-auto brightness-0 invert opacity-80"
                  />

                  <p className="mt-8 font-body text-[0.68rem] uppercase tracking-[0.38em] text-white/82">
                    Editor&apos;s note
                  </p>

                  <h2 className="mt-5 font-heading text-4xl leading-[0.95] text-white">
                    The opening page of a generational document.
                  </h2>

                  <p className="mt-5 font-body text-sm leading-7 text-white/75 sm:text-base">
                    Soft Apocalypse gathers emerging voices without flattening their
                    differences. The goal is not competition, but curation: a single
                    volume that feels urgent, intimate, and archival.
                  </p>

                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[1.25rem] border border-white/15 bg-white/8 p-4">
                      <p className="font-body text-[0.65rem] uppercase tracking-[0.32em] text-white/70">
                        Submission window
                      </p>
                      <p
                        className={`mt-2 font-heading leading-none text-white ${
                          status === 'pre' ? 'text-xl sm:text-2xl' : 'text-2xl'
                        }`}
                      >
                        {submissionWindowValue}
                      </p>
                      <p className="mt-2 font-body text-xs uppercase tracking-[0.22em] text-white/50">
                        {submissionWindowNote}
                      </p>
                    </div>

                    <div className="rounded-[1.25rem] border border-white/15 bg-white/8 p-4">
                      <p className="font-body text-[0.65rem] uppercase tracking-[0.32em] text-white/70">
                        Launch format
                      </p>
                      <p className="mt-2 font-heading text-2xl leading-none text-white">
                        Print 
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.aside>
          </div>

          <motion.div
            className="relative mt-14 flex items-center gap-4 font-body text-[0.65rem] uppercase tracking-[0.4em] text-white/48"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.45 }}
          >
            <span>Scroll to continue</span>
            <span className="flex h-10 w-6 items-start justify-center rounded-full border border-white/15 p-1">
              <motion.span
                className="h-2 w-2 rounded-full bg-white"
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              />
            </span>
          </motion.div>
        </div>
      </div>
    </div>
    </section>
  );
}
