import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const variants = {
  storm: {
    shell: 'border-storm-slate/12 bg-white/64',
    accent: 'text-storm-slate',
    meta: 'text-storm-slate/56',
    glow: 'bg-[radial-gradient(circle_at_top_right,rgba(44,74,110,0.16),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(196,168,130,0.16),transparent_34%)]',
  },
  ink: {
    shell: 'border-deep-ink/12 bg-[#eef3f7]/76',
    accent: 'text-deep-ink',
    meta: 'text-deep-ink/56',
    glow: 'bg-[radial-gradient(circle_at_top_right,rgba(23,34,52,0.16),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(196,168,130,0.14),transparent_34%)]',
  },
  sand: {
    shell: 'border-warm-sand/18 bg-[#f7efe4]/80',
    accent: 'text-deep-ink',
    meta: 'text-deep-ink/56',
    glow: 'bg-[radial-gradient(circle_at_top_right,rgba(196,168,130,0.25),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(44,74,110,0.1),transparent_34%)]',
  },
};

export default function NavigationBar({
  to,
  label,
  description,
  variant = 'storm',
  index,
}) {
  const style = variants[variant];

  return (
    <Link to={to} className="block">
      <motion.article
        className={`group relative overflow-hidden rounded-[1.9rem] border ${style.shell} shadow-[0_26px_70px_-52px_rgba(23,34,52,0.95)] backdrop-blur-xl`}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
      >
        <div className={`absolute inset-0 ${style.glow}`} />
        <div className="absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-warm-sand/70 to-transparent" />

        <div className="relative flex flex-col gap-8 p-6 sm:p-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4">
            <p className={`font-body text-[0.68rem] uppercase tracking-[0.38em] ${style.meta}`}>
              {index ? `Section ${String(index).padStart(2, '0')}` : 'Explore'}
            </p>

            <div>
              <h3 className={`font-heading text-4xl leading-[0.95] ${style.accent} sm:text-[3.25rem]`}>
                {label}
              </h3>
              <p className="mt-3 max-w-2xl font-body text-sm leading-7 text-deep-ink/68 sm:text-base">
                {description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 self-start lg:self-end">
            <span className="font-body text-[0.66rem] uppercase tracking-[0.32em] text-storm-slate/44">
              Open section
            </span>
            <span className="flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-full border border-storm-slate/10 bg-white/70 text-storm-slate transition-all duration-300 group-hover:border-warm-sand/40 group-hover:bg-storm-slate group-hover:text-rain-mist">
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
