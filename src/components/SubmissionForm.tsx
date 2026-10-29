import { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  CheckCircle2,
  FileText,
  Sparkles,
  Info,
  Check,
} from 'lucide-react';
import { submitFormToBackend } from '../lib/apiService';

const genres = [
  {
    name: 'Poetry',
    limits: '40–50 lines',
    description: 'One original poem. Minimum 40 lines, maximum 50 lines.',
    type: 'lines',
    min: 40,
    max: 50,
  },
  {
    name: 'Prose',
    limits: '600–700 words',
    description: 'One original piece of short fiction or creative non-fiction. 600–700 words.',
    type: 'words',
    min: 600,
    max: 700,
  },
];

const initialFormValues = {
  name: '',
  email: '',
  city: '',
  institution: '',
  genre: 'Poetry',
  title: '',
  content: '',
  ageVerified: false,
};

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function countWords(text) {
  if (!text) return 0;
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function countLines(text) {
  if (!text) return 0;
  return text.split('\n').filter((l) => l.trim().length > 0).length;
}

export default function SubmissionForm() {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState('');
  const [successData, setSuccessData] = useState(null);

  const selectedGenreConfig = useMemo(() => {
    return genres.find((g) => g.name === formValues.genre) || genres[0];
  }, [formValues.genre]);

  const wordCount = useMemo(() => countWords(formValues.content), [formValues.content]);
  const lineCount = useMemo(() => countLines(formValues.content), [formValues.content]);

  const isContentValid = useMemo(() => {
    if (!formValues.content.trim()) return false;
    if (selectedGenreConfig.type === 'lines') {
      return lineCount >= selectedGenreConfig.min && lineCount <= selectedGenreConfig.max;
    }
    return wordCount >= selectedGenreConfig.min && wordCount <= selectedGenreConfig.max;
  }, [formValues.content, selectedGenreConfig, lineCount, wordCount]);

  const handleChange = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({
      name: true,
      email: true,
      city: true,
      institution: true,
      title: true,
      content: true,
      ageVerified: true,
    });

    if (!formValues.name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!formValues.email.trim() || !isValidEmail(formValues.email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!formValues.city.trim()) {
      setErrorMessage('Please enter your city or town.');
      return;
    }
    if (!formValues.institution.trim()) {
      setErrorMessage('Please enter your institution or affiliation (or "Independent").');
      return;
    }
    if (!formValues.title.trim()) {
      setErrorMessage('Please enter the title of your work.');
      return;
    }
    if (!formValues.ageVerified) {
      setErrorMessage('You must confirm that you are aged 25 or under.');
      return;
    }

    if (!formValues.content.trim()) {
      setErrorMessage('Please paste your article or poem into the content area.');
      return;
    }

    if (selectedGenreConfig.type === 'lines') {
      if (lineCount < selectedGenreConfig.min || lineCount > selectedGenreConfig.max) {
        setErrorMessage(
          `Poetry entries must be between 40 and 50 lines. You currently have ${lineCount} non-empty lines.`
        );
        return;
      }
    } else {
      if (wordCount < selectedGenreConfig.min || wordCount > selectedGenreConfig.max) {
        setErrorMessage(
          `Prose entries must be between 600 and 700 words. You currently have ${wordCount} words.`
        );
        return;
      }
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await submitFormToBackend(formValues);
      setStatus('success');
      setSuccessData(response);
    } catch (err) {
      console.error('Submission failed:', err);
      setStatus('error');
      setErrorMessage(err.message || 'Failed to submit. Please verify details and try again.');
    }
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto max-w-3xl rounded-[2.5rem] border border-white/70 bg-white/75 p-10 sm:p-14 text-center shadow-[0_30px_100px_-50px_rgba(23,34,52,0.8)] backdrop-blur-xl"
      >
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
          <CheckCircle2 size={44} />
        </div>

        <p className="mt-6 font-body text-xs font-semibold uppercase tracking-[0.32em] text-storm-slate/60">
          Entry Confirmed
        </p>

        <h2 className="mt-3 font-heading text-4xl sm:text-5xl text-storm-slate leading-tight">
          Thank you, {formValues.name}
        </h2>

        <p className="mt-4 font-body text-base sm:text-lg leading-8 text-deep-ink/75 max-w-xl mx-auto">
          Your entry <strong>"{formValues.title}"</strong> ({formValues.genre}) has been received and stored in the Soft Apocalypse India editorial register.
        </p>

        <div className="mt-8 rounded-2xl border border-storm-slate/10 bg-rain-mist/60 p-6 text-left max-w-lg mx-auto">
          <p className="font-body text-xs uppercase tracking-wider text-storm-slate/70 font-semibold mb-2">
            Next steps:
          </p>
          <ul className="space-y-2 font-body text-sm text-deep-ink/70">
            <li>• A confirmation email has been dispatched to <strong>{formValues.email}</strong>.</li>
            <li>• Submissions are read completely blind by the editorial board.</li>
            <li>• You will receive an official notification once your piece has been evaluated.</li>
          </ul>
        </div>

        <div className="mt-10">
          <button
            onClick={() => {
              setFormValues(initialFormValues);
              setStatus('idle');
              setSuccessData(null);
            }}
            className="inline-flex items-center gap-2 rounded-full border border-storm-slate/20 bg-storm-slate px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.24em] text-white transition-all duration-300 hover:bg-deep-ink hover:shadow-lg"
          >
            Submit Another Piece
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Author Information Card */}
        <div className="rounded-[2.5rem] border border-white/70 bg-white/65 p-8 sm:p-12 shadow-[0_26px_90px_-60px_rgba(23,34,52,0.7)] backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-storm-slate text-xs font-bold text-white">
              1
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl text-storm-slate">
              Author Details
            </h2>
          </div>
          <p className="mt-2 text-sm text-deep-ink/65 font-body">
            All identifying information is kept separate from the reading committee to guarantee blind evaluation.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block font-body text-xs font-semibold uppercase tracking-wider text-storm-slate">
                Full Name *
              </label>
              <input
                id="name"
                type="text"
                value={formValues.name}
                onChange={(e) => handleChange('name', e.target.value)}
                onBlur={() => handleBlur('name')}
                placeholder="e.g. Arundhati Roy"
                className="mt-2 w-full rounded-2xl border border-storm-slate/15 bg-white/80 px-4 py-3.5 font-body text-sm text-deep-ink transition-all placeholder:text-deep-ink/35 focus:border-storm-slate focus:bg-white focus:outline-none focus:ring-2 focus:ring-storm-slate/10"
              />
              {touched.name && !formValues.name.trim() && (
                <p className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-600 font-body">
                  <AlertCircle size={14} /> Full name is required
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block font-body text-xs font-semibold uppercase tracking-wider text-storm-slate">
                Email Address *
              </label>
              <input
                id="email"
                type="email"
                value={formValues.email}
                onChange={(e) => handleChange('email', e.target.value)}
                onBlur={() => handleBlur('email')}
                placeholder="you@domain.com"
                className="mt-2 w-full rounded-2xl border border-storm-slate/15 bg-white/80 px-4 py-3.5 font-body text-sm text-deep-ink transition-all placeholder:text-deep-ink/35 focus:border-storm-slate focus:bg-white focus:outline-none focus:ring-2 focus:ring-storm-slate/10"
              />
              {touched.email && (!formValues.email.trim() || !isValidEmail(formValues.email)) && (
                <p className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-600 font-body">
                  <AlertCircle size={14} /> A valid email address is required
                </p>
              )}
            </div>

            <div>
              <label htmlFor="city" className="block font-body text-xs font-semibold uppercase tracking-wider text-storm-slate">
                City / Town *
              </label>
              <input
                id="city"
                type="text"
                value={formValues.city}
                onChange={(e) => handleChange('city', e.target.value)}
                onBlur={() => handleBlur('city')}
                placeholder="e.g. Pune, Dimapur, Kochi"
                className="mt-2 w-full rounded-2xl border border-storm-slate/15 bg-white/80 px-4 py-3.5 font-body text-sm text-deep-ink transition-all placeholder:text-deep-ink/35 focus:border-storm-slate focus:bg-white focus:outline-none focus:ring-2 focus:ring-storm-slate/10"
              />
              {touched.city && !formValues.city.trim() && (
                <p className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-600 font-body">
                  <AlertCircle size={14} /> City is required
                </p>
              )}
            </div>

            <div>
              <label htmlFor="institution" className="block font-body text-xs font-semibold uppercase tracking-wider text-storm-slate">
                Institution or Affiliation *
              </label>
              <input
                id="institution"
                type="text"
                value={formValues.institution}
                onChange={(e) => handleChange('institution', e.target.value)}
                onBlur={() => handleBlur('institution')}
                placeholder="College, University, or 'Independent'"
                className="mt-2 w-full rounded-2xl border border-storm-slate/15 bg-white/80 px-4 py-3.5 font-body text-sm text-deep-ink transition-all placeholder:text-deep-ink/35 focus:border-storm-slate focus:bg-white focus:outline-none focus:ring-2 focus:ring-storm-slate/10"
              />
              {touched.institution && !formValues.institution.trim() && (
                <p className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-600 font-body">
                  <AlertCircle size={14} /> Institution is required (write 'Independent' if unaffiliated)
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Article & Content Card */}
        <div className="rounded-[2.5rem] border border-white/70 bg-white/65 p-8 sm:p-12 shadow-[0_26px_90px_-60px_rgba(23,34,52,0.7)] backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-storm-slate text-xs font-bold text-white">
              2
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl text-storm-slate">
              Select Category & Paste Your Work
            </h2>
          </div>

          {/* Category Toggle */}
          <div className="mt-6">
            <label className="block font-body text-xs font-semibold uppercase tracking-wider text-storm-slate mb-3">
              Submission Category *
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              {genres.map((g) => {
                const isSelected = formValues.genre === g.name;
                return (
                  <button
                    key={g.name}
                    type="button"
                    onClick={() => handleChange('genre', g.name)}
                    className={`relative rounded-2xl border p-5 text-left transition-all duration-300 ${
                      isSelected
                        ? 'border-storm-slate bg-storm-slate text-white shadow-lg'
                        : 'border-storm-slate/15 bg-white/70 text-deep-ink hover:border-warm-sand hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className={`font-heading text-xl ${isSelected ? 'text-white' : 'text-storm-slate'}`}>
                        {g.name}
                      </h3>
                      <span
                        className={`rounded-full px-3 py-1 font-body text-xs font-semibold tracking-wide ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-warm-sand/20 text-storm-slate'
                        }`}
                      >
                        {g.limits}
                      </span>
                    </div>
                    <p className={`mt-2 font-body text-xs leading-relaxed ${isSelected ? 'text-white/80' : 'text-deep-ink/65'}`}>
                      {g.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Title */}
          <div className="mt-8">
            <label htmlFor="title" className="block font-body text-xs font-semibold uppercase tracking-wider text-storm-slate">
              Title of Work *
            </label>
            <input
              id="title"
              type="text"
              value={formValues.title}
              onChange={(e) => handleChange('title', e.target.value)}
              onBlur={() => handleBlur('title')}
              placeholder="e.g. Monsoon at 3 AM"
              className="mt-2 w-full rounded-2xl border border-storm-slate/15 bg-white/80 px-4 py-3.5 font-body text-sm text-deep-ink transition-all placeholder:text-deep-ink/35 focus:border-storm-slate focus:bg-white focus:outline-none focus:ring-2 focus:ring-storm-slate/10"
            />
            {touched.title && !formValues.title.trim() && (
              <p className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-600 font-body">
                <AlertCircle size={14} /> Title is required
              </p>
            )}
          </div>

          {/* Content Textarea */}
          <div className="mt-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
              <label htmlFor="content" className="block font-body text-xs font-semibold uppercase tracking-wider text-storm-slate">
                Article / Poem Content (Paste Directly) *
              </label>

              {/* Dynamic Live Counter */}
              <div className="flex items-center gap-2">
                {selectedGenreConfig.type === 'lines' ? (
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 font-body text-xs font-semibold ${
                      lineCount >= 40 && lineCount <= 50
                        ? 'bg-emerald-500/15 text-emerald-700 border border-emerald-500/30'
                        : lineCount > 0
                        ? 'bg-amber-500/15 text-amber-800 border border-amber-500/30'
                        : 'bg-storm-slate/10 text-storm-slate/70'
                    }`}
                  >
                    {lineCount >= 40 && lineCount <= 50 && <Check size={13} />}
                    Lines: {lineCount} / 40–50
                  </span>
                ) : (
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 font-body text-xs font-semibold ${
                      wordCount >= 600 && wordCount <= 700
                        ? 'bg-emerald-500/15 text-emerald-700 border border-emerald-500/30'
                        : wordCount > 0
                        ? 'bg-amber-500/15 text-amber-800 border border-amber-500/30'
                        : 'bg-storm-slate/10 text-storm-slate/70'
                    }`}
                  >
                    {wordCount >= 600 && wordCount <= 700 && <Check size={13} />}
                    Words: {wordCount} / 600–700
                  </span>
                )}
              </div>
            </div>

            <textarea
              id="content"
              rows={16}
              value={formValues.content}
              onChange={(e) => handleChange('content', e.target.value)}
              onBlur={() => handleBlur('content')}
              placeholder={
                selectedGenreConfig.type === 'lines'
                  ? 'Paste your poem here (40 to 50 lines)...\nLine breaks are automatically preserved.'
                  : 'Paste your prose piece here (600 to 700 words)...'
              }
              className="w-full rounded-2xl border border-storm-slate/20 bg-white/90 p-5 font-body text-sm leading-7 text-deep-ink placeholder:text-deep-ink/35 focus:border-storm-slate focus:bg-white focus:outline-none focus:ring-2 focus:ring-storm-slate/15"
            />

            {/* Helper guidance note under textarea */}
            <div className="mt-3 flex items-start gap-2 text-xs font-body text-deep-ink/65">
              <Info size={15} className="shrink-0 mt-0.5 text-storm-slate/60" />
              <span>
                {selectedGenreConfig.type === 'lines'
                  ? 'Lines are counted by non-empty verses. Ensure your poem falls cleanly between 40 and 50 lines.'
                  : 'Words are calculated automatically. Ensure your prose piece falls between 600 and 700 words.'}
              </span>
            </div>

            {touched.content && !formValues.content.trim() && (
              <p className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-600 font-body">
                <AlertCircle size={14} /> Please paste your work content above
              </p>
            )}
          </div>

          {/* Age Verification Checkbox */}
          <div className="mt-8 pt-6 border-t border-storm-slate/10">
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={formValues.ageVerified}
                onChange={(e) => handleChange('ageVerified', e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-storm-slate/30 text-storm-slate focus:ring-storm-slate"
              />
              <span className="font-body text-xs sm:text-sm leading-6 text-deep-ink/80">
                I certify that I am <strong>aged 25 or under</strong>, that this work is entirely my own original, unpublished writing in English, and that no AI generative tools were used in its creation.
              </span>
            </label>
            {touched.ageVerified && !formValues.ageVerified && (
              <p className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-600 font-body">
                <AlertCircle size={14} /> Confirmation of eligibility is required
              </p>
            )}
          </div>
        </div>

        {/* Global Error Banner */}
        {errorMessage && (
          <div className="flex items-center gap-3 rounded-2xl border border-rose-300 bg-rose-50/90 px-6 py-4 font-body text-sm text-rose-700">
            <AlertCircle size={18} className="shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Submit Actions */}
        <div className="text-center">
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-storm-slate px-10 py-4 font-body text-xs font-semibold uppercase tracking-[0.28em] text-white shadow-[0_20px_50px_-20px_rgba(44,74,110,0.8)] transition-all duration-300 hover:bg-deep-ink hover:shadow-[0_25px_60px_-20px_rgba(23,34,52,0.9)] disabled:opacity-50 cursor-pointer"
          >
            {status === 'submitting' ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Submitting Entry...
              </>
            ) : (
              <>
                <span>Submit to Soft Apocalypse India</span>
                <Sparkles size={16} className="transition-transform group-hover:rotate-12" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
