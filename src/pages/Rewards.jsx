import { Link } from 'react-router-dom';
import { ArrowLeft, Award, BookOpen, Sparkles, Trophy, Download, Star } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import PageHeader from '../components/PageHeader';
import SectionDivider from '../components/SectionDivider';

const awards = [
  {
    icon: BookOpen,
    title: 'The Derozio Prize',
    subtitle: 'Best Poetry',
    description:
      'Named in honor of the radical educator and poet Henry Louis Vivian Derozio, this prize is awarded to the work that best exemplifies technical mastery, lyrical innovation, and emotional depth. It seeks to recognize a poet whose voice challenges the status quo and brings a fresh, contemporary perspective to the Indian anthology landscape.',
    color: 'from-warm-sand/40 to-warm-sand/10',
    borderColor: 'border-warm-sand/50',
    hoverBg: 'hover:bg-warm-sand/20',
    judgingCriteria: 'Download the Judging Criteria',
    criteriaLink: '/Criteria/The Derozio Prize_JC.pdf',
    tier: 1,
    position: 'left',
  },
  {
    icon: Trophy,
    title: 'The Soft Apocalypse Grand Prize',
    subtitle: 'Best Overall Work',
    description:
      'This is the highest honor of the project, conferred upon the single most outstanding contribution overall. The Grand Prize winner represents the pinnacle of the Soft Apocalypse vision—a work that seamlessly blends artistic rigor with profound thematic relevance. This award recognizes a writer whose contribution stands as a benchmark for excellence in independent publishing.',
    color: 'from-indigo-950/40 via-slate-900/30 to-storm-slate/20',
    borderColor: 'border-slate-600/50',
    hoverBg: 'hover:bg-slate-700/20',
    judgingCriteria: 'Download our Judging Criteria',
    criteriaLink: '/Criteria/The SA Grand Prize_JC.pdf',
    tier: 3,
    position: 'center',
    featured: true,
  },
  {
    icon: Award,
    title: 'The Amber Prize',
    subtitle: 'Best Prose',
    description:
      'The Amber Prize is reserved for the finest work of prose within the collection. We are looking for a narrative that demonstrates narrative excellence, compelling characterization, and a unique structural approach. Whether experimental or traditional, the winning piece will be one that leaves a lasting intellectual and emotional impact on the reader.',
    color: 'from-amber-300/30 to-amber-200/10',
    borderColor: 'border-amber-300/50',
    hoverBg: 'hover:bg-amber-300/20',
    judgingCriteria: 'Download our Judging Criteria',
    criteriaLink: '/Criteria/The Amber Prize_JC.pdf',
    tier: 2,
    position: 'right',
  },
];

const recognitionBenefits = [
  {
    title: 'Monetary Grant',
    description: 'A cash prize to support the author\'s future literary endeavors.',
  },
  {
    title: 'Institutional Certification',
    description: 'A framed certificate of distinction recognizing their achievement.',
  },
  {
    title: 'Editorial Commendation',
    description: 'A formal letter from the Editor-in-Chief, Naman Prakash detailing the merit of their work.',
  },
  {
    title: 'Media Spotlight',
    description: 'Dedicated coverage across our digital platforms and partner media outlets.',
  },
  {
    title: 'Author\'s Edition',
    description: 'A complimentary, premium copy of the Soft Apocalypse 2026 anthology.',
  },
];

export default function Rewards() {
  return (
    <main className="overflow-hidden">
      <PageHeader
        pretitle="Excellence in Literature"
        title="Awards & Recognition"
        description="Celebrating exceptional talent through our distinguished awards program"
        stats={[
          { value: '3', label: 'Award Categories' },
          { value: 'July 2026', label: 'Winners Announced' },
        ]}
      />

      <section className="relative px-4 py-24 sm:px-6 lg:px-8">
        {/* Decorative background gradients */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-1/4 h-72 w-72 rounded-full bg-gradient-to-r from-warm-sand/8 to-transparent blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-gradient-to-l from-amber-300/5 to-transparent blur-3xl" />
        </div>

        <div className="mx-auto max-w-4xl">
          <AnimatedSection className="space-y-12">
            <div className="space-y-6">
              <p className="font-body text-[0.7rem] uppercase tracking-[0.38em] text-storm-slate/56">
                Awards Structure
              </p>
              <h2 className="font-heading text-5xl leading-[0.95] text-storm-slate sm:text-6xl">
                Standards of Literary Excellence
              </h2>
              <p className="font-body text-lg leading-9 text-deep-ink/72">
                To uphold the highest standards of contemporary literature and provide genuine
                institutional credit to our contributors, Soft Apocalypse 2026 has established a
                formal awards structure. These accolades recognize exceptional talent across three
                distinct categories, with winners selected by our distinguished panel of patrons
                and judges. These are not participation honours. They are institutional marks, the kind that follow a writer's name into every room they enter after this.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="relative px-4 py-28 sm:px-6 lg:px-8">
        {/* Background gradient accent */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-gradient-to-r from-warm-sand/8 via-amber-400/5 to-storm-slate/5 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl">
          <div className="mb-20 space-y-8">
            <div className="text-center space-y-6">
              <div className="space-y-2">
                <p className="font-body text-[0.7rem] uppercase tracking-[0.38em] text-storm-slate/56">
                  Three Distinguished Honours
                </p>
                <h2 className="mt-4 font-heading text-6xl leading-[0.95] text-storm-slate sm:text-7xl">
                  Three <span className="text-warm-sand">Paths</span> to Excellence
                </h2>
              </div>
              <p className="mx-auto max-w-3xl font-body text-lg leading-9 text-deep-ink/72">
                Each award recognizes a different form of literary brilliance. Whether you excel in poetry's precision, prose's depth, or transcendent artistry—there is a place for your work here. Winners are selected not for participation, but for the indelible mark their writing leaves on the collection.
              </p>
            </div>
          </div>

          {/* Awards Grid with Featured Center */}
          <div className="grid gap-8 lg:grid-cols-3 lg:gap-6 items-center">
            {/* Left Award */}
            {awards
              .filter((award) => award.position === 'left')
              .map((award, index) => {
                const IconComponent = award.icon;
                return (
                  <AnimatedSection key={index}>
                    <div className="group h-full rounded-[2.5rem] border border-white/30 bg-white/50 p-8 shadow-[0_20px_70px_-40px_rgba(23,34,52,0.4)] backdrop-blur-xl transition-all duration-500 hover:border-warm-sand/50 hover:shadow-[0_30px_100px_-30px_rgba(196,168,130,0.3)]">
                      <div className="space-y-6">
                        <div className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-warm-sand/25 to-warm-sand/10 p-4 shadow-[0_8px_24px_-12px_rgba(196,168,130,0.3)]">
                          <IconComponent size={32} className="text-warm-sand" strokeWidth={1.5} />
                        </div>
                        <div>
                          <p className="text-xs font-body uppercase tracking-wider text-storm-slate/60">
                            {award.subtitle}
                          </p>
                          <h3 className="mt-3 font-heading text-2xl leading-tight text-storm-slate">
                            {award.title}
                          </h3>
                        </div>
                        <p className="font-body text-sm leading-7 text-deep-ink/72">
                          {award.description}
                        </p>
                        <div className="pt-4 border-t border-warm-sand/20">
                          <a
                            href={award.criteriaLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-warm-sand/15 border border-warm-sand/30 text-xs font-semibold text-warm-sand hover:bg-warm-sand/25 hover:border-warm-sand/50 transition-all duration-300 group/dl"
                          >
                            <Download size={14} />
                            Judging Criteria
                          </a>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                );
              })}

            {/* Center Featured Award - Grand Prize */}
            {awards
              .filter((award) => award.featured)
              .map((award, index) => {
                const IconComponent = award.icon;
                return (
                  <AnimatedSection key={index} className="lg:-mx-4">
                    <div className="group relative h-full rounded-[2.5rem] border-2 border-warm-sand/50 bg-gradient-to-br from-white/70 to-white/40 p-10 shadow-[0_40px_140px_-48px_rgba(196,168,130,0.4)] backdrop-blur-xl transition-all duration-500 hover:shadow-[0_50px_180px_-32px_rgba(196,168,130,0.6)] hover:border-warm-sand/70 transform lg:scale-110 lg:z-10">
                      {/* Premium badge */}
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-warm-sand to-amber-400 shadow-[0_12px_40px_-20px_rgba(196,168,130,0.6)]">
                          <span className="text-lg">✨</span>
                          <span className="text-xs font-semibold text-white uppercase tracking-wider">Grand Prize</span>
                          <span className="text-lg">✨</span>
                        </div>
                      </div>

                      <div className="relative space-y-6 mt-6">
                        <div className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-warm-sand/30 to-warm-sand/15 p-5 shadow-[0_12px_40px_-20px_rgba(196,168,130,0.4)]">
                          <IconComponent size={40} className="text-warm-sand" strokeWidth={1.5} />
                        </div>
                        <div>
                          <p className="text-xs font-body uppercase tracking-wider text-storm-slate/60">
                            {award.subtitle}
                          </p>
                          <h3 className="mt-3 font-heading text-3xl leading-tight text-storm-slate">
                            {award.title}
                          </h3>
                        </div>
                        <p className="font-body text-base leading-8 text-deep-ink/75">
                          {award.description}
                        </p>
                        <div className="pt-4 border-t border-warm-sand/30">
                          <a
                            href={award.criteriaLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-warm-sand/20 border border-warm-sand/40 text-xs font-semibold text-warm-sand hover:bg-warm-sand/30 hover:border-warm-sand/60 transition-all duration-300 group/dl"
                          >
                            <Download size={14} />
                            Judging Criteria
                          </a>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                );
              })}

            {/* Right Award */}
            {awards
              .filter((award) => award.position === 'right')
              .map((award, index) => {
                const IconComponent = award.icon;
                return (
                  <AnimatedSection key={index}>
                    <div className="group h-full rounded-[2.5rem] border border-white/30 bg-white/50 p-8 shadow-[0_20px_70px_-40px_rgba(23,34,52,0.4)] backdrop-blur-xl transition-all duration-500 hover:border-amber-400/40 hover:shadow-[0_30px_100px_-30px_rgba(180,83,9,0.25)]">
                      <div className="space-y-6">
                        <div className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400/25 to-amber-400/10 p-4 shadow-[0_8px_24px_-12px_rgba(180,83,9,0.2)]">
                          <IconComponent size={32} className="text-amber-700" strokeWidth={1.5} />
                        </div>
                        <div>
                          <p className="text-xs font-body uppercase tracking-wider text-storm-slate/60">
                            {award.subtitle}
                          </p>
                          <h3 className="mt-3 font-heading text-2xl leading-tight text-storm-slate">
                            {award.title}
                          </h3>
                        </div>
                        <p className="font-body text-sm leading-7 text-deep-ink/72">
                          {award.description}
                        </p>
                        <div className="pt-4 border-t border-amber-400/20">
                          <a
                            href={award.criteriaLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-400/15 border border-amber-400/30 text-xs font-semibold text-amber-700 hover:bg-amber-400/25 hover:border-amber-400/50 transition-all duration-300 group/dl"
                          >
                            <Download size={14} />
                            Judging Criteria
                          </a>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                );
              })}
          </div>
        </div>
      </section>

      {/* Judging Criteria Download Section */}
      <section className="relative px-4 py-24 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/3 right-0 h-80 w-80 rounded-full bg-gradient-to-l from-warm-sand/3 to-transparent blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl">
          <AnimatedSection className="space-y-12">
            <div className="max-w-3xl">
              <p className="font-body text-[0.7rem] uppercase tracking-[0.38em] text-storm-slate/56">
                Beyond The Honor
              </p>
              <h2 className="mt-4 font-heading text-5xl leading-[0.95] text-storm-slate sm:text-6xl">
                Tangible Recognition <span className="text-warm-sand">&</span> Rewards
              </h2>
              <SectionDivider align="start" />
              <p className="mt-6 font-body text-lg leading-8 text-deep-ink/74">
                Award recipients receive comprehensive recognition extending far beyond prestige. Each winner gains institutional credentials, media visibility, and material support to accelerate their literary career.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recognitionBenefits.map((benefit, index) => (
                <div
                  key={index}
                  className="group relative rounded-[2rem] border border-white/60 bg-gradient-to-br from-white/50 to-white/20 p-8 shadow-[0_20px_70px_-40px_rgba(23,34,52,0.4)] backdrop-blur-xl transition-all duration-500 hover:border-warm-sand/50 hover:shadow-[0_30px_100px_-30px_rgba(196,168,130,0.4)] hover:from-white/70 hover:to-white/40"
                >
                  {/* Accent line */}
                  <div className="absolute top-0 left-0 h-1 w-8 rounded-r bg-gradient-to-r from-warm-sand to-amber-400 group-hover:w-16 transition-all duration-500" />
                  
                  <div className="space-y-4">
                    <div className="inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-warm-sand/20 to-warm-sand/5 p-3 group-hover:from-warm-sand/30 group-hover:to-warm-sand/15 transition-all duration-300">
                      <Star size={24} className="text-warm-sand" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-heading text-xl leading-tight text-storm-slate">
                      {benefit.title}
                    </h3>
                    <p className="font-body text-sm leading-7 text-deep-ink/70">
                      {benefit.description}
                    </p>
                  </div>

                  {/* Hover indicator */}
                  <div className="absolute bottom-3 right-3 text-warm-sand/0 group-hover:text-warm-sand/60 transition-colors duration-300">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 10l4-4m0 0l0 4m0-4l-4 0" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/68 px-4 py-2 font-body text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-storm-slate shadow-[0_18px_40px_-32px_rgba(23,34,52,0.8)] backdrop-blur-xl transition-all duration-300 hover:border-warm-sand/40 hover:text-warm-sand"
          >
            <ArrowLeft size={15} />
            Back to home
          </Link>
        </div>
      </section>
    </main>
  );
}
