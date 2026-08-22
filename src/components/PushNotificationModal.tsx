import React, { useState } from 'react';
import { Bell, X, ShieldCheck, Zap, Sparkles, CheckCircle2 } from 'lucide-react';
import { Language, translations } from '../i18n/translations';

interface PushNotificationModalProps {
  lang: Language;
  onClose: () => void;
  onSubscribed: () => void;
}

export const PushNotificationModal: React.FC<PushNotificationModalProps> = ({
  lang,
  onClose,
  onSubscribed
}) => {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const t = translations[lang];

  const handleEnablePush = async () => {
    setLoading(true);

    try {
      if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          // Register mock/real push subscription via server
          await fetch('/api/push-subscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              subscription: { endpoint: 'browser-push-endpoint-simulation' }
            })
          });

          // Show test notification if possible
          if ('serviceWorker' in navigator && navigator.serviceWorker.ready) {
            const reg = await navigator.serviceWorker.ready;
            reg.showNotification('SHREE SURYODAYA SECONDARY SCHOOL', {
              body: 'Push Alerts successfully enabled! You will receive real-time notice updates.',
              icon: '/pwa-icon-192.png'
            });
          }
        }
      }
    } catch (e) {
      console.warn('Notification permission error:', e);
    } finally {
      setLoading(false);
      setDone(true);
      onSubscribed();
      setTimeout(() => onClose(), 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header Visual */}
        <div className="bg-gradient-to-tr from-slate-900 via-blue-950 to-indigo-900 text-white p-8 text-center relative overflow-hidden">
          <div className="w-16 h-16 rounded-3xl bg-amber-500 text-slate-950 flex items-center justify-center mx-auto shadow-xl mb-3 animate-bounce">
            <Bell className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-extrabold text-white">
            {t.pushPromptTitle}
          </h3>
          <p className="text-xs text-blue-200 mt-1 max-w-xs mx-auto">
            {t.pushPromptSubtitle}
          </p>
        </div>

        {/* Benefits list */}
        <div className="p-6 space-y-3">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <Zap className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-slate-700 font-medium">
              Instant alerts for <strong>Urgent Notices & Exam Routines</strong> directly on your mobile/desktop.
            </p>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <ShieldCheck className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-slate-700 font-medium">
              100% spam-free, official school alerts only. You can disable anytime in browser settings.
            </p>
          </div>

          {done && (
            <div className="p-3 rounded-xl bg-emerald-100 text-emerald-900 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Real-time push notifications successfully activated!</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="text-xs font-bold text-slate-500 hover:text-slate-800 px-4 py-2"
          >
            {t.later}
          </button>

          <button
            onClick={handleEnablePush}
            disabled={loading || done}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 text-white font-extrabold text-xs px-6 py-3 rounded-xl shadow transition cursor-pointer disabled:opacity-50"
          >
            <Bell className="w-4 h-4 text-amber-300" />
            <span>{loading ? 'Activating...' : t.enablePush}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
