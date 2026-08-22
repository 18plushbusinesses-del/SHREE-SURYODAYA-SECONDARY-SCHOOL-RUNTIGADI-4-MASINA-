import React, { useState } from 'react';
import { FileText, Download, Search, FileCheck, ArrowDownToLine } from 'lucide-react';
import { DocumentItem } from '../types';
import { Language, translations } from '../i18n/translations';

interface DocumentResourcesSectionProps {
  documents: DocumentItem[];
  lang: Language;
  onOpenPdf: (url: string, title: string) => void;
}

export const DocumentResourcesSection: React.FC<DocumentResourcesSectionProps> = ({
  documents,
  lang,
  onOpenPdf
}) => {
  const [docQuery, setDocQuery] = useState('');
  const t = translations[lang];

  const filteredDocs = documents.filter((doc) => {
    const title = lang === 'np' ? doc.title_np : doc.title_en;
    return title.toLowerCase().includes(docQuery.toLowerCase()) || doc.category.includes(docQuery.toLowerCase());
  });

  return (
    <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 my-10 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {t.documentsTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Official curriculum, examination syllabi, routines, and admission guidelines in downloadable PDF format.
          </p>
        </div>

        {/* Document Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={docQuery}
            onChange={(e) => setDocQuery(e.target.value)}
            placeholder="Search documents..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-50"
          />
        </div>
      </div>

      {/* Table List */}
      <div className="space-y-3">
        {filteredDocs.map((doc) => {
          const title = lang === 'np' ? doc.title_np : doc.title_en;

          return (
            <div
              key={doc.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-blue-50/50 border border-slate-200 hover:border-blue-200 transition"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-blue-600 text-white shadow">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">{title}</h4>
                  <div className="flex items-center gap-3 text-xs text-slate-500 font-medium mt-0.5">
                    <span>PDF • {doc.fileSize}</span>
                    <span>•</span>
                    <span>Uploaded: {doc.uploadDate}</span>
                    <span>•</span>
                    <span className="text-blue-700 font-semibold">{doc.downloadCount} downloads</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onOpenPdf(doc.url, title)}
                className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow transition cursor-pointer flex-shrink-0"
              >
                <Download className="w-4 h-4" />
                <span>{t.downloadNow}</span>
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};
