import { useEffect, useMemo, useState } from 'react';
import { BellRing, CheckCircle2, CircleAlert, Info } from 'lucide-react';
import {
  getOneSignalSnapshot,
  registerOneSignalListeners,
  requestOneSignalPermission,
} from '../lib/oneSignal';

function resolveNotificationStatus(snapshot) {
  if (!snapshot.isSupported) {
    return 'unsupported';
  }

  if (snapshot.isSubscribed) {
    return 'subscribed';
  }

  if (snapshot.nativePermission === 'granted') {
    return 'success';
  }

  if (snapshot.nativePermission === 'denied') {
    return 'denied';
  }

  return 'ready';
}

const statusContent = {
  ready: {
    tone: 'border-storm-slate/12 bg-rain-mist/82 text-deep-ink',
    icon: Info,
    message: 'Allow notifications once and we will send a browser alert the moment submissions go live.',
  },
  success: {
    tone: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-700',
    icon: CheckCircle2,
    message: 'Notifications are enabled. We will notify you as soon as submissions open.',
  },
  subscribed: {
    tone: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-700',
    icon: CheckCircle2,
    message: 'You are already subscribed.',
  },
  denied: {
    tone: 'border-amber-500/20 bg-amber-500/10 text-amber-700',
    icon: CircleAlert,
    message: 'Notifications are blocked in this browser. You can re-enable them from your browser site settings.',
  },
  unsupported: {
    tone: 'border-storm-slate/12 bg-rain-mist/82 text-deep-ink',
    icon: CircleAlert,
    message: 'Push notifications are not supported in this browser or context.',
  },
  error: {
    tone: 'border-rose-500/20 bg-rose-500/10 text-rose-700',
    icon: CircleAlert,
    message: 'We could not reach OneSignal just now. Please refresh and try again.',
  },
};

export default function NotificationOptIn() {
  const [status, setStatus] = useState('ready');
  const [isChecking, setIsChecking] = useState(true);
  const [isRequesting, setIsRequesting] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function syncStatus() {
      try {
        const snapshot = await getOneSignalSnapshot();

        if (!isMounted) {
          return;
        }

        setStatus(resolveNotificationStatus(snapshot));
      } catch {
        if (!isMounted) {
          return;
        }

        setStatus('error');
      } finally {
        if (isMounted) {
          setIsChecking(false);
        }
      }
    }

    syncStatus();

    const unregisterListeners = registerOneSignalListeners({
      onPermissionChange: () => {
        syncStatus();
      },
      onSubscriptionChange: () => {
        syncStatus();
      },
    });

    return () => {
      isMounted = false;
      unregisterListeners();
    };
  }, []);

  const isActionLocked =
    isChecking ||
    isRequesting ||
    status === 'subscribed' ||
    status === 'success' ||
    status === 'denied' ||
    status === 'unsupported';

  const buttonLabel = useMemo(() => {
    if (isChecking) {
      return 'Checking...';
    }

    if (isRequesting) {
      return 'Enabling...';
    }

    if (status === 'subscribed') {
      return 'You are already subscribed';
    }

    if (status === 'success') {
      return 'Notifications enabled';
    }

    if (status === 'denied') {
      return 'Notifications blocked';
    }

    if (status === 'unsupported') {
      return 'Notifications unavailable';
    }

    return 'Enable Notifications';
  }, [isChecking, isRequesting, status]);

  const content = statusContent[status] ?? statusContent.ready;
  const StatusIcon = content.icon;

  async function handleEnableNotifications() {
    if (isActionLocked) {
      return;
    }

    setIsRequesting(true);

    try {
      const snapshot = await requestOneSignalPermission();
      setStatus(resolveNotificationStatus(snapshot));
    } catch {
      setStatus('error');
    } finally {
      setIsRequesting(false);
    }
  }

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/72 bg-white/72 p-7 shadow-[0_28px_90px_-64px_rgba(23,34,52,0.85)] backdrop-blur-xl sm:p-9">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(44,74,110,0.08),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(196,168,130,0.16),transparent_34%)]" />

      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <p className="font-body text-[0.68rem] uppercase tracking-[0.38em] text-storm-slate/58">
            Browser alerts
          </p>
          <h2 className="mt-4 font-heading text-4xl leading-[0.94] text-storm-slate sm:text-5xl">
            Get Notified When Submissions Open
          </h2>
          <p className="mt-4 font-body text-sm leading-7 text-deep-ink/72 sm:text-base">
            We&apos;ll notify you instantly when submissions open on April 16.
          </p>

          <div className={`mt-6 inline-flex max-w-xl items-start gap-3 rounded-[1.3rem] border px-4 py-3 font-body text-sm leading-6 ${content.tone}`}>
            <StatusIcon size={18} className="mt-0.5 shrink-0" />
            <span>{content.message}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleEnableNotifications}
          disabled={isActionLocked}
          className={`inline-flex min-w-[15rem] items-center justify-center gap-3 rounded-full px-6 py-3.5 font-body text-sm font-semibold uppercase tracking-[0.24em] transition-all duration-200 ${
            isActionLocked
              ? 'cursor-not-allowed bg-storm-slate/14 text-storm-slate/40'
              : 'bg-deep-ink text-rain-mist shadow-[0_20px_40px_-22px_rgba(23,34,52,0.82)] hover:-translate-y-0.5 hover:bg-storm-slate'
          }`}
        >
          <BellRing size={18} />
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}
