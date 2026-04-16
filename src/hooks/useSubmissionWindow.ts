import { useEffect, useState } from 'react';
import {
  IST_TIME_ZONE,
  SUBMISSION_CLOSE_DATE,
  SUBMISSION_OPEN_DATE,
  formatIstDateTime,
  getSubmissionStatus,
  validateSubmissionWindow,
} from '../lib/submissionWindow';

export default function useSubmissionWindow() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  const status = getSubmissionStatus(now);
  const validation = validateSubmissionWindow(now);

  return {
    now,
    status,
    validation,
    opensAt: SUBMISSION_OPEN_DATE,
    closesAt: SUBMISSION_CLOSE_DATE,
    opensAtLabel: formatIstDateTime(SUBMISSION_OPEN_DATE),
    closesAtLabel: formatIstDateTime(SUBMISSION_CLOSE_DATE),
    timeZone: IST_TIME_ZONE,
    isBeforeOpen: status === 'pre',
    isOpen: status === 'open',
    isClosed: status === 'closed',
  };
}
