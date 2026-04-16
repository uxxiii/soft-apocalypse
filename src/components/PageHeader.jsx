import AnimatedSection from './AnimatedSection';
import SectionDivider from './SectionDivider';

export default function PageHeader({
  eyebrow = 'Soft Apocalypse 2026',
  title,
  description,
  stats = [],
}) {
  return (
    <section className="px-4 pb-10 pt-4 sm:px-6 sm:pb-12 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/58 px-6 py-10 shadow-[0_28px_100px_-60px_rgba(23,34,52,0.7)] backdrop-blur-xl sm:px-10 sm:py-12 lg:px-14 lg:py-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(196,168,130,0.22),transparent_30%),radial-gradient(circle_at_left,rgba(44,74,110,0.12),transparent_28%)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-warm-sand/80 to-transparent" />

          <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.55fr)_minmax(290px,0.75fr)] lg:items-end">
            <div className="space-y-6">
              <p className="inline-flex items-center gap-3 font-body text-[0.68rem] uppercase tracking-[0.38em] text-storm-slate/62">
                <span className="h-px w-10 bg-warm-sand/70" />
                {eyebrow}
              </p>

              <div className="space-y-4">
                <h1 className="max-w-4xl font-heading text-5xl leading-[0.9] text-storm-slate sm:text-6xl lg:text-[5.15rem]">
                  {title}
                </h1>

                {description && (
                  <p className="max-w-2xl font-body text-base leading-8 text-deep-ink/75 sm:text-lg">
                    {description}
                  </p>
                )}
              </div>

              <SectionDivider align="start" />
            </div>

            {stats.length > 0 && (
              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {stats.map((stat) => (
                  <div
                    key={`${stat.label}-${stat.value}`}
                    className="rounded-[1.4rem] border border-white/70 bg-white/72 p-4 shadow-[0_18px_30px_-28px_rgba(23,34,52,0.7)]"
                  >
                    <p className="font-heading text-3xl leading-none text-deep-ink sm:text-[2.1rem]">
                      {stat.value}
                    </p>
                    <p className="mt-2 font-body text-[0.68rem] uppercase tracking-[0.3em] text-storm-slate/55">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
