import Hero from '../components/Hero';
import NavigationBar from '../components/NavigationBar';
import DateCard from '../components/DateCard';
import SectionDivider from '../components/SectionDivider';
import AnimatedSection from '../components/AnimatedSection';
import { SUBMISSION_CLOSE_DATE, formatIstDate } from '../lib/submissionWindow';

const anthologyNotes = [
  { value: 'Pan-India', label: 'Reach across cities and campuses' },
  { value: 'Curated', label: 'Selected by literary patrons and judges' },
  { value: 'Archival', label: 'Built for both print and digital release' },
];

export default function Home() {
  const submissionDeadlineLabel = formatIstDate(SUBMISSION_CLOSE_DATE, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <main className="overflow-hidden">
      <Hero />

      <section className="px-4 pb-16 sm:px-6 lg:px-8" aria-label="Introduction">
        <div className="mx-auto max-w-6xl">
          <AnimatedSection className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div className="space-y-6">
              <p className="font-body text-[0.68rem] uppercase tracking-[0.38em] text-storm-slate/58">
                Why this anthology exists
              </p>

              <h2 className="font-heading text-5xl leading-[0.92] text-storm-slate sm:text-6xl">
                A literary project shaped like a magazine spread, not a contest page.
              </h2>

              <SectionDivider align="start" />
            </div>

            <div className="rounded-[2rem] border border-white/70 bg-white/62 p-7 shadow-[0_26px_90px_-60px_rgba(23,34,52,0.8)] backdrop-blur-xl sm:p-10">
              <div className="space-y-6 font-body text-base leading-8 text-deep-ink/74 sm:text-lg">
                <p>
                  Soft Apocalypse 2026 is a national selectively curated literary anthology bringing together two hundred of the most compelling young writers in India into a single, professionally produced volume. Poetry, prose, and flash fiction sit together in one carefully edited collection.
                </p>
                <p>
                  This is not a competition, It is a collaboration. It is a curatorial project designed to surface voices already reshaping contemporary Indian writing and give them a stage that feels serious, tactile, and lasting.
                </p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection
            delay={0.08}
            className="mt-6 grid gap-4 sm:grid-cols-3"
          >
            {anthologyNotes.map((note) => (
              <div
                key={note.label}
                className="rounded-[1.5rem] border border-white/72 bg-white/60 p-5 shadow-[0_20px_36px_-30px_rgba(23,34,52,0.8)] backdrop-blur-xl"
              >
                <p className="font-heading text-3xl leading-none text-deep-ink">
                  {note.value}
                </p>
                <p className="mt-2 font-body text-[0.68rem] uppercase tracking-[0.3em] text-storm-slate/54">
                  {note.label}
                </p>
              </div>
            ))}
          </AnimatedSection>
        </div>
      </section>

      <section className="px-4 py-6 sm:px-6 lg:px-8" aria-label="Explore">
        <div className="mx-auto max-w-6xl">
          <AnimatedSection className="mb-8 max-w-3xl">
            <p className="font-body text-[0.68rem] uppercase tracking-[0.38em] text-storm-slate/58">
              Explore the project
            </p>
            <h2 className="mt-4 font-heading text-5xl leading-[0.92] text-storm-slate sm:text-6xl">
              Move through the anthology the way you would move through a printed issue.
            </h2>
          </AnimatedSection>

          <div className="space-y-4">
            <AnimatedSection delay={0.05}>
              <NavigationBar
                to="/patrons"
                label="Our Literary Patrons"
                description="The patron reveal is landing on Instagram first. Follow @softapocalypse.in if you want the names before the website catches up."
                variant="storm"
                index={1}
              />
            </AnimatedSection>

            <AnimatedSection delay={0.12}>
              <NavigationBar
                to="/judges"
                label="Our Editorial Judges"
                description="The full judges roster drops soon on Instagram. Follow @softapocalypse.in to see whose standards you're writing for."
                variant="ink"
                index={2}
              />
            </AnimatedSection>

            <AnimatedSection delay={0.18}>
              <NavigationBar
                to="/submission"
                label="Submit Your Work"
                description="Submission details, entry stipulations, and the embedded form for poetry, prose, and flash fiction."
                variant="sand"
                index={3}
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8" aria-label="Sponsors">
        <div className="mx-auto max-w-6xl">
          <AnimatedSection className="mb-10">
            <p className="font-body text-[0.68rem] uppercase tracking-[0.38em] text-storm-slate/58">
              Backed by industry leaders
            </p>
            <h2 className="mt-4 font-heading text-5xl leading-[0.92] text-storm-slate sm:text-6xl">
              Major partnerships powering the movement.
            </h2>
            <SectionDivider align="start" className="mt-6" />
          </AnimatedSection>

          <AnimatedSection className="mb-12">
            <div className="overflow-hidden rounded-[2rem] border border-white/72 bg-white/64 p-8 shadow-[0_28px_90px_-64px_rgba(23,34,52,0.85)] backdrop-blur-xl sm:p-12">
              <div className="space-y-6">
                <p className="font-body text-base leading-8 text-deep-ink/74 sm:text-lg">
                  We've partnered with a major industry powerhouse to bring Soft Apocalypse
                  2026 the professional infrastructure and reach it deserves. The official
                  collaboration reveal is coming soon—follow @softapocalypse.in to be the
                  first to know.
                </p>
              </div>
            </div>
          </AnimatedSection>

          <div className="overflow-hidden rounded-[2rem] border border-white/72 bg-gradient-to-r from-white/64 via-white/58 to-white/64 backdrop-blur-xl">
            <style>{`
              @keyframes scroll-left-to-right {
                0% {
                  transform: translateX(-100%);
                }
                100% {
                  transform: translateX(100%);
                }
              }
              .sponsor-scroll {
                display: flex;
                gap: 2rem;
                animation: scroll-left-to-right 20s linear infinite;
                width: max-content;
              }
              .sponsor-scroll:hover {
                animation-play-state: paused;
              }
            `}</style>
            <div className="flex gap-8 overflow-x-hidden py-12 px-4 sm:px-6 lg:px-8">
              <div className="sponsor-scroll">
                {[...Array(6)].map((_, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 flex items-center justify-center h-24 w-48 rounded-[1.5rem] border border-white/70 bg-white/70 shadow-[0_12px_40px_-30px_rgba(23,34,52,0.3)]"
                  >
                    <div className="text-center">
                      <p className="font-body text-[0.68rem] uppercase tracking-[0.28em] text-storm-slate/58">
                        Coming Soon
                      </p>
                      <p className="mt-1 font-heading text-sm text-storm-slate/76">
                        Partner {index + 1}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-24 pt-16 sm:px-6 lg:px-8" aria-label="Important dates">
        <div className="mx-auto max-w-6xl">
          <AnimatedSection className="mb-10 text-center">
            <p className="font-body text-[0.68rem] uppercase tracking-[0.38em] text-storm-slate/58">
              Editorial timeline
            </p>
            <h2 className="mt-4 font-heading text-5xl leading-[0.92] text-storm-slate sm:text-6xl">
              Key dates for submissions, selection, and launch.
            </h2>
            <SectionDivider className="mt-6" />
          </AnimatedSection>

          <div className="grid gap-6 md:grid-cols-3">
            <AnimatedSection delay={0.05}>
              <DateCard
                index={1}
                milestone="Submission deadline"
                date={submissionDeadlineLabel}
                description="The final day to send poetry, prose, or flash fiction for editorial consideration."
              />
            </AnimatedSection>

            <AnimatedSection delay={0.12}>
              <DateCard
                index={2}
                milestone="Virtual launch"
                date="July 15, 2026"
                description="An online release event introducing the anthology, its contributors, and the editorial team."
              />
            </AnimatedSection>

            <AnimatedSection delay={0.18}>
              <DateCard
                index={3}
                milestone="Physical launch"
                date="July 25, 2026"
                description="The print edition arrives with an in-person celebration marking the anthology's release."
              />
            </AnimatedSection>
          </div>
        </div>
      </section>
    </main>
  );
}
