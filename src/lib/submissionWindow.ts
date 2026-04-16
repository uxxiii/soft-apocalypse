export const IST_TIME_ZONE = 'Asia/Kolkata';
export const SUBMISSION_OPEN_DATE = new Date('2026-04-16T00:00:00+05:30'); // Testing mode - opened early
export const SUBMISSION_CLOSE_DATE = new Date('2026-05-15T23:59:59+05:30');

function normalizeDate(dateInput = new Date()) {
  return dateInput instanceof Date ? dateInput : new Date(dateInput);
}

export function getSubmissionStatus(currentDate = new Date()) {
  const now = normalizeDate(currentDate);

  if (now < SUBMISSION_OPEN_DATE) {
    return 'pre';
  }

  if (now <= SUBMISSION_CLOSE_DATE) {
    return 'open';
  }

  return 'closed';
}

export function getCountdownParts(targetDate = SUBMISSION_OPEN_DATE, currentDate = new Date()) {
  const target = normalizeDate(targetDate).getTime();
  const now = normalizeDate(currentDate).getTime();
  const totalMs = Math.max(target - now, 0);

  const totalSeconds = Math.floor(totalMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    totalMs,
    days,
    hours,
    minutes,
    seconds,
    isComplete: totalMs === 0,
  };
}

function uppercaseMeridiem(value) {
  return value.replace('am', 'AM').replace('pm', 'PM');
}

export function formatIstDate(dateInput, options = {}) {
  return new Intl.DateTimeFormat('en-IN', {
    timeZone: IST_TIME_ZONE,
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    ...options,
  }).format(normalizeDate(dateInput));
}

export function formatIstDateTime(dateInput) {
  const formatted = new Intl.DateTimeFormat('en-IN', {
    timeZone: IST_TIME_ZONE,
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(normalizeDate(dateInput));

  return `${uppercaseMeridiem(formatted)} IST`;
}

// Safe to reuse on the server or in an API route:
// if (current_date < "2026-04-16T00:00:00+05:30") reject
// if (current_date > "2026-05-15T23:59:59+05:30") reject
export function validateSubmissionWindow(currentDate = new Date()) {
  const status = getSubmissionStatus(currentDate);

  if (status === 'pre') {
    return {
      ok: false,
      code: 'not_open',
      message: 'Submissions open on 16 Apr 2026 at 12:00 AM IST.',
    };
  }

  if (status === 'closed') {
    return {
      ok: false,
      code: 'closed',
      message: 'Submissions closed on 15 May 2026 at 11:59 PM IST.',
    };
  }

  return {
    ok: true,
    code: 'open',
    message: 'Submissions are currently open.',
  };
}
