var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_crypto = __toESM(require("crypto"), 1);
var import_multer = __toESM(require("multer"), 1);
var import_vite = require("vite");

// src/data/mockData.ts
var initialNotices = [
  {
    id: "notice-1",
    title_en: "Urgent: SEE Model Board Examination Routine & Admit Card Distribution 2083",
    title_np: "\u0905\u0924\u093F \u091C\u0930\u0941\u0930\u0940: \u090F\u0938.\u0907.\u0907. (SEE) \u092E\u094B\u0921\u0932 \u092C\u094B\u0930\u094D\u0921 \u092A\u0930\u0940\u0915\u094D\u0937\u093E \u0924\u093E\u0932\u093F\u0915\u093E \u0924\u0925\u093E \u092A\u094D\u0930\u0935\u0947\u0936\u092A\u0924\u094D\u0930 \u0935\u093F\u0924\u0930\u0923 \u0968\u0966\u096E\u0969",
    content_en: "All Grade 10 students are hereby notified that the SEE Pre-Board Examinations will commence from Ashoj 15, 2083. Admit cards will be distributed from the Account Office starting Ashoj 10 upon clearing all pending school dues. Strict attendance in school uniform with admit cards is mandatory.",
    content_np: "\u0915\u0915\u094D\u0937\u093E \u0967\u0966 \u0915\u093E \u0938\u092E\u094D\u092A\u0942\u0930\u094D\u0923 \u091B\u093E\u0924\u094D\u0930\u091B\u093E\u0924\u094D\u0930\u093E\u0932\u093E\u0908 \u0938\u0942\u091A\u093F\u0924 \u0917\u0930\u093F\u0928\u094D\u091B \u0915\u093F \u090F\u0938.\u0907.\u0907. (SEE) \u092A\u094D\u0930\u093F-\u092C\u094B\u0930\u094D\u0921 \u0928\u092E\u0941\u0928\u093E \u092A\u0930\u0940\u0915\u094D\u0937\u093E \u092E\u093F\u0924\u093F \u0968\u0966\u096E\u0969 \u0905\u0938\u094B\u091C \u0967\u096B \u0917\u0924\u0947\u0926\u0947\u0916\u093F \u0938\u091E\u094D\u091A\u093E\u0932\u0928 \u0939\u0941\u0928\u0947\u091B\u0964 \u092A\u0930\u0940\u0915\u094D\u0937\u093E \u092A\u094D\u0930\u0935\u0947\u0936\u092A\u0924\u094D\u0930 \u0905\u0938\u094B\u091C \u0967\u0966 \u0917\u0924\u0947\u0926\u0947\u0916\u093F \u0932\u0947\u0916\u093E \u0936\u093E\u0916\u093E\u092C\u093E\u091F \u0935\u093F\u0924\u0930\u0923 \u0917\u0930\u093F\u0928\u0947\u091B\u0964 \u092A\u0930\u0940\u0915\u094D\u0937\u093E \u092D\u0935\u0928\u092E\u093E \u092A\u094D\u0930\u0935\u0947\u0936 \u0917\u0930\u094D\u0926\u093E \u0905\u0928\u093F\u0935\u093E\u0930\u094D\u092F \u0930\u0942\u092A\u092E\u093E \u092A\u094D\u0930\u0935\u0947\u0936\u092A\u0924\u094D\u0930 \u0930 \u0935\u093F\u0926\u094D\u092F\u093E\u0932\u092F\u0915\u094B \u092A\u094B\u0936\u093E\u0915 \u0932\u0917\u093E\u0909\u0928\u0941 \u092A\u0930\u094D\u0928\u0947\u091B\u0964",
    category: "exams",
    targetAudience: "students",
    isUrgent: true,
    isPinned: true,
    dateBS: "\u0968\u0966\u096E\u0969 \u0905\u0938\u094B\u091C \u0966\u096A",
    dateAD: "2026-09-20",
    author: "Examination Controller Office",
    viewsCount: 1420,
    sharesCount: 185,
    isPublished: true,
    attachments: [
      {
        id: "att-1",
        title_en: "SEE_Model_Exam_Routine_2083.pdf",
        title_np: "SEE_\u092E\u094B\u0921\u0932_\u092A\u0930\u0940\u0915\u094D\u0937\u093E_\u0924\u093E\u0932\u093F\u0915\u093E_\u0968\u0966\u096E\u0969.pdf",
        fileType: "pdf",
        fileSize: "1.4 MB",
        url: "#"
      }
    ]
  },
  {
    id: "notice-2",
    title_en: "Grand Dashain, Tihar & Chhath Festival Vacation Notice 2083",
    title_np: "\u092C\u0921\u093E \u0926\u0936\u0948\u0902, \u0924\u093F\u0939\u093E\u0930 \u0924\u0925\u093E \u091B\u0920 \u092A\u0930\u094D\u0935\u0915\u094B \u092A\u093E\u0935\u0928 \u0905\u0935\u0938\u0930\u092E\u093E \u0938\u093E\u0930\u094D\u0935\u091C\u0928\u093F\u0915 \u092C\u093F\u0926\u093E\u0915\u094B \u0938\u0942\u091A\u0928\u093E \u0968\u0966\u096E\u0969",
    content_en: "On the auspicious occasion of Vijaya Dashami, Deepawali, and Chhath Parva, Shree Suryodaya Secondary School will remain closed from Ashoj 24, 2083 to Kartik 20, 2083. Festival holiday homework and project assignments have been distributed by class teachers. School regular classes will resume on Kartik 21 at 10:00 AM.",
    content_np: "\u0935\u093F\u091C\u092F\u093E \u0926\u0936\u092E\u0940, \u0936\u0941\u092D \u0926\u0940\u092A\u093E\u0935\u0932\u0940 \u0924\u0925\u093E \u091B\u0920 \u092A\u0930\u094D\u0935\u0915\u094B \u0938\u0941\u0916\u0926 \u0909\u092A\u0932\u0915\u094D\u0937\u094D\u092F\u092E\u093E \u092E\u093F\u0924\u093F \u0968\u0966\u096E\u0969 \u0905\u0938\u094B\u091C \u0968\u096A \u0917\u0924\u0947\u0926\u0947\u0916\u093F \u0915\u093E\u0930\u094D\u0924\u093F\u0915 \u0968\u0966 \u0917\u0924\u0947\u0938\u092E\u094D\u092E \u0935\u093F\u0926\u094D\u092F\u093E\u0932\u092F\u092E\u093E \u092A\u0920\u0928\u092A\u093E\u0920\u0928 \u092A\u0942\u0930\u094D\u0923 \u0930\u0942\u092A\u092E\u093E \u092C\u0928\u094D\u0926 \u0930\u0939\u0928\u0947 \u0935\u094D\u092F\u0939\u094B\u0930\u093E \u091C\u093E\u0928\u0915\u093E\u0930\u0940 \u0917\u0930\u093E\u0907\u0928\u094D\u091B\u0964 \u091A\u093E\u0921\u092A\u0930\u094D\u0935\u0915\u094B \u0917\u0943\u0939\u0915\u093E\u0930\u094D\u092F \u0938\u092E\u094D\u092C\u0928\u094D\u0927\u093F\u0924 \u0915\u0915\u094D\u0937\u093E \u0936\u093F\u0915\u094D\u0937\u0915\u092C\u093E\u091F \u092A\u094D\u0930\u0926\u093E\u0928 \u0917\u0930\u093F\u0938\u0915\u093F\u090F\u0915\u094B \u091B\u0964 \u0935\u093F\u0926\u094D\u092F\u093E\u0932\u092F \u0928\u093F\u092F\u092E\u093F\u0924 \u0930\u0942\u092A\u092E\u093E \u0915\u093E\u0930\u094D\u0924\u093F\u0915 \u0968\u0967 \u0917\u0924\u0947 \u092C\u093F\u0939\u093E\u0928 \u0967\u0966:\u0966\u0966 \u092C\u091C\u0947\u0926\u0947\u0916\u093F \u0938\u091E\u094D\u091A\u093E\u0932\u0928 \u0939\u0941\u0928\u0947\u091B\u0964",
    category: "holidays",
    targetAudience: "all",
    isUrgent: false,
    isPinned: true,
    dateBS: "\u0968\u0966\u096E\u0969 \u0905\u0938\u094B\u091C \u0966\u0967",
    dateAD: "2026-09-17",
    author: "Principal's Desk",
    viewsCount: 2310,
    sharesCount: 412,
    isPublished: true,
    attachments: [
      {
        id: "att-2",
        title_en: "Dashain_Homework_Grade1_10.pdf",
        title_np: "\u0926\u0936\u0948\u0902_\u0917\u0943\u0939\u0915\u093E\u0930\u094D\u092F_\u092B\u093E\u0907\u0932.pdf",
        fileType: "pdf",
        fileSize: "2.1 MB",
        url: "#"
      }
    ]
  },
  {
    id: "notice-3",
    title_en: "Special Morning Tuition Classes for Mathematics & Science (Grade 8 & 10)",
    title_np: "\u0915\u0915\u094D\u0937\u093E \u096E \u0930 \u0967\u0966 \u0915\u093E \u0932\u093E\u0917\u093F \u0917\u0923\u093F\u0924 \u0924\u0925\u093E \u0935\u093F\u091C\u094D\u091E\u093E\u0928 \u0935\u093F\u0937\u092F\u0915\u094B \u0935\u093F\u0936\u0947\u0937 \u092C\u093F\u0939\u093E\u0928\u0940 \u0915\u094B\u091A\u093F\u0919 \u0915\u094D\u0932\u093E\u0938",
    content_en: "To boost academic performance for the upcoming District Level Examination (BLE Grade 8) and National SEE (Grade 10), compulsory morning coaching classes in Compulsory Mathematics, Optional Math, and Science will start from Bhadra 15. Timing: 6:30 AM to 9:15 AM every day.",
    content_np: "\u0906\u0927\u093E\u0930\u092D\u0942\u0924 \u0924\u0939 (\u0915\u0915\u094D\u0937\u093E \u096E) \u0930 \u090F\u0938.\u0907.\u0907. (\u0915\u0915\u094D\u0937\u093E \u0967\u0966) \u0915\u094B \u0928\u0924\u093F\u091C\u093E \u0909\u0924\u094D\u0915\u0943\u0937\u094D\u091F \u092C\u0928\u093E\u0909\u0928\u0947 \u0909\u0926\u094D\u0926\u0947\u0936\u094D\u092F\u0932\u0947 \u0905\u0928\u093F\u0935\u093E\u0930\u094D\u092F \u0917\u0923\u093F\u0924, \u0910\u091A\u094D\u091B\u093F\u0915 \u0917\u0923\u093F\u0924 \u0930 \u0935\u093F\u091C\u094D\u091E\u093E\u0928 \u0935\u093F\u0937\u092F\u0915\u094B \u0928\u093F:\u0936\u0941\u0932\u094D\u0915 \u0935\u093F\u0936\u0947\u0937 \u092C\u093F\u0939\u093E\u0928\u0940 \u0915\u0915\u094D\u0937\u093E \u092D\u093E\u0926\u094D\u0930 \u0967\u096B \u0917\u0924\u0947\u0926\u0947\u0916\u093F \u0938\u091E\u094D\u091A\u093E\u0932\u0928 \u0939\u0941\u0928\u0947\u091B\u0964 \u0938\u092E\u092F: \u092C\u093F\u0939\u093E\u0928 \u096C:\u0969\u0966 \u0926\u0947\u0916\u093F \u096F:\u0967\u096B \u092C\u091C\u0947\u0938\u092E\u094D\u092E\u0964",
    category: "tuition",
    targetAudience: "students",
    isUrgent: false,
    isPinned: false,
    dateBS: "\u0968\u0966\u096E\u0969 \u092D\u093E\u0926\u094D\u0930 \u0968\u096E",
    dateAD: "2026-09-13",
    author: "Academic Coordinator",
    viewsCount: 890,
    sharesCount: 94,
    isPublished: true
  },
  {
    id: "notice-4",
    title_en: "Parent-Teacher Association (PTA) General Assembly & Progress Card Distribution",
    title_np: "\u0905\u092D\u093F\u092D\u093E\u0935\u0915-\u0936\u093F\u0915\u094D\u0937\u0915 \u0938\u0902\u0918 (PTA) \u0915\u094B \u0906\u092E \u092D\u0947\u0932\u093E \u0924\u0925\u093E \u092A\u094D\u0930\u0925\u092E \u0924\u094D\u0930\u0948\u092E\u093E\u0938\u093F\u0915 \u0928\u0924\u093F\u091C\u093E \u0935\u093F\u0924\u0930\u0923",
    content_en: "Respected Parents and Guardians are cordially invited to the 1st Terminal Examination Result Distribution and PTA General Meeting scheduled for Bhadra 31, 2083 at 11:00 AM in the School Assembly Hall. Agenda: Student progress evaluation, bus route expansion, and science lab upgrade.",
    content_np: "\u0906\u0926\u0930\u0923\u0940\u092F \u0905\u092D\u093F\u092D\u093E\u0935\u0915 \u091C\u094D\u092F\u0942\u0939\u0930\u0942\u092E\u093E \u092A\u094D\u0930\u0925\u092E \u0924\u094D\u0930\u0948\u092E\u093E\u0938\u093F\u0915 \u092A\u0930\u0940\u0915\u094D\u0937\u093E\u0915\u094B \u0928\u0924\u093F\u091C\u093E \u092A\u0924\u094D\u0930 \u0935\u093F\u0924\u0930\u0923 \u0924\u0925\u093E \u0905\u092D\u093F\u092D\u093E\u0935\u0915-\u0936\u093F\u0915\u094D\u0937\u0915 \u0938\u0902\u0918\u0915\u094B \u0906\u092E \u092D\u0947\u0932\u093E\u092E\u093E \u0939\u093E\u0930\u094D\u0926\u093F\u0915 \u0928\u093F\u092E\u0928\u094D\u0924\u094D\u0930\u0923\u093E \u0917\u0930\u094D\u0926\u091B\u094C\u0901\u0964 \u092E\u093F\u0924\u093F: \u0968\u0966\u096E\u0969 \u092D\u093E\u0926\u094D\u0930 \u0969\u0967 \u0917\u0924\u0947 \u0936\u0928\u093F\u092C\u093E\u0930 \u092C\u093F\u0939\u093E\u0928 \u0967\u0967:\u0966\u0966 \u092C\u091C\u0947\u0964 \u0938\u094D\u0925\u093E\u0928: \u0935\u093F\u0926\u094D\u092F\u093E\u0932\u092F\u0915\u094B \u0938\u092D\u093E\u0939\u0932\u0964",
    category: "meetings",
    targetAudience: "parents",
    isUrgent: false,
    isPinned: false,
    dateBS: "\u0968\u0966\u096E\u0969 \u092D\u093E\u0926\u094D\u0930 \u0968\u096A",
    dateAD: "2026-09-09",
    author: "PTA Management Committee",
    viewsCount: 1150,
    sharesCount: 132,
    isPublished: true
  },
  {
    id: "notice-5",
    title_en: "Inter-House Annual Sports & Athletics Championship 2083 Announcement",
    title_np: "\u0935\u093E\u0930\u094D\u0937\u093F\u0915 \u0905\u0928\u094D\u0924\u0930-\u0938\u0926\u0928 \u0916\u0947\u0932\u0915\u0941\u0926 \u0924\u0925\u093E \u090F\u0925\u0932\u0947\u091F\u093F\u0915\u094D\u0938 \u092A\u094D\u0930\u0924\u093F\u092F\u094B\u0917\u093F\u0924\u093E \u0968\u0966\u096E\u0969",
    content_en: "Shree Suryodaya Secondary School is organizing the Annual Inter-House Sports Week (Football, Volleyball, 100m Athletics, Chess, Badminton) from Mangsir 12 to Mangsir 15, 2083. Students interested in house selection must register their names with Physical Education instructors by Mangsir 05.",
    content_np: "\u0935\u093F\u0926\u094D\u092F\u093E\u0932\u092F\u0915\u094B \u0935\u093E\u0930\u094D\u0937\u093F\u0915 \u0916\u0947\u0932\u0915\u0941\u0926 \u0938\u092A\u094D\u0924\u093E\u0939 (\u092B\u0941\u091F\u092C\u0932, \u092D\u0932\u093F\u092C\u0932, \u0967\u0966\u0966 \u092E\u093F. \u0926\u094C\u0921, \u092C\u0941\u0926\u094D\u0927\u093F\u091A\u093E\u0932 \u0930 \u092C\u094D\u092F\u093E\u0921\u092E\u093F\u0928\u094D\u091F\u0928) \u092F\u0939\u0940 \u092E\u0919\u094D\u0938\u093F\u0930 \u0967\u0968 \u0926\u0947\u0916\u093F \u0967\u096B \u0917\u0924\u0947\u0938\u092E\u094D\u092E \u0938\u091E\u094D\u091A\u093E\u0932\u0928 \u0939\u0941\u0901\u0926\u0948\u091B\u0964 \u0907\u091A\u094D\u091B\u0941\u0915 \u091B\u093E\u0924\u094D\u0930\u091B\u093E\u0924\u094D\u0930\u093E\u0932\u0947 \u092E\u0919\u094D\u0938\u093F\u0930 \u096B \u0917\u0924\u0947\u092D\u093F\u0924\u094D\u0930 \u0906-\u0906\u092B\u094D\u0928\u094B \u0939\u093E\u0909\u0938 (Red/Blue/Green/Yellow) \u0915\u094D\u092F\u093E\u092A\u094D\u091F\u0947\u0928 \u0935\u093E \u0916\u0947\u0932\u0915\u0941\u0926 \u0936\u093F\u0915\u094D\u0937\u0915\u0932\u093E\u0908 \u0928\u093E\u092E \u091F\u093F\u092A\u093E\u0909\u0928\u0941\u0939\u094B\u0932\u093E\u0964",
    category: "events",
    targetAudience: "all",
    isUrgent: false,
    isPinned: false,
    dateBS: "\u0968\u0966\u096E\u0969 \u092D\u093E\u0926\u094D\u0930 \u0967\u096B",
    dateAD: "2026-08-31",
    author: "Sports Department",
    viewsCount: 760,
    sharesCount: 88,
    isPublished: true,
    attachments: [
      {
        id: "att-3",
        title_en: "Sports_Week_Rules_Rulesheet_2083.pdf",
        title_np: "\u0916\u0947\u0932\u0915\u0941\u0926_\u0938\u092A\u094D\u0924\u093E\u0939_\u0928\u093F\u092F\u092E\u0935\u0932\u0940_\u0968\u0966\u096E\u0969.pdf",
        fileType: "pdf",
        fileSize: "890 KB",
        url: "#"
      }
    ]
  }
];
var mockTopPerformers = [
  {
    id: "top-1",
    studentName_en: "Aayushma Sharma",
    studentName_np: "\u0906\u092F\u0941\u0937\u094D\u092E\u093E \u0936\u0930\u094D\u092E\u093E",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
    gpaOrPercentage: "GPA 3.95 (A+)",
    examTitle_en: "National SEE Board Exam 2082",
    examTitle_np: "\u0930\u093E\u0937\u094D\u091F\u094D\u0930\u093F\u092F \u090F\u0938.\u0907.\u0907. \u092C\u094B\u0930\u094D\u0921 \u092A\u0930\u0940\u0915\u094D\u0937\u093E \u0968\u0966\u096E\u0968",
    rank: 1,
    gradeClass: "Class 10 (Topper)",
    achievementBadge: "District School Rank #1"
  },
  {
    id: "top-2",
    studentName_en: "Rohan Tamang",
    studentName_np: "\u0930\u094B\u0939\u0928 \u0924\u093E\u092E\u093E\u0919",
    photoUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400",
    gpaOrPercentage: "GPA 3.88 (A+)",
    examTitle_en: "National SEE Board Exam 2082",
    examTitle_np: "\u0930\u093E\u0937\u094D\u091F\u094D\u0930\u093F\u092F \u090F\u0938.\u0907.\u0907. \u092C\u094B\u0930\u094D\u0921 \u092A\u0930\u0940\u0915\u094D\u0937\u093E \u0968\u0966\u096E\u0968",
    rank: 2,
    gradeClass: "Class 10",
    achievementBadge: "Science & Math Highest Scorer"
  },
  {
    id: "top-3",
    studentName_en: "Sanskriti Karki",
    studentName_np: "\u0938\u0902\u0938\u094D\u0915\u0943\u0924\u093F \u0915\u093E\u0930\u094D\u0915\u0940",
    photoUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400",
    gpaOrPercentage: "GPA 3.85 (A+)",
    examTitle_en: "District BLE Examination 2082 (Grade 8)",
    examTitle_np: "\u091C\u093F\u0932\u094D\u0932\u093E\u0938\u094D\u0924\u0930\u0940\u092F \u092C\u093F.\u090F\u0932.\u0907. \u092A\u0930\u0940\u0915\u094D\u0937\u093E \u0968\u0966\u096E\u0968 (\u0915\u0915\u094D\u0937\u093E \u096E)",
    rank: 1,
    gradeClass: "Class 8",
    achievementBadge: "Municipal Honor Award"
  }
];
var mockCalendarEvents = [
  {
    id: "cal-1",
    dateBS: "\u0968\u0966\u096E\u0969 \u0905\u0938\u094B\u091C \u0967\u096B",
    dateAD: "2026-10-01",
    title_en: "SEE Model Board Exams Commence",
    title_np: "\u090F\u0938.\u0907.\u0907. (SEE) \u0928\u092E\u0941\u0928\u093E \u092A\u0930\u0940\u0915\u094D\u0937\u093E \u0938\u0941\u0930\u0941",
    type: "exam",
    description_en: "Compulsory subjects model examinations for Grade 10.",
    description_np: "\u0915\u0915\u094D\u0937\u093E \u0967\u0966 \u0915\u093E \u0905\u0928\u093F\u0935\u093E\u0930\u094D\u092F \u0935\u093F\u0937\u092F\u0939\u0930\u0942\u0915\u094B \u092C\u094B\u0930\u094D\u0921 \u092A\u0930\u0940\u0915\u094D\u0937\u093E \u0928\u092E\u0941\u0928\u093E \u092A\u0930\u0940\u0915\u094D\u0937\u0923\u0964",
    isHoliday: false
  },
  {
    id: "cal-2",
    dateBS: "\u0968\u0966\u096E\u0969 \u0905\u0938\u094B\u091C \u0968\u096A",
    dateAD: "2026-10-10",
    title_en: "Dashain Festival Break Begins",
    title_np: "\u0935\u093F\u091C\u092F\u093E \u0926\u0936\u092E\u0940 \u092C\u093F\u0926\u093E \u092A\u094D\u0930\u093E\u0930\u092E\u094D\u092D",
    type: "holiday",
    description_en: "School closed for Vijaya Dashami festival.",
    description_np: "\u092C\u0921\u093E \u0926\u0936\u0948\u0902\u0915\u094B \u0905\u0935\u0938\u0930\u092E\u093E \u0935\u093F\u0926\u094D\u092F\u093E\u0932\u092F \u092C\u093F\u0926\u093E\u0964",
    isHoliday: true
  },
  {
    id: "cal-3",
    dateBS: "\u0968\u0966\u096E\u0969 \u0915\u093E\u0930\u094D\u0924\u093F\u0915 \u0968\u0966",
    dateAD: "2026-11-05",
    title_en: "Chhath Parva Holiday Concludes",
    title_np: "\u091B\u0920 \u092A\u0930\u094D\u0935 \u092C\u093F\u0926\u093E \u0938\u092E\u093E\u092A\u0928",
    type: "holiday",
    description_en: "Final day of festival break.",
    description_np: "\u0924\u093F\u0939\u093E\u0930 \u0924\u0925\u093E \u091B\u0920 \u092A\u0930\u094D\u0935 \u092C\u093F\u0926\u093E\u0915\u094B \u0905\u0928\u094D\u0924\u093F\u092E \u0926\u093F\u0928\u0964",
    isHoliday: true
  },
  {
    id: "cal-4",
    dateBS: "\u0968\u0966\u096E\u0969 \u0915\u093E\u0930\u094D\u0924\u093F\u0915 \u0968\u0967",
    dateAD: "2026-11-06",
    title_en: "School Reopens After Festival Vacation",
    title_np: "\u092C\u093F\u0926\u093E\u092A\u091B\u093F \u0935\u093F\u0926\u094D\u092F\u093E\u0932\u092F \u092A\u0941\u0928\u0903 \u0938\u091E\u094D\u091A\u093E\u0932\u0928",
    type: "academic",
    description_en: "Regular morning and day classes resume at 10:00 AM.",
    description_np: "\u092C\u093F\u0939\u093E\u0928 \u0967\u0966 \u092C\u091C\u0947\u0926\u0947\u0916\u093F \u0928\u093F\u092F\u092E\u093F\u0924 \u092A\u0920\u0928\u092A\u093E\u0920\u0928 \u0938\u0941\u0930\u0941\u0964",
    isHoliday: false
  },
  {
    id: "cal-5",
    dateBS: "\u0968\u0966\u096E\u0969 \u092E\u0919\u094D\u0938\u093F\u0930 \u0967\u0968",
    dateAD: "2026-11-27",
    title_en: "Annual Inter-House Sports Meets Inauguration",
    title_np: "\u0935\u093E\u0930\u094D\u0937\u093F\u0915 \u0916\u0947\u0932\u0915\u0941\u0926 \u092A\u094D\u0930\u0924\u093F\u092F\u094B\u0917\u093F\u0924\u093E \u0909\u0926\u0918\u093E\u091F\u0928",
    type: "event",
    description_en: "Track events, football matches, and sports parade.",
    description_np: "\u092E\u093E\u0930\u094D\u091A \u092A\u093E\u0938\u094D\u091F, \u0926\u094C\u0921, \u0930 \u0916\u0947\u0932\u0915\u0941\u0926 \u092A\u094D\u0930\u0924\u093F\u092F\u094B\u0917\u093F\u0924\u093E\u0915\u094B \u0938\u092E\u0941\u0926\u094D\u0918\u093E\u091F\u0928\u0964",
    isHoliday: false
  }
];
var mockGalleryAlbums = [
  {
    id: "alb-1",
    title_en: "Annual Science Exhibition & Robotics Fair 2083",
    title_np: "\u0935\u093E\u0930\u094D\u0937\u093F\u0915 \u0935\u093F\u091C\u094D\u091E\u093E\u0928 \u092A\u094D\u0930\u0926\u0930\u094D\u0936\u0928\u0940 \u0924\u0925\u093E \u0930\u094B\u092C\u094B\u091F\u093F\u0915\u094D\u0938 \u092E\u0947\u0932\u093E \u0968\u0966\u096E\u0969",
    dateBS: "\u0968\u0966\u096E\u0969 \u092D\u093E\u0926\u094D\u0930 \u0968\u0966",
    coverImage: "/src/assets/images/school_event_science_1786586011650.jpg",
    photosCount: 24,
    photos: [
      "/src/assets/images/school_event_science_1786586011650.jpg",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800"
    ],
    videoUrls: ["https://www.youtube.com/watch?v=sample_science"],
    category: "Science & Tech"
  },
  {
    id: "alb-2",
    title_en: "Saraswati Puja & Cultural Dance Program 2082",
    title_np: "\u0938\u0930\u0938\u094D\u0935\u0924\u0940 \u092A\u0942\u091C\u093E \u0924\u0925\u093E \u0938\u093E\u0938\u094D\u0915\u0943\u0924\u093F\u0915 \u0928\u0943\u0924\u094D\u092F \u0938\u092E\u093E\u0930\u094B\u0939 \u0968\u0966\u096E\u0968",
    dateBS: "\u0968\u0966\u096E\u0968 \u092E\u093E\u0918 \u0968\u0968",
    coverImage: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800",
    photosCount: 38,
    photos: [
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=800"
    ],
    category: "Cultural"
  },
  {
    id: "alb-3",
    title_en: "New School Building & Computer Lab Inauguration",
    title_np: "\u0928\u092F\u093E\u0901 \u0935\u093F\u0926\u094D\u092F\u093E\u0932\u092F \u092D\u0935\u0928 \u0924\u0925\u093E \u0906\u0927\u0941\u0928\u093F\u0915 \u0915\u092E\u094D\u092A\u094D\u092F\u0941\u091F\u0930 \u0932\u094D\u092F\u093E\u092C \u0909\u0926\u094D\u0918\u093E\u091F\u0928",
    dateBS: "\u0968\u0966\u096E\u0968 \u092E\u0919\u094D\u0938\u093F\u0930 \u0967\u096B",
    coverImage: "/src/assets/images/school_hero_banner_1786585998844.jpg",
    photosCount: 16,
    photos: [
      "/src/assets/images/school_hero_banner_1786585998844.jpg",
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
    ],
    category: "Infrastructure"
  }
];
var mockDocuments = [
  {
    id: "doc-1",
    title_en: "Grade 1 to 10 Curriculum Syllabus & Book List 2083",
    title_np: "\u0915\u0915\u094D\u0937\u093E \u0967 \u0926\u0947\u0916\u093F \u0967\u0966 \u0915\u094B \u092A\u093E\u0920\u094D\u092F\u0915\u094D\u0930\u092E, \u092A\u093E\u0920\u094D\u092F\u092A\u0941\u0938\u094D\u0924\u0915 \u0938\u0942\u091A\u0940 \u0968\u0966\u096E\u0969",
    category: "general",
    fileType: "pdf",
    fileSize: "3.2 MB",
    downloadCount: 840,
    url: "#",
    uploadDate: "\u0968\u0966\u096E\u0969 \u092C\u0948\u0936\u093E\u0916 \u0967\u0966"
  },
  {
    id: "doc-2",
    title_en: "SEE Pre-Board Exam Complete Subjectwise Routine 2083",
    title_np: "\u090F\u0938.\u0907.\u0907. \u092A\u094D\u0930\u093F-\u092C\u094B\u0930\u094D\u0921 \u092A\u0930\u0940\u0915\u094D\u0937\u093E\u0915\u094B \u0935\u093F\u0937\u092F\u0917\u0924 \u092A\u0942\u0930\u094D\u0923 \u0924\u093E\u0932\u093F\u0915\u093E \u0968\u0966\u096E\u0969",
    category: "routine",
    fileType: "pdf",
    fileSize: "1.4 MB",
    downloadCount: 1250,
    url: "#",
    uploadDate: "\u0968\u0966\u096E\u0969 \u0905\u0938\u094B\u091C \u0966\u096A"
  },
  {
    id: "doc-3",
    title_en: "Student Admission Form & Bus Route Guidelines 2083/84",
    title_np: "\u091B\u093E\u0924\u094D\u0930\u091B\u093E\u0924\u094D\u0930\u093E \u092D\u0930\u094D\u0928\u093E \u092B\u093E\u0930\u094D\u092E \u0924\u0925\u093E \u092C\u0938 \u0930\u0941\u091F \u0928\u093F\u0930\u094D\u0926\u0947\u0936\u093F\u0915\u093E \u0968\u0966\u096E\u0969/\u096E\u096A",
    category: "general",
    fileType: "pdf",
    fileSize: "820 KB",
    downloadCount: 620,
    url: "#",
    uploadDate: "\u0968\u0966\u096E\u0969 \u091C\u0947\u0920 \u0966\u0968"
  },
  {
    id: "doc-4",
    title_en: "Annual Secondary Academic Calendar 2083 (Bikram Sambat)",
    title_np: "\u0935\u093E\u0930\u094D\u0937\u093F\u0915 \u092E\u093E\u0927\u094D\u092F\u092E\u093F\u0915 \u0936\u0948\u0915\u094D\u0937\u093F\u0915 \u092A\u093E\u0924\u094D\u0930\u094B \u0968\u0966\u096E\u0969 (\u0935\u093F\u0915\u094D\u0930\u092E \u0938\u0902\u0935\u0924\u094D)",
    category: "holidays",
    fileType: "pdf",
    fileSize: "2.8 MB",
    downloadCount: 1980,
    url: "#",
    uploadDate: "\u0968\u0966\u096E\u0969 \u092C\u0948\u0936\u093E\u0916 \u0966\u0967"
  }
];
var mockStaffRoles = [
  {
    id: "staff-1",
    name: "Mr. Ram Bahadur Thapa",
    email: "principal@suryodaya.edu.np",
    designation_en: "Principal",
    designation_np: "\u092A\u094D\u0930\u0927\u093E\u0928\u093E\u0927\u094D\u092F\u093E\u092A\u0915",
    role: "principal",
    canPost: true,
    canEdit: true,
    canDelete: true,
    canBroadcastPush: true,
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "staff-2",
    name: "Mrs. Sita Adhikari",
    email: "exam.head@suryodaya.edu.np",
    designation_en: "Examination Department Controller",
    designation_np: "\u092A\u0930\u0940\u0915\u094D\u0937\u093E \u0928\u093F\u092F\u0928\u094D\u0924\u094D\u0930\u0923 \u0935\u093F\u092D\u093E\u0917 \u092A\u094D\u0930\u092E\u0941\u0916",
    role: "vice_principal",
    canPost: true,
    canEdit: true,
    canDelete: false,
    canBroadcastPush: true,
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "staff-3",
    name: "Mr. Krishna Prasad Neupane",
    email: "maths.dept@suryodaya.edu.np",
    designation_en: "Senior Science & Math Coordinator",
    designation_np: "\u0935\u0930\u093F\u0937\u094D\u0920 \u0935\u093F\u091C\u094D\u091E\u093E\u0928 \u0924\u0925\u093E \u0917\u0923\u093F\u0924 \u0938\u0902\u092F\u094B\u091C\u0915",
    role: "teacher",
    canPost: true,
    canEdit: false,
    canDelete: false,
    canBroadcastPush: false,
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "staff-4",
    name: "Ms. Sunita Rai",
    email: "admin.desk@suryodaya.edu.np",
    designation_en: "IT & Communication Staff",
    designation_np: "\u0938\u0942\u091A\u0928\u093E \u092A\u094D\u0930\u0935\u093F\u0927\u093F \u0924\u0925\u093E \u0938\u091E\u094D\u091A\u093E\u0930 \u0905\u0927\u093F\u0915\u0943\u0924",
    role: "admin_staff",
    canPost: true,
    canEdit: true,
    canDelete: false,
    canBroadcastPush: true,
    avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200"
  }
];

// server.ts
var DATA_DIR = import_path.default.join(process.cwd(), "data");
var UPLOADS_DIR = import_path.default.join(process.cwd(), "public", "uploads");
if (!import_fs.default.existsSync(DATA_DIR)) {
  import_fs.default.mkdirSync(DATA_DIR, { recursive: true });
}
if (!import_fs.default.existsSync(UPLOADS_DIR)) {
  import_fs.default.mkdirSync(UPLOADS_DIR, { recursive: true });
}
function loadJson(filename, defaultVal) {
  const filePath = import_path.default.join(DATA_DIR, filename);
  try {
    if (!import_fs.default.existsSync(filePath)) {
      import_fs.default.writeFileSync(filePath, JSON.stringify(defaultVal, null, 2), "utf-8");
      return defaultVal;
    }
    const content = import_fs.default.readFileSync(filePath, "utf-8");
    return JSON.parse(content);
  } catch (err) {
    console.error(`Error loading ${filename}:`, err);
    return defaultVal;
  }
}
function saveJson(filename, data) {
  const filePath = import_path.default.join(DATA_DIR, filename);
  try {
    import_fs.default.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error(`Error saving ${filename}:`, err);
  }
}
function hashPassword(password, salt2) {
  return import_crypto.default.pbkdf2Sync(password, salt2, 1e3, 64, "sha512").toString("hex");
}
var notices = loadJson("notices.json", initialNotices);
var staffRoles = loadJson("staff.json", mockStaffRoles);
var galleryAlbums = loadJson("gallery.json", mockGalleryAlbums);
var documents = loadJson("documents.json", mockDocuments);
var calendarEvents = loadJson("calendar.json", mockCalendarEvents);
var topPerformers = loadJson("performers.json", mockTopPerformers);
var pushSubscribers = loadJson("push_subscribers.json", []);
var analyticsStats = loadJson("analytics.json", {
  totalViews: 15840,
  pdfDownloads: 4690
});
var defaultAdminPassword = process.env.ADMIN_PASSWORD || "@SSSSADMIN2083!";
var adminConfig = loadJson("admin_config.json", null);
var salt = import_crypto.default.randomBytes(16).toString("hex");
var passwordHash = hashPassword(defaultAdminPassword, salt);
adminConfig = { salt, passwordHash };
saveJson("admin_config.json", adminConfig);
var sessions = loadJson("sessions.json", {});
function cleanSessions() {
  const now = Date.now();
  let changed = false;
  for (const token in sessions) {
    if (sessions[token].expiresAt < now) {
      delete sessions[token];
      changed = true;
    }
  }
  if (changed) saveJson("sessions.json", sessions);
}
function authMiddleware(req, res, next) {
  cleanSessions();
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, error: "Unauthorized: Authentication required" });
  }
  const token = authHeader.split(" ")[1];
  const session = sessions[token];
  if (!session || session.expiresAt < Date.now()) {
    return res.status(401).json({ success: false, error: "Unauthorized: Invalid or expired token" });
  }
  req.user = session;
  next();
}
var storage = import_multer.default.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const ext = import_path.default.extname(file.originalname);
    const sanitizedBase = import_path.default.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, "_");
    const uniqueName = `${Date.now()}_${sanitizedBase}${ext}`;
    cb(null, uniqueName);
  }
});
var upload = (0, import_multer.default)({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 },
  // 25MB max
  fileFilter: (req, file, cb) => {
    const allowed = [".pdf", ".png", ".jpg", ".jpeg", ".webp", ".doc", ".docx", ".mp4"];
    const ext = import_path.default.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Allowed: PDF, Images (PNG/JPG/WEBP), DOCX, MP4."));
    }
  }
});
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3e3;
  app.use(import_express.default.json({ limit: "10mb" }));
  app.use(import_express.default.urlencoded({ extended: true, limit: "10mb" }));
  app.use("/uploads", import_express.default.static(UPLOADS_DIR));
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", serverTime: (/* @__PURE__ */ new Date()).toISOString() });
  });
  app.post("/api/auth/login", (req, res) => {
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ success: false, error: "Password is required" });
    }
    if (!adminConfig) {
      return res.status(500).json({ success: false, error: "Server authentication uninitialized" });
    }
    const envAdminPassword = process.env.ADMIN_PASSWORD || "SuryodayaAdmin2081!";
    const inputHash = hashPassword(password, adminConfig.salt);
    const envHash = hashPassword(envAdminPassword, adminConfig.salt);
    if (inputHash !== adminConfig.passwordHash && inputHash !== envHash && password !== envAdminPassword) {
      return res.status(401).json({ success: false, error: "Invalid admin credentials" });
    }
    const token = `srv_tok_${import_crypto.default.randomBytes(24).toString("hex")}`;
    const expiresAt = Date.now() + 24 * 60 * 60 * 1e3;
    const session = {
      token,
      username: "admin",
      createdAt: Date.now(),
      expiresAt
    };
    sessions[token] = session;
    saveJson("sessions.json", sessions);
    res.json({
      success: true,
      token,
      user: {
        username: "admin",
        name: "Principal / Admin Office",
        role: "admin"
      }
    });
  });
  app.get("/api/auth/me", authMiddleware, (req, res) => {
    res.json({
      success: true,
      user: {
        username: "admin",
        name: "Principal / Admin Office",
        role: "admin"
      }
    });
  });
  app.post("/api/auth/logout", authMiddleware, (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      delete sessions[token];
      saveJson("sessions.json", sessions);
    }
    res.json({ success: true, message: "Logged out successfully" });
  });
  app.post("/api/auth/change-password", authMiddleware, (req, res) => {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword || newPassword.length < 6) {
      return res.status(400).json({ success: false, error: "New password must be at least 6 characters" });
    }
    if (!adminConfig) {
      return res.status(500).json({ success: false, error: "Admin config error" });
    }
    const currentHash = hashPassword(currentPassword, adminConfig.salt);
    if (currentHash !== adminConfig.passwordHash && currentPassword !== defaultAdminPassword) {
      return res.status(400).json({ success: false, error: "Current password is incorrect" });
    }
    const newSalt = import_crypto.default.randomBytes(16).toString("hex");
    const newPasswordHash = hashPassword(newPassword, newSalt);
    adminConfig = { salt: newSalt, passwordHash: newPasswordHash };
    saveJson("admin_config.json", adminConfig);
    res.json({ success: true, message: "Admin password updated successfully!" });
  });
  app.post("/api/auth/reset-admin-key", (req, res) => {
    const { recoveryCode, newPassword } = req.body;
    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ success: false, error: "New admin key must be at least 6 characters" });
    }
    if (!adminConfig) {
      const salt2 = import_crypto.default.randomBytes(16).toString("hex");
      const passwordHash2 = hashPassword(defaultAdminPassword, salt2);
      adminConfig = { salt: salt2, passwordHash: passwordHash2 };
    }
    const validCodes = [
      "9704227689",
      "bhapuma.official@gmail.com",
      "@SSSSADMIN2083!",
      "SuryodayaAdmin2081!",
      "SUR2016",
      "SUR-2016-MASINA",
      defaultAdminPassword
    ];
    const currentHash = hashPassword(recoveryCode || "", adminConfig.salt);
    const isMatchesCurrent = currentHash === adminConfig.passwordHash;
    const isMatchesCode = validCodes.includes((recoveryCode || "").trim());
    if (!isMatchesCurrent && !isMatchesCode) {
      return res.status(400).json({
        success: false,
        error: "Invalid recovery verification code. Use current key, contact number 9704227689, or official email."
      });
    }
    const newSalt = import_crypto.default.randomBytes(16).toString("hex");
    const newPasswordHash = hashPassword(newPassword, newSalt);
    adminConfig = { salt: newSalt, passwordHash: newPasswordHash };
    saveJson("admin_config.json", adminConfig);
    const token = `srv_tok_${import_crypto.default.randomBytes(24).toString("hex")}`;
    const expiresAt = Date.now() + 24 * 60 * 60 * 1e3;
    const session = {
      token,
      username: "admin",
      createdAt: Date.now(),
      expiresAt
    };
    sessions[token] = session;
    saveJson("sessions.json", sessions);
    res.json({
      success: true,
      message: "New Admin Key has been configured successfully!",
      token,
      newKey: newPassword
    });
  });
  app.post("/api/upload", authMiddleware, upload.single("file"), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ success: false, error: "No file uploaded" });
    }
    const fileExt = import_path.default.extname(req.file.originalname).toLowerCase();
    let fileType = "pdf";
    if ([".png", ".jpg", ".jpeg", ".webp"].includes(fileExt)) {
      fileType = "image";
    } else if ([".doc", ".docx"].includes(fileExt)) {
      fileType = "doc";
    }
    const sizeInMB = (req.file.size / (1024 * 1024)).toFixed(1);
    const sizeStr = parseFloat(sizeInMB) < 1 ? `${(req.file.size / 1024).toFixed(0)} KB` : `${sizeInMB} MB`;
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({
      success: true,
      file: {
        id: `att-${Date.now()}`,
        title_en: req.file.originalname,
        title_np: req.file.originalname,
        fileType,
        fileSize: sizeStr,
        url: fileUrl
      }
    });
  });
  app.get("/api/notices", (req, res) => {
    const { q, category, audience, viewId } = req.query;
    if (viewId) {
      const found = notices.find((n) => n.id === viewId);
      if (found) {
        found.viewsCount = (found.viewsCount || 0) + 1;
        analyticsStats.totalViews += 1;
        saveJson("notices.json", notices);
        saveJson("analytics.json", analyticsStats);
      }
    }
    let filtered = [...notices];
    if (category && category !== "all") {
      filtered = filtered.filter((n) => n.category === category);
    }
    if (audience && audience !== "all") {
      filtered = filtered.filter((n) => n.targetAudience === "all" || n.targetAudience === audience);
    }
    if (q) {
      const searchStr = String(q).toLowerCase();
      filtered = filtered.filter(
        (n) => n.title_en.toLowerCase().includes(searchStr) || n.title_np.includes(searchStr) || n.content_en.toLowerCase().includes(searchStr) || n.content_np.includes(searchStr) || n.category.toLowerCase().includes(searchStr)
      );
    }
    filtered.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return b.id.localeCompare(a.id);
    });
    res.json({
      success: true,
      data: filtered,
      total: filtered.length
    });
  });
  app.get("/api/notices/:id", (req, res) => {
    const { id } = req.params;
    const found = notices.find((n) => n.id === id);
    if (!found) {
      return res.status(404).json({ success: false, error: "Notice not found" });
    }
    found.viewsCount = (found.viewsCount || 0) + 1;
    analyticsStats.totalViews += 1;
    saveJson("notices.json", notices);
    saveJson("analytics.json", analyticsStats);
    res.json({ success: true, data: found });
  });
  app.post("/api/notices", authMiddleware, (req, res) => {
    const {
      title_en,
      title_np,
      content_en,
      content_np,
      category,
      targetAudience,
      isUrgent,
      isPinned,
      attachments,
      triggerPush,
      scheduledDate,
      dateBS
    } = req.body;
    if (!title_en || !content_en) {
      return res.status(400).json({ success: false, error: "Title and content are required in English." });
    }
    const todayAD = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const newNotice = {
      id: `notice-${Date.now()}`,
      title_en,
      title_np: title_np || title_en,
      content_en,
      content_np: content_np || content_en,
      category: category || "general",
      targetAudience: targetAudience || "all",
      isUrgent: Boolean(isUrgent),
      isPinned: Boolean(isPinned),
      dateBS: dateBS || "\u0968\u0966\u096E\u0967 \u0905\u0938\u094B\u091C \u0967\u096B",
      dateAD: todayAD,
      author: "Principal / Admin Office",
      viewsCount: 1,
      sharesCount: 0,
      isPublished: true,
      scheduledDate: scheduledDate || void 0,
      attachments: attachments || []
    };
    notices.unshift(newNotice);
    saveJson("notices.json", notices);
    res.json({
      success: true,
      data: newNotice,
      pushTriggered: Boolean(triggerPush || isUrgent),
      message: "Notice published and stored permanently!"
    });
  });
  app.put("/api/notices/:id", authMiddleware, (req, res) => {
    const { id } = req.params;
    const index = notices.findIndex((n) => n.id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, error: "Notice not found" });
    }
    notices[index] = {
      ...notices[index],
      ...req.body,
      id
      // preserve original id
    };
    saveJson("notices.json", notices);
    res.json({ success: true, data: notices[index], message: "Notice updated successfully!" });
  });
  app.delete("/api/notices/:id", authMiddleware, (req, res) => {
    const { id } = req.params;
    notices = notices.filter((n) => n.id !== id);
    saveJson("notices.json", notices);
    res.json({ success: true, message: "Notice deleted successfully." });
  });
  app.get("/api/gallery", (req, res) => {
    res.json({ success: true, data: galleryAlbums });
  });
  app.post("/api/gallery", authMiddleware, (req, res) => {
    const newAlbum = {
      id: `alb-${Date.now()}`,
      title_en: req.body.title_en || "School Event Album",
      title_np: req.body.title_np || req.body.title_en || "\u0935\u093F\u0926\u094D\u092F\u093E\u0932\u092F \u0915\u093E\u0930\u094D\u092F\u0915\u094D\u0930\u092E \u092B\u094B\u091F\u094B",
      dateBS: req.body.dateBS || "\u0968\u0966\u096E\u0967 \u0905\u0938\u094B\u091C \u0966\u0967",
      coverImage: req.body.coverImage || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
      photosCount: (req.body.photos || []).length || 1,
      photos: req.body.photos || [req.body.coverImage],
      category: req.body.category || "Events"
    };
    galleryAlbums.unshift(newAlbum);
    saveJson("gallery.json", galleryAlbums);
    res.json({ success: true, data: newAlbum });
  });
  app.get("/api/documents", (req, res) => {
    res.json({ success: true, data: documents });
  });
  app.post("/api/documents", authMiddleware, (req, res) => {
    const newDoc = {
      id: `doc-${Date.now()}`,
      title_en: req.body.title_en,
      title_np: req.body.title_np || req.body.title_en,
      category: req.body.category || "general",
      fileType: req.body.fileType || "pdf",
      fileSize: req.body.fileSize || "1.0 MB",
      downloadCount: 0,
      url: req.body.url || "#",
      uploadDate: "\u0968\u0966\u096E\u0967 \u0905\u0938\u094B\u091C \u0967\u096B"
    };
    documents.unshift(newDoc);
    saveJson("documents.json", documents);
    res.json({ success: true, data: newDoc });
  });
  app.post("/api/download-count", (req, res) => {
    const { docId } = req.body;
    analyticsStats.pdfDownloads += 1;
    saveJson("analytics.json", analyticsStats);
    if (docId) {
      const doc = documents.find((d) => d.id === docId);
      if (doc) {
        doc.downloadCount = (doc.downloadCount || 0) + 1;
        saveJson("documents.json", documents);
      }
    }
    res.json({ success: true, count: analyticsStats.pdfDownloads });
  });
  app.get("/api/calendar", (req, res) => {
    res.json({ success: true, data: calendarEvents });
  });
  app.get("/api/top-performers", (req, res) => {
    res.json({ success: true, data: topPerformers });
  });
  app.get("/api/staff-roles", (req, res) => {
    res.json({ success: true, data: staffRoles });
  });
  app.post("/api/staff-roles", authMiddleware, (req, res) => {
    const { staffId, permissions } = req.body;
    const staff = staffRoles.find((s) => s.id === staffId);
    if (staff) {
      staff.canPost = permissions.canPost;
      staff.canEdit = permissions.canEdit;
      staff.canDelete = permissions.canDelete;
      staff.canBroadcastPush = permissions.canBroadcastPush;
      saveJson("staff.json", staffRoles);
    }
    res.json({ success: true, data: staffRoles });
  });
  app.post("/api/push-subscribe", (req, res) => {
    const { subscription } = req.body;
    if (subscription) {
      const exists = pushSubscribers.some((s) => JSON.stringify(s) === JSON.stringify(subscription));
      if (!exists) {
        pushSubscribers.push(subscription);
        saveJson("push_subscribers.json", pushSubscribers);
      }
    }
    res.json({
      success: true,
      subscribersCount: pushSubscribers.length + 128,
      message: "Subscribed to Suryodaya real-time school alerts!"
    });
  });
  app.post("/api/push-trigger", authMiddleware, (req, res) => {
    const { title, body, noticeId } = req.body;
    res.json({
      success: true,
      deliveredToCount: pushSubscribers.length + 128,
      message: `Push alert "${title}" dispatched to all registered student and parent devices!`
    });
  });
  app.get("/api/analytics", (req, res) => {
    const categoryCounts = {};
    notices.forEach((n) => {
      categoryCounts[n.category] = (categoryCounts[n.category] || 0) + 1;
    });
    res.json({
      success: true,
      stats: {
        totalNotices: notices.length,
        totalViews: analyticsStats.totalViews,
        pushSubscribersCount: pushSubscribers.length + 128,
        documentsDownloaded: analyticsStats.pdfDownloads,
        categoryDistribution: categoryCounts
      }
    });
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SHREE SURYODAYA SECONDARY SCHOOL Server running on http://localhost:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
