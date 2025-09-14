export type Language = "en" | "ar"

export const translations = {
  en: {
    // Navigation
    home: "Home",
    about: "About",
    skills: "Skills",
    projects: "Projects",
    services: "Services",
    certifications: "Certifications",
    contact: "Contact",

    // Hero Section
    heroTitle: "Software Engineer & Penetration Tester",
    heroSubtitle: "Building secure, high-performance applications with AI, cybersecurity, and modern technologies",
    heroDescription: "8+ years of experience in software engineering, penetration testing, web development, desktop applications, and Android development. Currently studying Dentistry at King Salman International University",
    viewWork: "View My Work",
    downloadResume: "Download Resume",

    // About Section
    aboutTitle: "About Me",
    aboutDescription: "Passionate software engineer and penetration tester with expertise in full-stack development, cybersecurity, AI development, and mobile applications",

    // Skills Section
    skillsTitle: "Technical Skills",
    skillsDescription: "Technologies and tools I work with",

    // Projects Section
    projectsTitle: "Featured Projects",
    projectsDescription: "A selection of my recent work",
    allProjects: "All",
    webProjects: "Web",
    mobileProjects: "Mobile",
    desktopProjects: "Desktop",
    securityProjects: "Security",
    aiProjects: "AI/ML",
    viewLive: "View Live",
    viewCode: "View Code",
    caseStudy: "Case Study",

    // Contact Section
    contactTitle: "Get In Touch",
    contactDescription: "Let's discuss your next project",
    contactForm: {
      name: "Name",
      email: "Email",
      subject: "Subject",
      message: "Message",
      send: "Send Message",
      sending: "Sending...",
      success: "Message sent successfully!",
      error: "Failed to send message. Please try again.",
    },

    // Footer
    availability: "Available for freelance and contract work",
    rights: "All rights reserved",
  },
  ar: {
    // Navigation
    home: "الرئيسية",
    about: "نبذة",
    skills: "المهارات",
    projects: "المشاريع",
    services: "الخدمات",
    certifications: "الشهادات",
    contact: "التواصل",

    // Hero Section
    heroTitle: "مهندس برمجيات ومختبر اختراق",
    heroSubtitle: "بناء تطبيقات آمنة وعالية الأداء مع الذكاء الاصطناعي والأمن السيبراني والتقنيات الحديثة",
    heroDescription: "أكثر من 8 سنوات خبرة في هندسة البرمجيات واختبار الاختراق وتطوير الويب وتطبيقات سطح المكتب وتطوير الأندرويد. أدرس حالياً طب الأسنان في جامعة الملك سلمان الدولية",
    viewWork: "عرض أعمالي",
    downloadResume: "تحميل السيرة الذاتية",

    // About Section
    aboutTitle: "نبذة عني",
    aboutDescription: "مهندس برمجيات ومختبر اختراق شغوف بخبرة في التطوير الشامل والأمن السيبراني وتطوير الذكاء الاصطناعي والتطبيقات المحمولة",

    // Skills Section
    skillsTitle: "المهارات التقنية",
    skillsDescription: "التقنيات والأدوات التي أعمل بها",

    // Projects Section
    projectsTitle: "المشاريع المميزة",
    projectsDescription: "مجموعة مختارة من أعمالي الحديثة",
    allProjects: "الكل",
    webProjects: "ويب",
    mobileProjects: "محمول",
    desktopProjects: "سطح المكتب",
    securityProjects: "أمان",
    aiProjects: "ذكاء اصطناعي",
    viewLive: "عرض مباشر",
    viewCode: "عرض الكود",
    caseStudy: "دراسة الحالة",

    // Contact Section
    contactTitle: "تواصل معي",
    contactDescription: "لنناقش مشروعك القادم",
    contactForm: {
      name: "الاسم",
      email: "البريد الإلكتروني",
      subject: "الموضوع",
      message: "الرسالة",
      send: "إرسال الرسالة",
      sending: "جاري الإرسال...",
      success: "تم إرسال الرسالة بنجاح!",
      error: "فشل في إرسال الرسالة. يرجى المحاولة مرة أخرى.",
    },

    // Footer
    availability: "متاح للعمل الحر والعقود",
    rights: "جميع الحقوق محفوظة",
  },
}

export function useTranslation(language: Language) {
  return translations[language]
}
