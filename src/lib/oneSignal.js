function queueOneSignalAction(action) {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('OneSignal is only available in the browser.'));
  }

  window.OneSignalDeferred = window.OneSignalDeferred || [];

  return new Promise((resolve, reject) => {
    window.OneSignalDeferred.push(async (OneSignal) => {
      try {
        const result = await action(OneSignal);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  });
}

export function getOneSignalSnapshot() {
  return queueOneSignalAction(async (OneSignal) => {
    const isSupported = OneSignal.Notifications.isPushSupported();
    const nativePermission =
      typeof window.Notification !== 'undefined'
        ? window.Notification.permission
        : 'default';

    return {
      isSupported,
      isSubscribed: isSupported && Boolean(OneSignal.User.PushSubscription.optedIn),
      nativePermission,
    };
  });
}

export async function requestOneSignalPermission() {
  return queueOneSignalAction(async (OneSignal) => {
    await OneSignal.Notifications.requestPermission();

    if (
      typeof window.Notification !== 'undefined' &&
      window.Notification.permission === 'granted' &&
      !OneSignal.User.PushSubscription.optedIn
    ) {
      await OneSignal.User.PushSubscription.optIn();
    }

    const nativePermission =
      typeof window.Notification !== 'undefined'
        ? window.Notification.permission
        : 'default';

    return {
      isSupported: OneSignal.Notifications.isPushSupported(),
      isSubscribed: Boolean(OneSignal.User.PushSubscription.optedIn),
      nativePermission,
    };
  });
}

export function registerOneSignalListeners({ onPermissionChange, onSubscriptionChange }) {
  if (typeof window === 'undefined') {
    return () => {};
  }

  let cleanup = () => {};
  let isDisposed = false;

  window.OneSignalDeferred = window.OneSignalDeferred || [];
  window.OneSignalDeferred.push((OneSignal) => {
    if (isDisposed) {
      return;
    }

    if (onPermissionChange) {
      OneSignal.Notifications.addEventListener('permissionChange', onPermissionChange);
    }

    if (onSubscriptionChange) {
      OneSignal.User.PushSubscription.addEventListener('change', onSubscriptionChange);
    }

    cleanup = () => {
      if (onPermissionChange) {
        OneSignal.Notifications.removeEventListener('permissionChange', onPermissionChange);
      }

      if (onSubscriptionChange) {
        OneSignal.User.PushSubscription.removeEventListener('change', onSubscriptionChange);
      }
    };
  });

  return () => {
    isDisposed = true;
    cleanup();
  };
}
