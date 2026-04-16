import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function JudgeCard({ judge }) {
  return (
    <motion.article
      className="group relative flex h-full flex-col overflow-hidden rounded-[1.85rem] border border-white/72 bg-white/66 shadow-[0_28px_70px_-52px_rgba(23,34,52,0.95)] backdrop-blur-xl"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(44,74,110,0.14),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(196,168,130,0.14),transparent_32%)]" />

      <Link to={`/judges/${judge.slug}`} className="relative block overflow-hidden">
        <div className="relative aspect-[4/5] overflow-hidden bg-storm-slate/10">
          <img
            src={judge.photo}
            alt={`Portrait of ${judge.name}`}
            className="h-full w-full object-cover grayscale-[12%] saturate-[0.88] transition duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
            loading="lazy"
            onError={(event) => {
              event.target.style.display = 'none';
              event.target.nextElementSibling.style.display = 'flex';
            }}
          />

          <div
            className="absolute inset-0 hidden items-center justify-center bg-storm-slate/18"
            aria-hidden="true"
          >
            <span className="font-heading text-6xl leading-none text-storm-slate/35">
              {judge.name.split(' ').map((name) => name[0]).join('')}
            </span>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-deep-ink/55 via-transparent to-transparent" />
          <div className="absolute left-5 top-5 rounded-full border border-white/25 bg-black/15 px-4 py-1.5 backdrop-blur-md">
            <span className="font-body text-[0.65rem] uppercase tracking-[0.34em] text-white/78">
              Judge
            </span>
          </div>
          <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
        </div>
      </Link>

      <div className="relative flex flex-1 flex-col p-6 sm:p-7">
        <div className="space-y-3">
          <h3 className="font-heading text-[2rem] leading-[0.94] text-storm-slate">
            <Link
              to={`/judges/${judge.slug}`}
              className="transition-colors duration-300 hover:text-warm-sand"
            >
              {judge.name}
            </Link>
          </h3>

          <p className="font-body text-[0.72rem] uppercase tracking-[0.3em] text-warm-sand">
            {judge.position}
          </p>
        </div>

        <div className="mt-6 space-y-3 border-l border-storm-slate/12 pl-4">
          <p className="font-body text-sm leading-7 text-deep-ink/72">
            {judge.department}
          </p>
          <p className="font-body text-sm font-semibold uppercase tracking-[0.22em] text-storm-slate/68">
            {judge.institution}
          </p>
        </div>

        <Link
          to={`/judges/${judge.slug}`}
          className="group/link mt-8 inline-flex items-center gap-3 font-body text-sm font-semibold uppercase tracking-[0.24em] text-storm-slate transition-colors duration-300 hover:text-warm-sand"
        >
          Read statement
          <ArrowRight size={16} className="transition-transform duration-300 group-hover/link:translate-x-1" />
        </Link>
      </div>

      <div className="pointer-events-none absolute inset-0 border border-storm-slate/8 transition-colors duration-300 group-hover:border-warm-sand/35" />
    </motion.article>
  );
}
