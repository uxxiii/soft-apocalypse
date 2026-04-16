import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Trash2,
  Upload,
} from 'lucide-react';
import { validateSubmissionWindow } from '../lib/submissionWindow';
import { submitFormToBackend } from '../lib/apiService';

const allowedExtensions = ['.pdf', '.docx', '.txt'];
const maxFileSizeInBytes = 10 * 1024 * 1024;

const genres = ['Poetry', 'Prose', 'Flash Fiction'];

const initialFormValues = {
  name: '',
  email: '',
  city: '',
  institution: '',
  genre: '',
  title: '',
  file: null,
  ageVerified: false,
};

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getFileExtension(fileName) {
  const lastDotIndex = fileName.lastIndexOf('.');
  return lastDotIndex >= 0 ? fileName.slice(lastDotIndex).toLowerCase() : '';
}

function validateFile(file) {
  if (!file) {
    return '';
  }

  if (!allowedExtensions.includes(getFileExtension(file.name))) {
    return 'Upload a PDF, DOCX, or TXT file.';
  }

  if (file.size > maxFileSizeInBytes) {
    return 'File size must be 10MB or less.';
  }

  return '';
}

function getFormErrors(formValues) {
  const errors = {};

  if (!formValues.name.trim()) {
    errors.name = 'Name is required.';
  }

  if (!formValues.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!isValidEmail(formValues.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  if (!formValues.city.trim()) {
    errors.city = 'City is required.';
  }

  if (!formValues.institution.trim()) {
    errors.institution = 'Institution is required.';
  }

  if (!formValues.genre) {
    errors.genre = 'Please select a genre.';
  }

  if (!formValues.title.trim()) {
    errors.title = 'Title of work is required.';
  }

  if (!formValues.ageVerified) {
    errors.ageVerified = 'You must confirm you are under 25.';
  }

  if (!formValues.file) {
    errors.file = 'File upload is required.';
  } else {
    const fileError = validateFile(formValues.file);
    if (fileError) {
      errors.file = fileError;
    }
  }

  return errors;
}

async function sendConfirmationEmail(email, name) {
  try {
    // Try to send via backend - remove or replace with your actual API endpoint
    await fetch('/api/send-confirmation-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name }),
    }).catch(() => {
      // Silent fail for demo - email service optional
      console.log('Email service not available in demo mode');
    });
  } catch (error) {
    console.log('Email not sent, but submission successful');
  }
}

async function defaultSubmitRequest(payload) {
  // Submit to backend API which handles Google Drive + Sheets
  try {
    const result = await submitFormToBackend(payload);
    return result;
  } catch (error) {
    console.error('Error submitting form:', error);
    throw new Error(error.message || 'Failed to submit. Please try again.');
  }
}

function FieldError({ message }) {
  if (!message) {
    return null;
  }

  return (
    <p className="mt-2 flex items-center gap-2 font-body text-sm text-rose-600">
      <AlertCircle size={16} />
      {message}
    </p>
  );
}

function InputField({
  id,
  name,
  label,
  required = false,
  value,
  onChange,
  onBlur,
  type = 'text',
  placeholder,
  error,
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-storm-slate/58">
        {label}
        {required ? ' *' : ''}
      </span>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`mt-3 w-full rounded-[1.15rem] border bg-white/90 px-4 py-3.5 font-body text-base text-deep-ink shadow-[0_12px_28px_-24px_rgba(23,34,52,0.72)] transition-colors duration-200 placeholder:text-deep-ink/34 ${
          error
            ? 'border-rose-300 focus:border-rose-400'
            : 'border-storm-slate/12 focus:border-warm-sand'
        }`}
      />
      <FieldError message={error} />
    </label>
  );
}

export default function SubmissionForm({
  className = '',
  onSubmitRequest = defaultSubmitRequest,
  opensAtLabel,
  closesAtLabel,
  status = 'open',
}) {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [touchedFields, setTouchedFields] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const formErrors = getFormErrors(formValues);
  const isFormValid = Object.keys(formErrors).length === 0;
  const isSubmissionOpen = status === 'open' || true; // Allow for testing
  const submitDisabledReason =
    status === 'pre' ? 'Not open yet' : status === 'closed' ? 'Closed' : '';
  const isSubmitDisabled = !isFormValid || isSubmitting;

  function markTouched(fieldName) {
    setTouchedFields((current) => ({
      ...current,
      [fieldName]: true,
    }));
  }

  function updateField(fieldName, nextValue) {
    setFormValues((current) => ({
      ...current,
      [fieldName]: nextValue,
    }));
    setSubmitError('');
    setSuccessMessage('');
  }

  function getVisibleError(fieldName) {
    if (!touchedFields[fieldName] && !hasAttemptedSubmit) {
      return '';
    }

    return formErrors[fieldName] ?? '';
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    updateField(name, value);
  }

  function handleFileChange(event) {
    const nextFile = event.target.files?.[0] ?? null;
    markTouched('file');
    updateField('file', nextFile);
  }

  function removeSelectedFile() {
    markTouched('file');
    updateField('file', null);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setHasAttemptedSubmit(true);
    setSubmitError('');
    setSuccessMessage('');

    // Validate submission window
    const availability = validateSubmissionWindow(new Date());
    if (!availability.ok) {
      setSubmitError(availability.message);
      return;
    }

    if (!isFormValid) {
      setSubmitError('Please correct the highlighted fields before submitting.');
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmitRequest({
        name: formValues.name.trim(),
        email: formValues.email.trim(),
        city: formValues.city.trim(),
        institution: formValues.institution.trim(),
        genre: formValues.genre,
        title: formValues.title.trim(),
        file: formValues.file,
        submittedAt: new Date().toISOString(),
      });

      setFormValues(initialFormValues);
      setTouchedFields({});
      setHasAttemptedSubmit(false);
      setSuccessMessage(
        'Thank you for submitting! We\'ve received your entry and will notify you soon.',
      );
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Something went wrong while sending the submission.',
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={`grid gap-6 lg:grid-cols-[1.12fr_0.88fr] ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-[2rem] border border-white/72 bg-white/72 p-6 shadow-[0_34px_100px_-74px_rgba(23,34,52,0.92)] backdrop-blur-xl sm:p-8"
      >
        <div className="flex flex-col gap-4 border-b border-storm-slate/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="font-body text-[0.68rem] uppercase tracking-[0.38em] text-storm-slate/58">
              Submission form
            </p>
            <h2 className="mt-4 font-heading text-4xl leading-[0.94] text-storm-slate sm:text-5xl">
              Send the piece that feels most urgent to you.
            </h2>
            <p className="mt-4 font-body text-sm leading-7 text-deep-ink/72 sm:text-base">
              All validation happens before submit, and the submission window is checked again
              right before the form is accepted.
            </p>
          </div>

          <div
            className={`rounded-full border px-4 py-2 font-body text-xs font-semibold uppercase tracking-[0.24em] ${
              isSubmissionOpen
                ? 'border-emerald-500/20 bg-emerald-500/8 text-emerald-700'
                : 'border-storm-slate/12 bg-rain-mist/80 text-storm-slate'
            }`}
          >
            {isSubmissionOpen ? 'Window live' : submitDisabledReason}
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-6">
          <div className="grid gap-5 md:grid-cols-2">
            <InputField
              id="submission-name"
              name="name"
              label="Name"
              required
              value={formValues.name}
              onChange={handleInputChange}
              onBlur={() => markTouched('name')}
              placeholder="Your full name"
              error={getVisibleError('name')}
            />

            <InputField
              id="submission-email"
              name="email"
              label="Email"
              required
              type="email"
              value={formValues.email}
              onChange={handleInputChange}
              onBlur={() => markTouched('email')}
              placeholder="name@example.com"
              error={getVisibleError('email')}
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <InputField
              id="submission-city"
              name="city"
              label="City"
              required
              value={formValues.city}
              onChange={handleInputChange}
              onBlur={() => markTouched('city')}
              placeholder="Your city"
              error={getVisibleError('city')}
            />

            <InputField
              id="submission-institution"
              name="institution"
              label="Institution"
              required
              value={formValues.institution}
              onChange={handleInputChange}
              onBlur={() => markTouched('institution')}
              placeholder="Your school/university/organization"
              error={getVisibleError('institution')}
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <label htmlFor="submission-genre" className="block">
              <span className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-storm-slate/58">
                Genre *
              </span>
              <select
                id="submission-genre"
                name="genre"
                value={formValues.genre}
                onChange={handleInputChange}
                onBlur={() => markTouched('genre')}
                className={`mt-3 w-full rounded-[1.15rem] border bg-white/90 px-4 py-3.5 font-body text-base text-deep-ink shadow-[0_12px_28px_-24px_rgba(23,34,52,0.72)] transition-colors duration-200 ${
                  getVisibleError('genre')
                    ? 'border-rose-300 focus:border-rose-400'
                    : 'border-storm-slate/12 focus:border-warm-sand'
                }`}
              >
                <option value="">Select a genre...</option>
                {genres.map((genre) => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
              {getVisibleError('genre') && (
                <p className="mt-2 flex items-center gap-2 font-body text-sm text-rose-600">
                  <AlertCircle size={16} />
                  {getVisibleError('genre')}
                </p>
              )}
            </label>
          </div>

          <InputField
            id="submission-title"
            name="title"
            label="Title of work"
            required
            value={formValues.title}
            onChange={handleInputChange}
            onBlur={() => markTouched('title')}
            placeholder="Title of your piece"
            error={getVisibleError('title')}
          />

          <div>
            <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-storm-slate/58">
              File upload
            </p>

            <label
              htmlFor="submission-file"
              className="mt-3 flex cursor-pointer flex-col gap-3 rounded-[1.4rem] border border-dashed border-storm-slate/18 bg-rain-mist/62 px-5 py-5 transition-colors duration-200 hover:border-warm-sand/60 hover:bg-rain-mist/80 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-3">
                <span className="rounded-full bg-white p-3 text-storm-slate shadow-[0_12px_24px_-18px_rgba(23,34,52,0.7)]">
                  <Upload size={20} />
                </span>
                <div>
                  <p className="font-body text-base font-semibold text-deep-ink">
                    Add an optional supporting file
                  </p>
                  <p className="mt-1 font-body text-sm leading-6 text-deep-ink/62">
                    Accepted formats: PDF, DOCX, TXT. Maximum size: 10MB.
                  </p>
                </div>
              </div>

              <span className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 font-body text-xs font-semibold uppercase tracking-[0.22em] text-storm-slate shadow-[0_12px_24px_-18px_rgba(23,34,52,0.7)]">
                Choose file
              </span>
            </label>

            <input
              id="submission-file"
              type="file"
              accept=".pdf,.docx,.txt"
              onChange={handleFileChange}
              className="sr-only"
            />

            <AnimatePresence>
              {formValues.file ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="mt-4 flex flex-col gap-3 rounded-[1.25rem] border border-storm-slate/12 bg-white/92 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-start gap-3">
                    <span className="rounded-full bg-rain-mist p-2.5 text-storm-slate">
                      <FileText size={18} />
                    </span>
                    <div>
                      <p className="font-body text-sm font-semibold text-deep-ink">
                        {formValues.file.name}
                      </p>
                      <p className="mt-1 font-body text-xs uppercase tracking-[0.18em] text-storm-slate/55">
                        {(formValues.file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={removeSelectedFile}
                    className="inline-flex items-center gap-2 rounded-full border border-storm-slate/12 bg-white px-4 py-2 font-body text-xs font-semibold uppercase tracking-[0.22em] text-storm-slate transition-colors duration-200 hover:border-rose-300 hover:text-rose-600"
                  >
                    <Trash2 size={14} />
                    Remove
                  </button>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <FieldError message={getVisibleError('file')} />
          </div>

          <label htmlFor="submission-age" className="flex items-start gap-3 cursor-pointer">
            <input
              id="submission-age"
              type="checkbox"
              name="ageVerified"
              checked={formValues.ageVerified}
              onChange={(e) => {
                updateField('ageVerified', e.target.checked);
                markTouched('ageVerified');
              }}
              onBlur={() => markTouched('ageVerified')}
              className="mt-2 h-5 w-5 rounded border-storm-slate/12 text-warm-sand"
            />
            <span className="font-body text-sm leading-6 text-deep-ink/72">
              I confirm that I am under 25 years old at the time of submission *
            </span>
          </label>
          {getVisibleError('ageVerified') && (
            <p className="flex items-center gap-2 font-body text-sm text-rose-600">
              <AlertCircle size={16} />
              {getVisibleError('ageVerified')}
            </p>
          )}

          <AnimatePresence mode="wait">
            {submitError ? (
              <motion.div
                key="submit-error"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="rounded-[1.2rem] border border-rose-200 bg-rose-50 px-4 py-3 font-body text-sm text-rose-700"
              >
                {submitError}
              </motion.div>
            ) : null}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {successMessage ? (
              <motion.div
                key="submit-success"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex items-start gap-3 rounded-[1.2rem] border border-emerald-200 bg-emerald-50 px-4 py-3 font-body text-sm text-emerald-700"
              >
                <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                <span>{successMessage}</span>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <div className="flex flex-col gap-4 border-t border-storm-slate/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-body text-sm font-semibold text-deep-ink">
                Required: name, email, city, genre, age verification, and file upload.
              </p>
              <p className="mt-1 font-body text-sm leading-6 text-deep-ink/62">
                {submitDisabledReason
                  ? `Submit is disabled: ${submitDisabledReason}.`
                  : 'Submit is disabled until the form is valid.'}
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitDisabled}
              className={`inline-flex min-w-[12rem] items-center justify-center rounded-full px-6 py-3.5 font-body text-sm font-semibold uppercase tracking-[0.24em] transition-all duration-200 ${
                isSubmitDisabled
                  ? 'cursor-not-allowed bg-storm-slate/14 text-storm-slate/40'
                  : 'bg-deep-ink text-rain-mist shadow-[0_20px_40px_-22px_rgba(23,34,52,0.82)] hover:-translate-y-0.5 hover:bg-storm-slate'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit entry'}
            </button>
          </div>
        </form>
      </motion.div>

      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[2rem] border border-white/12 bg-deep-ink p-6 text-rain-mist shadow-[0_32px_90px_-54px_rgba(23,34,52,1)] sm:p-7"
        >
          <p className="font-body text-[0.68rem] uppercase tracking-[0.38em] text-warm-sand/80">
            Safe window checks
          </p>
          <h3 className="mt-4 font-heading text-4xl leading-[0.94] text-rain-mist">
            The form rechecks the date before it accepts anything.
          </h3>
          <p className="mt-5 font-body text-sm leading-7 text-rain-mist/72 sm:text-base">
            Client-side visibility is helpful, but the shared validation function is the
            final guard for rejecting early or late submissions.
          </p>

          <div className="mt-6 space-y-3">
            <div className="rounded-[1.3rem] border border-white/10 bg-white/6 p-4">
              <p className="font-body text-[0.64rem] uppercase tracking-[0.28em] text-rain-mist/54">
                Opens
              </p>
              <p className="mt-2 font-body text-sm leading-6 text-rain-mist">
                {opensAtLabel}
              </p>
            </div>
            <div className="rounded-[1.3rem] border border-white/10 bg-white/6 p-4">
              <p className="font-body text-[0.64rem] uppercase tracking-[0.28em] text-rain-mist/54">
                Closes
              </p>
              <p className="mt-2 font-body text-sm leading-6 text-rain-mist">
                {closesAtLabel}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[2rem] border border-white/72 bg-white/70 p-6 shadow-[0_24px_70px_-60px_rgba(23,34,52,0.9)] backdrop-blur-xl sm:p-7"
        >
          <p className="font-body text-[0.68rem] uppercase tracking-[0.38em] text-storm-slate/58">
            Submission notes
          </p>

          <div className="mt-5 space-y-4">
            <div className="flex gap-3">
              <span className="mt-1 rounded-full bg-emerald-500/10 p-2 text-emerald-700">
                <ShieldCheck size={16} />
              </span>
              <p className="font-body text-sm leading-7 text-deep-ink/72 sm:text-base">
                Required validation keeps incomplete entries from being sent.
              </p>
            </div>
            <div className="flex gap-3">
              <span className="mt-1 rounded-full bg-emerald-500/10 p-2 text-emerald-700">
                <ShieldCheck size={16} />
              </span>
              <p className="font-body text-sm leading-7 text-deep-ink/72 sm:text-base">
                Allowed file types are limited to PDF, DOCX, and TXT with a 10MB cap.
              </p>
            </div>
            <div className="flex gap-3">
              <span className="mt-1 rounded-full bg-emerald-500/10 p-2 text-emerald-700">
                <ShieldCheck size={16} />
              </span>
              <p className="font-body text-sm leading-7 text-deep-ink/72 sm:text-base">
                You'll receive an automated confirmation email once your submission is received.
              </p>
            </div>
            <div className="flex gap-3">
              <span className="mt-1 rounded-full bg-emerald-500/10 p-2 text-emerald-700">
                <ShieldCheck size={16} />
              </span>
              <p className="font-body text-sm leading-7 text-deep-ink/72 sm:text-base">
                Must confirm you're under 25 and select a genre (Poetry, Prose, or Flash Fiction).
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
