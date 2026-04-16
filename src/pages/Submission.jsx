import {
  CalendarRange,
  Clock3,
  FileCheck2,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import CountdownTimer from '../components/CountdownTimer';
import FAQBot from '../components/FAQBot';
import NotificationOptIn from '../components/NotificationOptIn';
import PageHeader from '../components/PageHeader';
import SubmissionForm from '../components/SubmissionForm';
import useSubmissionWindow from '../hooks/useSubmissionWindow';
import { formatIstDate, formatIstDateTime } from '../lib/submissionWindow';

const genres = [
  {
    name: 'Poetry',
    description: 'Original poems that feel formally alive, emotionally precise, or structurally surprising.',
  },
  {
    name: 'Prose',
    description: 'Essays, short prose, or hybrid pieces with a clear voice and strong sense of movement.',
  },
  {
    name: 'Flash Fiction',
    description: 'Compressed narratives that carry weight without losing clarity or atmosphere.',
  },
];

const checklist = [
  'You must be under the age of twenty-five at the time of submission.',
  'Work must be original, unpublished, and submitted by its sole author.',
  'There is no submission fee for any genre.',
];

const uploadRules = [
  'Allowed files: PDF, DOCX, TXT.',
  'Maximum upload size: 10MB.',
  'Date checks are pinned to IST using JavaScript Date.',
];

export default function Submission() {
  const {
    status,
    isBeforeOpen,
    isOpen,
    isClosed,
    opensAt,
    closesAt,
    opensAtLabel,
    closesAtLabel,
    timeZone,
  } = useSubmissionWindow();

  const opensOnLabel = formatIstDate(opensAt, { day: 'numeric', month: 'long' });
  const opensShortLabel = formatIstDate(opensAt);
  const stateContent = {
    pre: {
      badge: `Submissions open on ${opensOnLabel}`,
      title: `The form remains hidden until the clock reaches ${opensShortLabel}.`,
      description:
        'Before the opening timestamp, the countdown stays visible, the form stays locked, and submit attempts are rejected by shared validation.',
      accentClass: 'border-warm-sand/30 bg-warm-sand/12 text-warm-sand',
    },
    open: {
      badge: 'Submissions Open',
      title: 'The submission window is live and accepting entries.',
      description: `As soon as the countdown ends, the form appears automatically and remains available until ${closesAtLabel}.`,
      accentClass: 'border-emerald-500/24 bg-emerald-500/8 text-emerald-400',
    },
    closed: {
      badge: 'Submissions Closed',
      title: 'The submission window has ended and the form is fully blocked.',
      description:
        'After the closing timestamp, the form stays hidden and all submission attempts are rejected by the same shared validation logic.',
      accentClass: 'border-storm-slate/20 bg-storm-slate/8 text-storm-slate/80',
    },
  };
  const currentState = stateContent[status];
  const timelineCards = [
    {
      label: 'Opens',
      value: formatIstDateTime(opensAt),
      note: 'Countdown ends and the native form appears automatically.',
    },
    {
      label: 'Closes',
      value: formatIstDateTime(closesAt),
      note: 'Submissions sent after this point are rejected completely.',
    },
    {
      label: 'Timezone',
      value: `IST (${timeZone})`,
      note: 'All window logic is pinned explicitly to India Standard Time.',
    },
  ];

  return (
    <>
      <main className="pb-28">
        <PageHeader
          eyebrow="Submission dossier"
          title="Submission & Guidelines"
          description="A native, IST-aware submission system with live countdown logic, form validation, and a scripted FAQ widget for entrants."
          stats={[
            { value: formatIstDate(opensAt, { day: '2-digit', month: 'short' }), label: 'Opens IST' },
            { value: formatIstDate(closesAt, { day: '2-digit', month: 'short' }), label: 'Closes IST' },
            { value: '10MB', label: 'Upload cap' },
          ]}
        />

        <section className="px-4 pb-6 sm:px-6 lg:px-8" aria-label="Submission status">
          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.08fr_0.92fr]">
            <AnimatedSection className="rounded-[2rem] border border-white/72 bg-white/64 p-7 shadow-[0_28px_90px_-64px_rgba(23,34,52,0.85)] backdrop-blur-xl sm:p-10">
              <p className="font-body text-[0.68rem] uppercase tracking-[0.38em] text-storm-slate/58">
                Submission window
              </p>

              <div className="mt-6 space-y-5 font-body text-base leading-8 text-deep-ink/74 sm:text-lg">
                <p>
                  Soft Apocalypse 2026 accepts original, unpublished work in poetry, prose,
                  and flash fiction. The window opens at <strong>{opensAtLabel}</strong> and
                  closes at <strong>{closesAtLabel}</strong>.
                </p>
                <p>
                  Both the UI and the validation layer are driven by JavaScript Date using
                  IST explicitly, so the experience updates automatically as the clock
                  changes.
                </p>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {timelineCards.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[1.5rem] border border-storm-slate/10 bg-rain-mist/82 p-5"
                  >
                    <p className="font-body text-[0.68rem] uppercase tracking-[0.3em] text-storm-slate/52">
                      {item.label}
                    </p>
                    <p className="mt-3 font-heading text-3xl leading-tight break-words text-deep-ink">
                      {item.value}
                    </p>
                    <p className="mt-3 font-body text-sm leading-7 text-deep-ink/66">
                      {item.note}
                    </p>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection
              delay={0.08}
              className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-deep-ink p-7 text-rain-mist shadow-[0_32px_80px_-46px_rgba(23,34,52,1)] sm:p-8"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(196,168,130,0.2),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.06),transparent_28%)]" />

              <div className="relative">
                <span
                  className={`inline-flex rounded-full border px-4 py-2 font-body text-[0.68rem] font-semibold uppercase tracking-[0.28em] ${currentState.accentClass}`}
                >
                  {currentState.badge}
                </span>

                <h2 className="mt-3 font-heading text-4xl leading-[0.94] text-rain-mist">
                  {currentState.title}
                </h2>
                <p className="mt-3 font-body text-sm leading-7 text-rain-mist/70 sm:text-base">
                  {currentState.description}
                </p>

                <div className="mt-6 space-y-4">
                  <div className="flex gap-3">
                    <CalendarRange size={18} className="mt-1 text-warm-sand" />
                    <p className="font-body text-sm leading-7 text-rain-mist/72 sm:text-base">
                      Opening date: {formatIstDate(opensAt)} at 6:00 PM IST.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Clock3 size={18} className="mt-1 text-warm-sand" />
                    <p className="font-body text-sm leading-7 text-rain-mist/72 sm:text-base">
                      Final deadline: {formatIstDate(closesAt)} at 11:59 PM IST.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <ShieldCheck size={18} className="mt-1 text-warm-sand" />
                    <p className="font-body text-sm leading-7 text-rain-mist/72 sm:text-base">
                      Shared validation blocks all submissions outside the approved window.
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        <section className="px-4 pb-8 sm:px-6 lg:px-8" aria-label="Submission overview">
          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.08fr_0.92fr]">
            <AnimatedSection className="rounded-[2rem] border border-white/72 bg-white/64 p-7 shadow-[0_28px_90px_-68px_rgba(23,34,52,0.82)] backdrop-blur-xl sm:p-10">
              <p className="font-body text-[0.68rem] uppercase tracking-[0.38em] text-storm-slate/58">
                Eligible work
              </p>

              <div className="mt-6 space-y-5 font-body text-base leading-8 text-deep-ink/74 sm:text-lg">
                <p>
                  Every submission is reviewed by the editorial panel. Selected writers
                  receive publication credit, a contributor copy, and anthology event
                  invitations.
                </p>
                <p>
                  The form below accepts required identity fields, optional text content,
                  and optional file uploads with clear validation messages.
                </p>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {genres.map((genre) => (
                  <div
                    key={genre.name}
                    className="rounded-[1.5rem] border border-storm-slate/10 bg-rain-mist/82 p-5"
                  >
                    <p className="font-heading text-3xl leading-none text-deep-ink">
                      {genre.name}
                    </p>
                    <p className="mt-3 font-body text-sm leading-7 text-deep-ink/68">
                      {genre.description}
                    </p>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <div className="space-y-6">
              <AnimatedSection
                delay={0.08}
                className="rounded-[2rem] border border-white/72 bg-white/64 p-7 shadow-[0_24px_70px_-56px_rgba(23,34,52,0.8)] backdrop-blur-xl sm:p-8"
              >
                <p className="font-body text-[0.68rem] uppercase tracking-[0.38em] text-storm-slate/58">
                  Before you submit
                </p>

                <div className="mt-6 space-y-4">
                  {checklist.map((item) => (
                    <div key={item} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-warm-sand" />
                      <p className="font-body text-sm leading-7 text-deep-ink/72 sm:text-base">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              <AnimatedSection
                delay={0.14}
                className="rounded-[2rem] border border-white/72 bg-white/64 p-7 shadow-[0_24px_70px_-56px_rgba(23,34,52,0.8)] backdrop-blur-xl sm:p-8"
              >
                <p className="font-body text-[0.68rem] uppercase tracking-[0.38em] text-storm-slate/58">
                  Upload rules
                </p>

                <div className="mt-6 space-y-4">
                  {uploadRules.map((item) => (
                    <div key={item} className="flex gap-3">
                      <span className="mt-1 rounded-full bg-rain-mist p-2 text-storm-slate">
                        <FileCheck2 size={16} />
                      </span>
                      <p className="font-body text-sm leading-7 text-deep-ink/72 sm:text-base">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {isBeforeOpen ? (
          <section className="px-4 pb-12 sm:px-6 lg:px-8" aria-label="Countdown timer">
            <div className="mx-auto max-w-6xl">
              <CountdownTimer />
            </div>
          </section>
        ) : null}

        {isBeforeOpen ? (
          <section className="px-4 pb-12 sm:px-6 lg:px-8" aria-label="Notification opt-in">
            <div className="mx-auto max-w-6xl">
              <NotificationOptIn />
            </div>
          </section>
        ) : null}

        {isOpen ? (
          <section className="px-4 pb-8 sm:px-6 lg:px-8" aria-label="Open submission notice">
            <div className="mx-auto max-w-6xl">
              <AnimatedSection className="rounded-[2rem] border border-emerald-500/14 bg-white/74 p-6 shadow-[0_28px_80px_-64px_rgba(23,34,52,0.82)] backdrop-blur-xl sm:p-8">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  <div className="max-w-2xl">
                    <p className="font-body text-[0.68rem] uppercase tracking-[0.38em] text-emerald-700">
                      Live state
                    </p>
                    <h2 className="mt-4 font-heading text-4xl leading-[0.94] text-storm-slate sm:text-5xl">
                      Submissions Open
                    </h2>
                    <p className="mt-4 font-body text-sm leading-7 text-deep-ink/72 sm:text-base">
                      The countdown is complete, the form is visible, and entries are being
                      accepted through {closesAtLabel}.
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-3 rounded-full border border-emerald-500/20 bg-emerald-500/8 px-5 py-3 font-body text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
                    <Sparkles size={16} />
                    Accepting submissions
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </section>
        ) : null}

        {/* Submission guidelines - always visible */}
        <section className="px-4 pb-12 sm:px-6 lg:px-8" aria-label="Submission guidelines">
          <div className="mx-auto max-w-6xl">
            <AnimatedSection className="rounded-[2rem] border border-white/72 bg-white/72 p-7 shadow-[0_28px_90px_-68px_rgba(23,34,52,0.82)] backdrop-blur-xl sm:p-10">
              <div className="max-w-4xl">
                <p className="font-body text-[0.68rem] uppercase tracking-[0.38em] text-storm-slate/58">
                  Submission Guidelines
                </p>
                
                <h2 className="mt-6 font-heading text-3xl leading-[1.1] text-deep-ink sm:text-4xl">
                  SOFT APOCALYPSE 2026
                </h2>

                <div className="mt-8 space-y-8 font-body text-base leading-8 text-deep-ink/74 sm:text-lg">
                  
                  {/* Theme */}
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-storm-slate">Theme</h3>
                    <ul className="mt-4 space-y-2 ml-4 list-disc">
                      <li>The theme is <strong>Soft Apocalypse</strong></li>
                      <li>Work must engage with the theme: quiet collapse, slow erasure, the world undone without announcement</li>
                      <li><em>Resist spectacle. Reach for precision.</em></li>
                    </ul>
                  </div>

                  {/* Categories & Limits */}
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-storm-slate">Categories & Limits</h3>
                    <ul className="mt-4 space-y-2 ml-4 list-disc">
                      <li><strong>Poetry:</strong> One original poem, 40–50 lines.</li>
                      <li><strong>Prose:</strong> One original piece, 600–700 words.</li>
                      <li>Submissions outside specified limits will be disqualified without review.</li>
                      <li>Applicants may submit in both categories via separate entries.</li>
                    </ul>
                  </div>

                  {/* Formatting & Font */}
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-storm-slate">Formatting & Font</h3>
                    <ul className="mt-4 space-y-2 ml-4 list-disc">
                      <li><strong>Font:</strong> Times New Roman, 12pt</li>
                      <li><strong>Line Spacing:</strong> 1.5</li>
                      <li><strong>Margins:</strong> 1 inch on all sides</li>
                      <li><strong>Page Size:</strong> A4</li>
                      <li><strong>File Format:</strong> .doc, .docx, or .pdf only</li>
                    </ul>
                  </div>

                  {/* Manuscript */}
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-storm-slate">Manuscript</h3>
                    <ul className="mt-4 space-y-2 ml-4 list-disc">
                      <li>Remove all identifying information from the document prior to submission</li>
                      <li>The title may appear in the document header</li>
                      <li>All submissions are reviewed anonymously</li>
                    </ul>
                  </div>

                  {/* Language & Originality */}
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-storm-slate">Language & Originality</h3>
                    <ul className="mt-4 space-y-2 ml-4 list-disc">
                      <li>Submissions must be written originally in English.</li>
                      <li>Translations will not be accepted under any circumstances.</li>
                      <li><strong>AI-generated or AI-assisted writing is strictly ineligible.</strong></li>
                      <li>Previously published work, including blogs, Substack, and any publicly accessible platform will not be considered.</li>
                      <li>Simultaneous submissions are not permitted.</li>
                    </ul>
                  </div>

                  {/* Eligibility */}
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-storm-slate">Eligibility</h3>
                    <ul className="mt-4 space-y-2 ml-4 list-disc">
                      <li>Open to writers aged 25 and under in 2026.</li>
                      <li>No institutional affiliation required.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {isOpen ? (
          <section className="px-4 sm:px-6 lg:px-8" aria-label="Submission form">
            <div className="mx-auto max-w-6xl">
              <SubmissionForm
                opensAtLabel={opensAtLabel}
                closesAtLabel={closesAtLabel}
                status={status}
              />
            </div>
          </section>
        ) : null}
      </main>

      <FAQBot />
    </>
  );
}
