import { Instagram, Twitter, Mail, Phone, ArrowUpRight } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import PageHeader from '../components/PageHeader';

const contactCards = [
  {
    title: 'Instagram',
    value: '@softapocalypse.in',
    href: 'https://instagram.com/softapocalypse.in',
    icon: Instagram,
  },
  {
    title: 'X / Twitter',
    value: '@thesoftapclypse',
    href: 'https://x.com/thesoftapclypse',
    icon: Twitter,
  },
  {
    title: 'Email',
    value: 'hello@softapocalypse.in',
    href: 'mailto:hello@softapocalypse.in',
    icon: Mail,
  },
  {
    title: 'Phone',
    value: '+91 98765 43210',
    href: 'tel:+919876543210',
    icon: Phone,
  },
];

export default function Contact() {
  return (
    <main className="pb-24">
      <PageHeader
        eyebrow="Contact desk"
        title="Contact"
        description="Reach the Soft Apocalypse team for editorial questions, submission support, and project updates."
        stats={[
          { value: '24 hrs', label: 'Typical reply window' },
          { value: 'DM + mail', label: 'Best channels' },
          { value: 'India', label: 'Project base' },
        ]}
      />

      <section className="px-4 sm:px-6 lg:px-8" aria-label="Contact information">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1fr_0.88fr]">
          <div className="grid gap-6 sm:grid-cols-2">
            {contactCards.map((card, index) => {
              const Icon = card.icon;

              return (
                <AnimatedSection key={card.title} delay={index * 0.06}>
                  <a
                    href={card.href}
                    target={card.href.startsWith('http') ? '_blank' : undefined}
                    rel={card.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group block rounded-[1.85rem] border border-white/72 bg-white/62 p-6 shadow-[0_24px_70px_-54px_rgba(23,34,52,0.85)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-storm-slate/10 bg-rain-mist/90 text-storm-slate">
                        <Icon size={20} />
                      </span>
                      <ArrowUpRight
                        size={16}
                        className="text-storm-slate/40 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-warm-sand"
                      />
                    </div>

                    <p className="mt-6 font-body text-[0.68rem] uppercase tracking-[0.36em] text-storm-slate/56">
                      {card.title}
                    </p>
                    <p className="mt-3 font-heading text-3xl leading-tight break-words text-deep-ink">
                      {card.value}
                    </p>
                  </a>
                </AnimatedSection>
              );
            })}
          </div>

          <AnimatedSection
            delay={0.18}
            className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-deep-ink p-7 text-rain-mist shadow-[0_32px_80px_-46px_rgba(23,34,52,1)] sm:p-8"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(196,168,130,0.22),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.06),transparent_28%)]" />

            <div className="relative">
              <p className="font-body text-[0.68rem] uppercase tracking-[0.38em] text-warm-sand/80">
                Best way to reach us
              </p>
              <h2 className="mt-4 font-heading text-4xl leading-[0.94] text-rain-mist sm:text-5xl">
                Email for formal queries, social for updates and conversation.
              </h2>
              <p className="mt-5 font-body text-sm leading-7 text-rain-mist/70 sm:text-base">
                If your question is about submissions, rights, deadlines, or anthology
                logistics, email is the clearest route. For public announcements and
                project updates, our social channels are the quickest place to check.
              </p>

              <div className="mt-8 grid gap-4">
                <div className="rounded-[1.4rem] border border-white/10 bg-white/6 p-5">
                  <p className="font-body text-[0.66rem] uppercase tracking-[0.32em] text-rain-mist/45">
                    Response window
                  </p>
                  <p className="mt-2 font-heading text-3xl leading-none text-rain-mist">
                    Usually within one day
                  </p>
                </div>

                <div className="rounded-[1.4rem] border border-white/10 bg-white/6 p-5">
                  <p className="font-body text-[0.66rem] uppercase tracking-[0.32em] text-rain-mist/45">
                    For submission help
                  </p>
                  <p className="mt-2 font-heading text-3xl leading-none text-rain-mist">
                    Include your full name and genre
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
