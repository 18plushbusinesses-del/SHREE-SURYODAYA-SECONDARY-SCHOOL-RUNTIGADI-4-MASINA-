import { 
  Notice, 
  TopPerformer, 
  AcademicCalendarEvent, 
  GalleryAlbum, 
  DocumentItem, 
  StaffRole,
  SeeVideo 
} from '../types';

export const initialNotices: Notice[] = [
  {
    id: 'notice-1',
    title_en: "Urgent: SEE Model Board Examination Routine & Admit Card Distribution 2081",
    title_np: "अति जरुरी: एस.इ.इ. (SEE) मोडल बोर्ड परीक्षा तालिका तथा प्रवेशपत्र वितरण २०८१",
    content_en: "All Grade 10 students are hereby notified that the SEE Pre-Board Examinations will commence from Ashoj 15, 2081 (October 01, 2026). Admit cards will be distributed from the Account Office starting Ashoj 10 upon clearing all pending school dues. Strict attendance in school uniform with admit cards is mandatory.",
    content_np: "कक्षा १० का सम्पूर्ण छात्रछात्रालाई सूचित गरिन्छ कि एस.इ.इ. (SEE) प्रि-बोर्ड नमुना परीक्षा मिति २०८१ असोज १५ गतेदेखि सञ्चालन हुनेछ। परीक्षा प्रवेशपत्र असोज १० गतेदेखि लेखा शाखाबाट वितरण गरिनेछ। परीक्षा भवनमा प्रवेश गर्दा अनिवार्य रूपमा प्रवेशपत्र र विद्यालयको पोशाक लगाउनु पर्नेछ।",
    category: 'exams',
    targetAudience: 'students',
    isUrgent: true,
    isPinned: true,
    dateBS: "२०८१ असोज ०४",
    dateAD: "2026-09-20",
    author: "Examination Controller Office",
    viewsCount: 1420,
    sharesCount: 185,
    isPublished: true,
    attachments: [
      {
        id: 'att-1',
        title_en: "SEE_Model_Exam_Routine_2081.pdf",
        title_np: "SEE_मोडल_परीक्षा_तालिका_२०८१.pdf",
        fileType: 'pdf',
        fileSize: '1.4 MB',
        url: '#'
      }
    ]
  },
  {
    id: 'notice-2',
    title_en: "Grand Dashain, Tihar & Chhath Festival Vacation Notice",
    title_np: "बडा दशैं, तिहार तथा छठ पर्वको पावन अवसरमा सार्वजनिक बिदाको सूचना",
    content_en: "On the auspicious occasion of Vijaya Dashami, Deepawali, and Chhath Parva, Shree Suryodaya Secondary School will remain closed from Ashoj 24, 2081 to Kartik 20, 2081. Festival holiday homework and project assignments have been distributed by class teachers. School regular classes will resume on Kartik 21 at 10:00 AM.",
    content_np: "विजया दशमी, शुभ दीपावली तथा छठ पर्वको सुखद उपलक्ष्यमा मिति २०८१ असोज २४ गतेदेखि कार्तिक २० गतेसम्म विद्यालयमा पठनपाठन पूर्ण रूपमा बन्द रहने व्यहोरा जानकारी गराइन्छ। चाडपर्वको गृहकार्य सम्बन्धित कक्षा शिक्षकबाट प्रदान गरिसकिएको छ। विद्यालय नियमित रूपमा कार्तिक २१ गते बिहान १०:०० बजेदेखि सञ्चालन हुनेछ।",
    category: 'holidays',
    targetAudience: 'all',
    isUrgent: false,
    isPinned: true,
    dateBS: "२०८१ असोज ०१",
    dateAD: "2026-09-17",
    author: "Principal's Desk",
    viewsCount: 2310,
    sharesCount: 412,
    isPublished: true,
    attachments: [
      {
        id: 'att-2',
        title_en: "Dashain_Homework_Grade1_10.pdf",
        title_np: "दशैं_गृहकार्य_फाइल.pdf",
        fileType: 'pdf',
        fileSize: '2.1 MB',
        url: '#'
      }
    ]
  },
  {
    id: 'notice-3',
    title_en: "Special Morning Tuition Classes for Mathematics & Science (Grade 8 & 10)",
    title_np: "कक्षा ८ र १० का लागि गणित तथा विज्ञान विषयको विशेष बिहानी कोचिङ क्लास",
    content_en: "To boost academic performance for the upcoming District Level Examination (BLE Grade 8) and National SEE (Grade 10), compulsory morning coaching classes in Compulsory Mathematics, Optional Math, and Science will start from Bhadra 15. Timing: 6:30 AM to 9:15 AM every day.",
    content_np: "आधारभूत तह (कक्षा ८) र एस.इ.इ. (कक्षा १०) को नतिजा उत्कृष्ट बनाउने उद्देश्यले अनिवार्य गणित, ऐच्छिक गणित र विज्ञान विषयको नि:शुल्क विशेष बिहानी कक्षा भाद्र १५ गतेदेखि सञ्चालन हुनेछ। समय: बिहान ६:३० देखि ९:१५ बजेसम्म।",
    category: 'tuition',
    targetAudience: 'students',
    isUrgent: false,
    isPinned: false,
    dateBS: "२०८१ भाद्र २८",
    dateAD: "2026-09-13",
    author: "Academic Coordinator",
    viewsCount: 890,
    sharesCount: 94,
    isPublished: true
  },
  {
    id: 'notice-4',
    title_en: "Parent-Teacher Association (PTA) General Assembly & Progress Card Distribution",
    title_np: "अभिभावक-शिक्षक संघ (PTA) को आम भेला तथा प्रथम त्रैमासिक नतिजा वितरण",
    content_en: "Respected Parents and Guardians are cordially invited to the 1st Terminal Examination Result Distribution and PTA General Meeting scheduled for Bhadra 31, 2081 at 11:00 AM in the School Assembly Hall. Agenda: Student progress evaluation, bus route expansion, and science lab upgrade.",
    content_np: "आदरणीय अभिभावक ज्यूहरूमा प्रथम त्रैमासिक परीक्षाको नतिजा पत्र वितरण तथा अभिभावक-शिक्षक संघको आम भेलामा हार्दिक निमन्त्रणा गर्दछौँ। मिति: २०८१ भाद्र ३१ गते शनिबार बिहान ११:०० बजे। स्थान: विद्यालयको सभाहल।",
    category: 'meetings',
    targetAudience: 'parents',
    isUrgent: false,
    isPinned: false,
    dateBS: "२०८१ भाद्र २४",
    dateAD: "2026-09-09",
    author: "PTA Management Committee",
    viewsCount: 1150,
    sharesCount: 132,
    isPublished: true
  },
  {
    id: 'notice-5',
    title_en: "Inter-House Annual Sports & Athletics Championship 2081 Announcement",
    title_np: "वार्षिक अन्तर-सदन खेलकुद तथा एथलेटिक्स प्रतियोगिता २०८१",
    content_en: "Shree Suryodaya Secondary School is organizing the Annual Inter-House Sports Week (Football, Volleyball, 100m Athletics, Chess, Badminton) from Mangsir 12 to Mangsir 15. Students interested in house selection must register their names with Physical Education instructors by Mangsir 05.",
    content_np: "विद्यालयको वार्षिक खेलकुद सप्ताह (फुटबल, भलिबल, १०० मि. दौड, बुद्धिचाल र ब्याडमिन्टन) यही मङ्सिर १२ देखि १५ गतेसम्म सञ्चालन हुँदैछ। इच्छुक छात्रछात्राले मङ्सिर ५ गतेभित्र आ-आफ्नो हाउस (Red/Blue/Green/Yellow) क्याप्टेन वा खेलकुद शिक्षकलाई नाम टिपाउनुहोला।",
    category: 'events',
    targetAudience: 'all',
    isUrgent: false,
    isPinned: false,
    dateBS: "२०८१ भाद्र १५",
    dateAD: "2026-08-31",
    author: "Sports Department",
    viewsCount: 760,
    sharesCount: 88,
    isPublished: true,
    attachments: [
      {
        id: 'att-3',
        title_en: "Sports_Week_Rules_Rulesheet.pdf",
        title_np: "खेलकुद_सप्ताह_नियमवली.pdf",
        fileType: 'pdf',
        fileSize: '890 KB',
        url: '#'
      }
    ]
  }
];

export const mockTopPerformers: TopPerformer[] = [
  {
    id: 'top-1',
    studentName_en: "Aayushma Sharma",
    studentName_np: "आयुष्मा शर्मा",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
    gpaOrPercentage: "GPA 3.95 (A+)",
    examTitle_en: "National SEE Board Exam 2080",
    examTitle_np: "राष्ट्रिय एस.इ.इ. बोर्ड परीक्षा २०८०",
    rank: 1,
    gradeClass: "Class 10 (Topper)",
    achievementBadge: "District School Rank #1"
  },
  {
    id: 'top-2',
    studentName_en: "Rohan Tamang",
    studentName_np: "रोहन तामाङ",
    photoUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400",
    gpaOrPercentage: "GPA 3.88 (A+)",
    examTitle_en: "National SEE Board Exam 2080",
    examTitle_np: "राष्ट्रिय एस.इ.इ. बोर्ड परीक्षा २०८०",
    rank: 2,
    gradeClass: "Class 10",
    achievementBadge: "Science & Math Highest Scorer"
  },
  {
    id: 'top-3',
    studentName_en: "Sanskriti Karki",
    studentName_np: "संस्कृति कार्की",
    photoUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400",
    gpaOrPercentage: "GPA 3.85 (A+)",
    examTitle_en: "District BLE Examination 2080 (Grade 8)",
    examTitle_np: "जिल्लास्तरीय बि.एल.इ. परीक्षा २०८० (कक्षा ८)",
    rank: 1,
    gradeClass: "Class 8",
    achievementBadge: "Municipal Honor Award"
  }
];

export const mockCalendarEvents: AcademicCalendarEvent[] = [
  {
    id: 'cal-1',
    dateBS: "२०८१ असोज १५",
    dateAD: "2026-10-01",
    title_en: "SEE Model Board Exams Commence",
    title_np: "एस.इ.इ. (SEE) नमुना परीक्षा सुरु",
    type: 'exam',
    description_en: "Compulsory subjects model examinations for Grade 10.",
    description_np: "कक्षा १० का अनिवार्य विषयहरूको बोर्ड परीक्षा नमुना परीक्षण।",
    isHoliday: false
  },
  {
    id: 'cal-2',
    dateBS: "२०८१ असोज २४",
    dateAD: "2026-10-10",
    title_en: "Dashain Festival Break Begins",
    title_np: "विजया दशमी बिदा प्रारम्भ",
    type: 'holiday',
    description_en: "School closed for Vijaya Dashami festival.",
    description_np: "बडा दशैंको अवसरमा विद्यालय बिदा।",
    isHoliday: true
  },
  {
    id: 'cal-3',
    dateBS: "२०८१ कार्तिक २०",
    dateAD: "2026-11-05",
    title_en: "Chhath Parva Holiday Concludes",
    title_np: "छठ पर्व बिदा समापन",
    type: 'holiday',
    description_en: "Final day of festival break.",
    description_np: "तिहार तथा छठ पर्व बिदाको अन्तिम दिन।",
    isHoliday: true
  },
  {
    id: 'cal-4',
    dateBS: "२०८१ कार्तिक २१",
    dateAD: "2026-11-06",
    title_en: "School Reopens After Festival Vacation",
    title_np: "बिदापछि विद्यालय पुनः सञ्चालन",
    type: 'academic',
    description_en: "Regular morning and day classes resume at 10:00 AM.",
    description_np: "बिहान १० बजेदेखि नियमित पठनपाठन सुरु।",
    isHoliday: false
  },
  {
    id: 'cal-5',
    dateBS: "२०८१ मङ्सिर १२",
    dateAD: "2026-11-27",
    title_en: "Annual Inter-House Sports Meets Inauguration",
    title_np: "वार्षिक खेलकुद प्रतियोगिता उदघाटन",
    type: 'event',
    description_en: "Track events, football matches, and sports parade.",
    description_np: "मार्च पास्ट, दौड, र खेलकुद प्रतियोगिताको समुद्घाटन।",
    isHoliday: false
  }
];

export const mockGalleryAlbums: GalleryAlbum[] = [
  {
    id: 'alb-1',
    title_en: "Annual Science Exhibition & Robotics Fair 2081",
    title_np: "वार्षिक विज्ञान प्रदर्शनी तथा रोबोटिक्स मेला २०८१",
    dateBS: "२०८१ भाद्र २०",
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
    id: 'alb-2',
    title_en: "Saraswati Puja & Cultural Dance Program 2080",
    title_np: "सरस्वती पूजा तथा सास्कृतिक नृत्य समारोह २०८०",
    dateBS: "२०८० माघ २२",
    coverImage: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800",
    photosCount: 38,
    photos: [
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=800"
    ],
    category: "Cultural"
  },
  {
    id: 'alb-3',
    title_en: "New School Building & Computer Lab Inauguration",
    title_np: "नयाँ विद्यालय भवन तथा आधुनिक कम्प्युटर ल्याब उद्घाटन",
    dateBS: "२०८० मङ्सिर १५",
    coverImage: "/src/assets/images/school_hero_banner_1786585998844.jpg",
    photosCount: 16,
    photos: [
      "/src/assets/images/school_hero_banner_1786585998844.jpg",
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
    ],
    category: "Infrastructure"
  }
];

export const mockDocuments: DocumentItem[] = [
  {
    id: 'doc-1',
    title_en: "Grade 1 to 10 Curriculum Syllabus & Book List 2081",
    title_np: "कक्षा १ देखि १० को पाठ्यक्रम, पाठ्यपुस्तक सूची २०८१",
    category: 'general',
    fileType: 'pdf',
    fileSize: '3.2 MB',
    downloadCount: 840,
    url: '#',
    uploadDate: '२०८१ बैशाख १०'
  },
  {
    id: 'doc-2',
    title_en: "SEE Pre-Board Exam Complete Subjectwise Routine 2081",
    title_np: "एस.इ.इ. प्रि-बोर्ड परीक्षाको विषयगत पूर्ण तालिका २०८१",
    category: 'routine',
    fileType: 'pdf',
    fileSize: '1.4 MB',
    downloadCount: 1250,
    url: '#',
    uploadDate: '२०८१ असोज ०४'
  },
  {
    id: 'doc-3',
    title_en: "Student Admission Form & Bus Route Guidelines 2081/82",
    title_np: "छात्रछात्रा भर्ना फार्म तथा बस रुट निर्देशिका २०८१/८२",
    category: 'general',
    fileType: 'pdf',
    fileSize: '820 KB',
    downloadCount: 620,
    url: '#',
    uploadDate: '२०८१ जेठ ०२'
  },
  {
    id: 'doc-4',
    title_en: "Annual Secondary Academic Calendar 2081 (Bikram Sambat)",
    title_np: "वार्षिक माध्यमिक शैक्षिक पात्रो २०८१ (विक्रम संवत्)",
    category: 'holidays',
    fileType: 'pdf',
    fileSize: '2.8 MB',
    downloadCount: 1980,
    url: '#',
    uploadDate: '२०८१ बैशाख ०१'
  }
];

export const mockStaffRoles: StaffRole[] = [
  {
    id: 'staff-1',
    name: "Mr. Ram Bahadur Thapa",
    email: "principal@suryodaya.edu.np",
    designation_en: "Principal",
    designation_np: "प्रधानाध्यापक",
    role: 'principal',
    canPost: true,
    canEdit: true,
    canDelete: true,
    canBroadcastPush: true,
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: 'staff-2',
    name: "Mrs. Sita Adhikari",
    email: "exam.head@suryodaya.edu.np",
    designation_en: "Examination Department Controller",
    designation_np: "परीक्षा नियन्त्रण विभाग प्रमुख",
    role: 'vice_principal',
    canPost: true,
    canEdit: true,
    canDelete: false,
    canBroadcastPush: true,
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: 'staff-3',
    name: "Mr. Krishna Prasad Neupane",
    email: "maths.dept@suryodaya.edu.np",
    designation_en: "Senior Science & Math Coordinator",
    designation_np: "वरिष्ठ विज्ञान तथा गणित संयोजक",
    role: 'teacher',
    canPost: true,
    canEdit: false,
    canDelete: false,
    canBroadcastPush: false,
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: 'staff-4',
    name: "Ms. Sunita Rai",
    email: "admin.desk@suryodaya.edu.np",
    designation_en: "IT & Communication Staff",
    designation_np: "सूचना प्रविधि तथा सञ्चार अधिकृत",
    role: 'admin_staff',
    canPost: true,
    canEdit: true,
    canDelete: false,
    canBroadcastPush: true,
    avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200"
  }
];

export const mockSeeVideos: SeeVideo[] = [
  {
    id: 'see-vid-1',
    title_en: "SEE Batch 2080 Grand Reception & Farewell Ceremony Highlights",
    title_np: "एस.इ.इ. (SEE) २०८० ब्याचको भव्य स्वागत तथा बिदाइ समारोह (रिसेप्सन)",
    description_en: "Official video celebration, cultural performances, motivational addresses by teachers, and token of love distribution for our Grade 10 outgoing batch at Shree Suryodaya Secondary School.",
    description_np: "श्री सूर्योदय माध्यमिक विद्यालयका कक्षा १० का छात्रछात्राको सम्मानमा आयोजित भव्य रिसेप्सन, सांस्कृतिक नृत्य, शिक्षकहरूको शुभकामना मन्तव्य र मायाको चिनो वितरण।",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Embeddable sample
    thumbnailUrl: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=800",
    category: 'reception',
    duration: '24:15',
    instructor_en: "Cultural & Event Committee",
    instructor_np: "सांस्कृतिक तथा कार्यक्रम समिति",
    viewsCount: 3840,
    dateBS: "२०८० चैत १८",
    isFeatured: true
  },
  {
    id: 'see-vid-2',
    title_en: "SEE Compulsory Mathematics - High Scoring Model Questions & Geometry Mastery",
    title_np: "एस.इ.इ. अनिवार्य गणित - उत्कृष्ट अंक ल्याउने नमुना प्रश्न र ज्यामिति समाधान",
    description_en: "Step-by-step solutions for Group D 5-mark geometry proofs, circle theorems, menstruation, and algebra shortcut techniques explained clearly for SEE candidates.",
    description_np: "कक्षा १० एस.इ.इ. परीक्षाका लागि समूह 'घ' का ५-अंकीय ज्यामिति साध्य, वृत्त, क्षेत्रमिति र बीजगणितका महत्त्वपूर्ण प्रश्नहरूको सजिलो विधिबाट समाधान।",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800",
    category: 'math',
    duration: '38:20',
    instructor_en: "Mr. Krishna Prasad Neupane (Senior Math Dept)",
    instructor_np: "कृष्णप्रसाद न्यौपाने (वरिष्ठ गणित शिक्षक)",
    viewsCount: 5120,
    dateBS: "२०८१ भाद्र १०",
    isFeatured: true
  },
  {
    id: 'see-vid-3',
    title_en: "SEE Science & Tech - Chemical Reactions, Electricity & Physics Numericals",
    title_np: "एस.इ.इ. विज्ञान तथा प्रविधि - रासायनिक प्रतिक्रिया, विद्युत र भौतिक विज्ञान गणितीय समस्या",
    description_en: "Complete breakdown of difficult numerical problems in gravitation, force, electricity, and balancing chemical equations with practical exam tips.",
    description_np: "गुरुत्वाकर्षण, बल, करेन्ट विद्युतका हिसाबहरू तथा रासायनिक समीकरण सन्तुलन गर्ने सबैभन्दा छिटो र भरपर्दो उपायहरू।",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800",
    category: 'science',
    duration: '31:45',
    instructor_en: "Science Faculty Team",
    instructor_np: "विज्ञान संकाय समूह",
    viewsCount: 4290,
    dateBS: "२०८१ भाद्र १८",
    isFeatured: false
  },
  {
    id: 'see-vid-4',
    title_en: "SEE English Grammar, Free Writing & Reading Comprehension Scoring Guide",
    title_np: "एस.इ.इ. अंग्रेजी - व्याकरण (Grammar), निबन्ध, चिठी लेखन तथा प्यासेज समाधान",
    description_en: "How to score A+ in SEE English: Report writing, essays, dialogue, conditional clauses, voice, narration, and unseen passage techniques.",
    description_np: "एस.इ.इ. अंग्रेजीमा A+ ग्रेड कसरी प्राप्त गर्ने? निबन्ध, सम्पादकीय चिठी, ट्रान्सफर्मेसन र नदेखेको प्यासेज हल गर्ने विशेष सुत्रहरू।",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800",
    category: 'english',
    duration: '27:10',
    instructor_en: "English Language Faculty",
    instructor_np: "अंग्रेजी भाषा संकाय",
    viewsCount: 3670,
    dateBS: "२०८१ भाद्र २५",
    isFeatured: false
  },
  {
    id: 'see-vid-5',
    title_en: "Top Secrets to Score 4.0 GPA in SEE: Time Management & Stress Relief by Toppers",
    title_np: "एस.इ.इ. मा ४.० GPA कसरी ल्याउने? परीक्षाको डर हटाउने र समय व्यवस्थापन",
    description_en: "Guidance talk and live Q&A session with Suryodaya alumni toppers sharing study schedules, note-taking strategies, and revision tactics.",
    description_np: "सूर्योदयका पूर्व उत्कृष्ट छात्रछात्राद्वारा परीक्षाको तयारी, तनाव व्यवस्थापन र रिभिजन योजना सम्बन्धी विशेष परामर्श।",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
    category: 'tips',
    duration: '19:50',
    instructor_en: "Principal & Student Counseling Desk",
    instructor_np: "प्रधानाध्यापक तथा विद्यार्थी परामर्श शाखा",
    viewsCount: 6810,
    dateBS: "२०८१ असोज ०२",
    isFeatured: true
  },
  {
    id: 'see-vid-6',
    title_en: "Class 10 Farewell Cultural Night & Musical Drama Celebration",
    title_np: "कक्षा १० बिदाइ सांस्कृतिक साँझ तथा नाटक प्रदर्शन",
    description_en: "Memorable glimpses from the annual cultural farewell evening organized by Junior Students for SEE candidates.",
    description_np: "कक्षा ९ का भाइबहिनीहरूद्वारा एस.इ.इ. परीक्षार्थी दाजुभाइ दिदीबहिनीहरूको सम्मानमा प्रस्तुत सांस्कृतिक कार्यक्रम।",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800",
    category: 'reception',
    duration: '16:30',
    instructor_en: "Student Council Suryodaya",
    instructor_np: "विद्यार्थी परिषद सूर्योदय",
    viewsCount: 2940,
    dateBS: "२०८० चैत २०",
    isFeatured: false
  }
];
