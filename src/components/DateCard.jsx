import { motion } from 'framer-motion';

export default function DateCard({ milestone, date, description, index }) {
  return (
    <motion.article
      className="group relative overflow-hidden rounded-[1.75rem] border border-white/72 bg-white/66 p-6 shadow-[0_24px_60px_-48px_rgba(23,34,52,0.9)] backdrop-blur-xl sm:p-7"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(196,168,130,0.18),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.12),transparent)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-warm-sand/85 to-transparent" />

      <div className="relative flex h-full flex-col">
        <p className="font-body text-[0.68rem] uppercase tracking-[0.38em] text-storm-slate/52">
          {index ? `Phase ${String(index).padStart(2, '0')}` : 'Timeline'}
        </p>

        <h3 className="mt-6 font-heading text-4xl leading-[0.92] text-deep-ink">
          {date}
        </h3>

        <p className="mt-3 font-body text-[0.72rem] uppercase tracking-[0.3em] text-warm-sand">
          {milestone}
        </p>

        <p className="mt-6 font-body text-sm leading-7 text-deep-ink/72 sm:text-base">
          {description}
        </p>
      </div>
    </motion.article>
  );
}
