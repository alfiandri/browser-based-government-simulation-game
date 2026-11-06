'use client';

import React, { useEffect } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { Bell, X } from 'lucide-react';

export function NotificationToast() {
  const notifications = useGameStore((state) => state.notifications);
  const dismissNotification = useGameStore((state) => state.dismissNotification);

  // Auto dismiss oldest after 7 seconds
  useEffect(() => {
    if (notifications.length === 0) return;
    const oldest = notifications[notifications.length - 1];
    const timer = setTimeout(() => {
      dismissNotification(oldest.id);
    }, 7000);
    return () => clearTimeout(timer);
  }, [notifications, dismissNotification]);

  if (notifications.length === 0) return null;

  return (
    <div className="absolute bottom-20 right-4 z-30 pointer-events-none flex flex-col gap-2 max-w-sm w-full">
      {notifications.map((notif) => (
        <div
          key={notif.id}
          className="pointer-events-auto flex items-start gap-3 bg-slate-900/95 backdrop-blur-md border border-amber-500/40 p-3 rounded-xl shadow-2xl animate-in slide-in-from-right duration-200"
        >
          <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 mt-0.5">
            <Bell className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-amber-300 leading-tight">{notif.title}</h4>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">{notif.message}</p>
          </div>
          <button
            onClick={() => dismissNotification(notif.id)}
            className="text-slate-400 hover:text-white p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}

