import React from 'react';
import { X, Printer, Download, FileText, CheckCircle2, ShieldCheck, Building2 } from 'lucide-react';
import { Language, translations } from '../i18n/translations';

interface PdfPreviewModalProps {
  pdfUrl: string | null;
  pdfTitle: string;
  lang: Language;
  onClose: () => void;
}

export const PdfPreviewModal: React.FC<PdfPreviewModalProps> = ({
  pdfUrl,
  pdfTitle,
  lang,
  onClose
}) => {
  if (!pdfUrl) return null;

  const t = translations[lang];

  const handleDownload = () => {
    // Record download hit
    fetch('/api/download-count', { method: 'POST' }).catch(() => {});

    // Create a Blob file simulation for instant clean download
    const content = `==========================================================\nSHREE SURYODAYA SECONDARY SCHOOL (श्री सूर्योदय माध्यमिक विद्यालय)\nRUNTIGADI-4-MASINA ROLPA, Nepal | EST 2016\nHelpline: +977-97XXXXXXXX\n==========================================================\n\nOFFICIAL DOCUMENT: ${pdfTitle}\n\nDocument Reference ID: SURY-${Math.floor(Math.random() * 90000 + 10000)}\nDate Issued: 2081/06/04 BS (2026-09-20 AD)\nApproved By: Examination Controller & Principal Office\n\n[This is an official document issued by Shree Suryodaya Secondary School]\n==========================================================`;

    const blob = new Blob([content], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = pdfTitle.endsWith('.pdf') ? pdfTitle : `${pdfTitle}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-100 w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-300 overflow-hidden my-6 max-h-[92vh] flex flex-col">
        {/* Top Control Bar */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-600 text-white">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-white truncate max-w-xs sm:max-w-md">
                {pdfTitle}
              </h3>
              <p className="text-xs text-slate-400">Official School Document Viewer</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition cursor-pointer shadow"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs px-3.5 py-2 rounded-xl border border-slate-700 transition cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Paper Area */}
        <div className="p-6 sm:p-10 overflow-y-auto flex-1 bg-slate-200/60 flex justify-center">
          <div className="bg-white w-full max-w-2xl p-8 sm:p-12 shadow-2xl rounded-2xl border border-slate-300 space-y-6 print-card text-slate-900 font-sans relative">
            {/* Watermark stamp */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
              <GraduationCap className="w-72 h-72 text-blue-900" />
            </div>

            {/* Official Letterhead Header */}
            <div className="text-center border-b-2 border-blue-900 pb-6 space-y-1">
              <p className="text-xs font-bold text-amber-600 uppercase tracking-widest">
                नेपाल सरकार • शिक्षा मन्त्रालय सम्बन्धन प्राप्त
              </p>
              <h1 className="text-xl sm:text-2xl font-black text-blue-950 uppercase tracking-tight">
                SHREE SURYODAYA SECONDARY SCHOOL
              </h1>
              <h2 className="text-base font-bold text-slate-800">
                श्री सूर्योदय माध्यमिक विद्यालय
              </h2>
              <p className="text-xs text-slate-600 font-medium">
                RUNTIGADI-4-MASINA ROLPA, Nepal | EST 2016 • Helpline: +977-97XXXXXXXX
              </p>
              <div className="flex items-center justify-between text-xs text-slate-500 font-semibold pt-3">
                <span>प.सं. (Ref): 2081/082/SURY-49</span>
                <span>मिति (Date): २०८१/०६/०४</span>
              </div>
            </div>

            {/* Document Title Banner */}
            <div className="bg-slate-100 p-4 rounded-xl border border-slate-200 text-center">
              <h3 className="text-lg font-extrabold text-blue-950">
                {pdfTitle.toUpperCase()}
              </h3>
              <p className="text-xs text-slate-600 font-medium mt-1">
                Official Examination Routine & Academic Guidelines
              </p>
            </div>

            {/* Simulated Document Table / Body */}
            <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-800">
              <p>
                This document serves as the official publication from the Office of the Examination Controller and Principal's Desk of Shree Suryodaya Secondary School.
              </p>

              {/* Sample Timetable Grid */}
              <div className="border border-slate-300 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-900 text-white font-bold">
                      <th className="p-2.5 border-r border-slate-800">Date (BS)</th>
                      <th className="p-2.5 border-r border-slate-800">Day</th>
                      <th className="p-2.5 border-r border-slate-800">Grade 10 Subject</th>
                      <th className="p-2.5">Grade 8 Subject</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr className="hover:bg-slate-50">
                      <td className="p-2.5 font-bold border-r">२०८१ असोज १५</td>
                      <td className="p-2.5 border-r">मंगलवार</td>
                      <td className="p-2.5 border-r font-medium">Compulsory English</td>
                      <td className="p-2.5 font-medium">Compulsory Nepali</td>
                    </tr>
                    <tr className="hover:bg-slate-50 bg-slate-50/50">
                      <td className="p-2.5 font-bold border-r">२०८१ असोज १६</td>
                      <td className="p-2.5 border-r">बुधवार</td>
                      <td className="p-2.5 border-r font-medium">Compulsory Nepali</td>
                      <td className="p-2.5 font-medium">Compulsory English</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-2.5 font-bold border-r">२०८१ असोज १७</td>
                      <td className="p-2.5 border-r">बिहीवार</td>
                      <td className="p-2.5 border-r font-medium text-blue-900 font-bold">Compulsory Mathematics</td>
                      <td className="p-2.5 font-medium text-blue-900 font-bold">Science & Technology</td>
                    </tr>
                    <tr className="hover:bg-slate-50 bg-slate-50/50">
                      <td className="p-2.5 font-bold border-r">२०८१ असोज १८</td>
                      <td className="p-2.5 border-r">शुक्रवार</td>
                      <td className="p-2.5 border-r font-medium text-blue-900 font-bold">Science & Technology</td>
                      <td className="p-2.5 font-medium text-blue-900 font-bold">Compulsory Mathematics</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-2.5 font-bold border-r">२०८१ असोज १९</td>
                      <td className="p-2.5 border-r">आइतवार</td>
                      <td className="p-2.5 border-r font-medium">Social Studies</td>
                      <td className="p-2.5 font-medium">Social Studies & Population</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-amber-50 p-3.5 rounded-xl border border-amber-200 text-amber-900 text-xs font-medium space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-700" />
                  <span>Important Instructions for Examinees:</span>
                </p>
                <ul className="list-disc list-inside space-y-0.5 pl-1">
                  <li>Examination timing: 11:00 AM to 2:00 PM precisely.</li>
                  <li>School uniform and official admit card are strictly mandatory.</li>
                  <li>Electronic devices and smartphones are strictly prohibited inside the hall.</li>
                </ul>
              </div>
            </div>

            {/* Official Signatures */}
            <div className="pt-10 flex items-center justify-between text-xs text-slate-800 border-t border-slate-200">
              <div className="text-center">
                <div className="w-32 border-b border-slate-400 mb-1"></div>
                <p className="font-bold">Sita Adhikari</p>
                <p className="text-slate-500">Exam Controller</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-blue-900/40 flex items-center justify-center text-[10px] text-blue-900 font-bold text-center leading-tight">
                  OFFICIAL<br/>SEAL
                </div>
              </div>

              <div className="text-center">
                <div className="w-32 border-b border-slate-400 mb-1"></div>
                <p className="font-bold">Ram Bahadur Thapa</p>
                <p className="text-slate-500">Principal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function GraduationCap(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
      <path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
  );
}
