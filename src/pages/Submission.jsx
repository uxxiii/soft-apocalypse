import { Sparkles, ShieldCheck, Feather, BookOpen } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import PageHeader from '../components/PageHeader';
import SubmissionForm from '../components/SubmissionForm';

export default function Submission() {
  return (
    <main className="pb-28">
      <PageHeader
        eyebrow="Soft Apocalypse India"
        title="Submissions Portal"
        description="Submissions are open to young Indian writers aged 25 and under. Poetry and prose are read completely anonymously by our curatorial panel."
        stats={[
          { value: 'Live', label: 'Portal Status' },
          { value: '40–50', label: 'Poetry Lines' },
          { value: '600–700', label: 'Prose Words' },
        ]}
      />

      {/* Essential Guidelines Card */}
      <section className="px-4 pb-10 sm:px-6 lg:px-8" aria-label="Essential submission guidelines">
        <div className="mx-auto max-w-4xl">
          <AnimatedSection className="rounded-[2.2rem] border border-white/75 bg-white/60 p-6 sm:p-8 shadow-[0_24px_70px_-54px_rgba(23,34,52,0.65)] backdrop-blur-xl">
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-storm-slate/10 text-storm-slate">
                  <Feather size={20} />
                </div>
                <div>
                  <h3 className="font-heading text-lg text-storm-slate font-semibold">
                    Poetry
                  </h3>
                  <p className="mt-1 font-body text-xs leading-relaxed text-deep-ink/70">
                    One original poem, 40–50 lines. Preserves line breaks and stanza structure.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-warm-sand/20 text-storm-slate">
                  <BookOpen size={20} />
                </div>
                <div>
                  <h3 className="font-heading text-lg text-storm-slate font-semibold">
                    Prose
                  </h3>
                  <p className="mt-1 font-body text-xs leading-relaxed text-deep-ink/70">
                    One original prose piece, 600–700 words. Fiction or creative non-fiction.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-700">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h3 className="font-heading text-lg text-storm-slate font-semibold">
                    Eligibility
                  </h3>
                  <p className="mt-1 font-body text-xs leading-relaxed text-deep-ink/70">
                    Aged 25 and under in India. Unpublished, original in English, zero submission fees.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8" aria-label="Submission form">
        <SubmissionForm />
      </section>
    </main>
  );
}
