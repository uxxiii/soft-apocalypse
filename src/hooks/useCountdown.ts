import { useEffect, useState } from 'react';
import { getCountdownParts, SUBMISSION_OPEN_DATE } from '../lib/submissionWindow';

export default function useCountdown(targetDate = SUBMISSION_OPEN_DATE) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const resolvedTargetDate =
      targetDate instanceof Date ? targetDate : new Date(targetDate);
    const targetTimestamp = resolvedTargetDate.getTime();

    if (Date.now() >= targetTimestamp) {
      setNow(new Date());
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      const nextNow = new Date();
      setNow(nextNow);

      if (nextNow.getTime() >= targetTimestamp) {
        window.clearInterval(intervalId);
      }
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [targetDate]);

  return {
    now,
    targetDate,
    ...getCountdownParts(targetDate, now),
  };
}
