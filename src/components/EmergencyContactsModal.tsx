import React, { useState } from 'react';
import { X, Phone, Building, UserCheck, Bus, CreditCard, HeartPulse, Copy, Check, Mail } from 'lucide-react';
import { Language, translations } from '../i18n/translations';

interface EmergencyContactsModalProps {
  lang: Language;
  onClose: () => void;
}

export const EmergencyContactsModal: React.FC<EmergencyContactsModalProps> = ({
  lang,
  onClose
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const t = translations[lang];

  const contacts = [
    {
      id: 'c0',
      title: lang === 'np' ? "मुख्य विद्यालय सम्पर्क नम्बर" : "Main School Contact Number",
      person: "SHREE SURYODAYA SECONDARY SCHOOL (Runtigadi-4, Masina, Rolpa)",
      phone: "+977-9704227689",
      icon: Phone,
      color: "bg-amber-600 ring-2 ring-amber-400"
    },
    {
      id: 'c_email',
      title: lang === 'np' ? "आधिकारिक विद्यालय इमेल" : "Official School Email Address",
      person: "Administration & Information Desk",
      phone: "bhapuma.official@gmail.com",
      isEmail: true,
      icon: Mail,
      color: "bg-blue-700"
    },
    {
      id: 'c1',
      title: t.principalOffice,
      person: "Principal Office Desk",
      phone: "+977-9704227689",
      icon: UserCheck,
      color: "bg-blue-600"
    },
    {
      id: 'c2',
      title: t.examController,
      person: "Examination Control Head",
      phone: "+977-9704227689",
      icon: Building,
      color: "bg-indigo-600"
    },
    {
      id: 'c3',
      title: t.busTransport,
      person: "Student Transport & Helpdesk",
      phone: "+977-9704227689",
      icon: Bus,
      color: "bg-amber-600"
    },
    {
      id: 'c4',
      title: t.accountsDepartment,
      person: "Account Desk Counter",
      phone: "+977-9704227689",
      icon: CreditCard,
      color: "bg-emerald-600"
    },
    {
      id: 'c5',
      title: t.medicalEmergency,
      person: "First Aid & Medical Room",
      phone: "+977-9704227689",
      icon: HeartPulse,
      color: "bg-red-600"
    }
  ];

  const handleCopy = (id: string, num: string) => {
    navigator.clipboard.writeText(num);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500 text-slate-950 font-bold shadow">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white">
                {t.emergencyContactsTitle}
              </h3>
              <p className="text-xs text-slate-400">
                {lang === 'np' ? "सम्पर्क नम्बर: ९७०४२२७६८९ • इमेल: bhapuma.official@gmail.com" : "Contact: +977-9704227689 • Email: bhapuma.official@gmail.com"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contacts List */}
        <div className="p-6 space-y-3 overflow-y-auto max-h-[60vh]">
          {contacts.map((c) => {
            const Icon = c.icon;
            const isCopied = copiedId === c.id;

            return (
              <div
                key={c.id}
                className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-2xl text-white shadow ${c.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{c.title}</h4>
                    <p className="text-xs text-slate-500 font-medium">{c.person}</p>
                    <p className="text-xs font-bold text-blue-800 mt-0.5">{c.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {c.isEmail ? (
                    <a
                      href={`mailto:${c.phone}`}
                      className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition shadow text-xs font-bold"
                      title="Send Email"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  ) : (
                    <a
                      href={`tel:${c.phone}`}
                      className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition shadow text-xs font-bold"
                      title="Call Now"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                  )}

                  <button
                    onClick={() => handleCopy(c.id, c.phone)}
                    className="p-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 transition cursor-pointer"
                    title="Copy Text"
                  >
                    {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition cursor-pointer"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
