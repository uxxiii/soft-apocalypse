import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PatronCard({ patron }) {
  return (
    <motion.article
      className="group relative flex h-full flex-col overflow-hidden rounded-[1.85rem] border border-white/72 bg-white/66 shadow-[0_28px_70px_-52px_rgba(23,34,52,0.95)] backdrop-blur-xl"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(196,168,130,0.18),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.12),transparent)]" />

      <Link to={`/patrons/${patron.slug}`} className="relative block overflow-hidden">
        <div className="relative aspect-[4/5] overflow-hidden bg-storm-slate/10">
          <img
            src={patron.photo}
            alt={`Portrait of ${patron.name}`}
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
              {patron.name.split(' ').map((name) => name[0]).join('')}
            </span>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-deep-ink/55 via-transparent to-transparent" />
          <div className="absolute left-5 top-5 rounded-full border border-white/25 bg-black/15 px-4 py-1.5 backdrop-blur-md">
            <span className="font-body text-[0.65rem] uppercase tracking-[0.34em] text-white/78">
              Patron
            </span>
          </div>
          <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
        </div>
      </Link>

      <div className="relative flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-heading text-[2.1rem] leading-[0.94] text-storm-slate">
              <Link
                to={`/patrons/${patron.slug}`}
                className="transition-colors duration-300 hover:text-warm-sand"
              >
                {patron.name}
              </Link>
            </h3>
            <p className="mt-3 font-body text-[0.72rem] uppercase tracking-[0.3em] text-warm-sand">
              {patron.title}
            </p>
          </div>

          <span className="font-body text-[0.64rem] uppercase tracking-[0.34em] text-storm-slate/34">
            Profile
          </span>
        </div>

        <blockquote className="mt-6 border-l border-warm-sand/45 pl-4 font-heading text-[1.7rem] leading-[1.08] text-deep-ink/92">
          {patron.quote}
        </blockquote>

        <div className="mt-6 flex flex-wrap gap-2">
          {patron.works.map((work) => (
            <span
              key={work}
              className="rounded-full border border-storm-slate/10 bg-rain-mist/85 px-3 py-1.5 font-body text-[0.66rem] uppercase tracking-[0.2em] text-deep-ink/65"
            >
              {work}
            </span>
          ))}
        </div>

        <Link
          to={`/patrons/${patron.slug}`}
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
