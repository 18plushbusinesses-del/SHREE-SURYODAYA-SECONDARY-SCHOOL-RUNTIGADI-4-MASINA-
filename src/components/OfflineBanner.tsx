import React from 'react';
import { WifiOff } from 'lucide-react';
import { Language, translations } from '../i18n/translations';

interface OfflineBannerProps {
  isOffline: boolean;
  lang: Language;
}

export const OfflineBanner: React.FC<OfflineBannerProps> = ({ isOffline, lang }) => {
  if (!isOffline) return null;

  const t = translations[lang];

  return (
    <div className="bg-amber-600 text-white px-4 py-2 flex items-center justify-center gap-3 text-sm font-medium shadow-md animate-pulse">
      <WifiOff className="w-5 h-5 flex-shrink-0" />
      <span>
        <strong>{t.offlineMode}:</strong> {t.offlineNoticeMsg}
      </span>
    </div>
  );
};
