import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

const INSTAGRAM_URL = 'https://instagram.com/softapocalypse.in';

export default function PatronProfile() {
  return (
    <main className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Link
          to="/patrons"
          className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/68 px-4 py-2 font-body text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-storm-slate shadow-[0_18px_40px_-32px_rgba(23,34,52,0.8)] backdrop-blur-xl transition-all duration-300 hover:border-warm-sand/40 hover:text-warm-sand"
        >
          <ArrowLeft size={15} />
          Back to patrons
        </Link>

        <AnimatedSection className="mt-6 rounded-[2rem] border border-white/72 bg-white/64 p-8 text-center shadow-[0_28px_90px_-64px_rgba(23,34,52,0.85)] backdrop-blur-xl sm:p-12">
          <p className="font-body text-[0.68rem] uppercase tracking-[0.38em] text-storm-slate/56">
            Literary patron reveal
          </p>
          <h1 className="mt-5 font-heading text-5xl leading-[0.92] text-storm-slate sm:text-6xl">
            We&apos;re saving the names for Instagram.
          </h1>
          <p className="mt-8 font-body text-base leading-8 text-deep-ink/74 sm:text-lg">
            Follow{' '}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-storm-slate underline decoration-warm-sand/80 underline-offset-4 transition-colors duration-300 hover:text-warm-sand"
            >
              @softapocalypse.in
            </a>{' '}
            if you want the patron reveal before the rest of the internet catches up.
          </p>
          <div className="mt-10 flex justify-center">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-storm-slate px-6 py-3.5 font-body text-sm font-semibold uppercase tracking-[0.24em] text-rain-mist transition-all duration-300 hover:-translate-y-0.5 hover:bg-deep-ink"
            >
              Follow @softapocalypse.in
              <ArrowUpRight size={16} />
            </a>
          </div>
        </AnimatedSection>
      </div>
    </main>
  );
}
