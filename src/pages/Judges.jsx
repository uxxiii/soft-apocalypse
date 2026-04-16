import { ArrowUpRight } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import PageHeader from '../components/PageHeader';

const INSTAGRAM_URL = 'https://instagram.com/softapocalypse.in';

export default function Judges() {
  return (
    <main className="pb-24">
      <PageHeader
        eyebrow="Editorial board"
        title="Editorial Judges"
        description="The panel is assembled. The names are landing soon."
        stats={[
          { value: 'Coming Soon', label: 'Full roster' },
          { value: 'Instagram', label: 'First drop' },
          { value: 'Follow', label: '@softapocalypse.in' },
        ]}
      />

      <section className="px-4 sm:px-6 lg:px-8" aria-label="Judges announcement">
        <div className="mx-auto max-w-4xl">
          <AnimatedSection className="rounded-[2rem] border border-white/72 bg-white/64 p-8 text-center shadow-[0_28px_90px_-64px_rgba(23,34,52,0.85)] backdrop-blur-xl sm:p-12">
            <p className="font-body text-[0.68rem] uppercase tracking-[0.38em] text-storm-slate/56">
              Coming soon
            </p>
            <h2 className="mt-5 font-heading text-5xl leading-[0.92] text-storm-slate sm:text-6xl">
              Curious about who&apos;s reading your work?
            </h2>

            <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-warm-sand/80 to-transparent" />

            <div className="mt-8 space-y-5 font-body text-base leading-8 text-deep-ink/74 sm:text-lg">
              <p>
                Curious about who&apos;s actually grading your work? We&apos;ve assembled a
                judging panel of absolute intellectuals—think elite professors from the
                country&apos;s top-tier institutions.
              </p>
              <p>
                These are the people who literally define "literary merit" for a living, and
                we&apos;re hard-launching the roster on Instagram very soon. If you want to
                know exactly whose high standards you&apos;re aiming to impress, hit that
                follow button and turn on notifications at{' '}
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-storm-slate underline decoration-warm-sand/80 underline-offset-4 transition-colors duration-300 hover:text-warm-sand"
                >
                  @softapocalypse.in
                </a>
                .
              </p>
              <p>The gatekeeping ends there.</p>
            </div>

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
      </section>
    </main>
  );
}
