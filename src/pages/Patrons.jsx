import { ArrowUpRight } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import PageHeader from '../components/PageHeader';

const INSTAGRAM_URL = 'https://instagram.com/softapocalypse.in';

export default function Patrons() {
  return (
    <main className="pb-24">
      <PageHeader
        eyebrow="Literary constellation"
        title="Literary Patrons"
        description="The reveal is coming, just not as a flat list on a website."
        stats={[
          { value: 'Coming Soon', label: 'Full reveal' },
          { value: 'Instagram', label: 'First drop' },
          { value: 'Follow', label: '@softapocalypse.in' },
        ]}
      />

      <section className="px-4 sm:px-6 lg:px-8" aria-label="Patrons announcement">
        <div className="mx-auto max-w-4xl">
          <AnimatedSection className="rounded-[2rem] border border-white/72 bg-white/64 p-8 text-center shadow-[0_28px_90px_-64px_rgba(23,34,52,0.85)] backdrop-blur-xl sm:p-12">
            <p className="font-body text-[0.68rem] uppercase tracking-[0.38em] text-storm-slate/56">
              Coming soon
            </p>
            <h2 className="mt-5 font-heading text-5xl leading-[0.92] text-storm-slate sm:text-6xl">
              We know you&apos;re curious.
            </h2>

            <div className="mx-auto mt-6 space-y-5 font-body text-base leading-8 text-deep-ink/74 sm:text-lg">
              <p>
                Look, we know you&apos;re dying to know which icons are sitting on our panel
                of Literary Patrons, but we&apos;re not just going to drop those legends in a
                boring website update. How could we? We&apos;re saving the big reveal for the
                &apos;gram.
              </p>
              <p>
                If you want to be the first to know which main characters of the literary
                world are backing this project (and avoid the inevitable FOMO when the news
                breaks), you need to be following us{' '}
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-storm-slate underline decoration-warm-sand/80 underline-offset-4 transition-colors duration-300 hover:text-warm-sand"
                >
                  @softapocalypse.in
                </a>
              </p>
              <p>
                We&apos;re talking global bestsellers and award-winning heavyweights—don&apos;t
                be the last to find out!
              </p>
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
