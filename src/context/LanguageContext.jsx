import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const languages = {
  uz: { code: 'uz', name: "O'zbekcha", flag: '🇺🇿' },
  en: { code: 'en', name: 'English', flag: '🇺🇸' },
  ru: { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  tr: { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  de: { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
};

export const translations = {
  uz: {
    // Navbar
    nav: {
      about: 'Haqimda',
      skills: "Ko'nikmalar",
      projects: 'Loyihalar',
      contact: 'Aloqa',
    },
    // Hero
    hero: {
      greeting: 'Salom, men',
      viewProjects: "Loyihalarni ko'rish",
      contactMe: "Bog'lanish",
      bio: "Doim harakat qilib ko'raman: Yaxshi bo'ladi / Yaxshilikka. Men zamonaviy va chiroyli web saytlar yaratishga ishtiyoqmandman. React, JavaScript va boshqa front-end texnologiyalar bilan ishlayman.",
    },
    // Stats
    stats: {
      years: 'Yillik tajriba',
      projects: 'Loyihalar',
      clients: 'Mijozlar',
      satisfaction: 'Mamnunlik',
    },
    // Experience
    experience: {
      senior: {
        title: 'Senior Full Stack Developer',
        company: 'Tech Company',
        date: '2022 - Hozir',
        points: [
          'React va Node.js yordamida katta hajmdagi web ilovalar ishlab chiqish',
          'Jamoa bilan Agile metodologiyasida ishlash',
          'Code review va mentorlik',
          "CI/CD pipeline'larni sozlash va avtomatlashtirish",
        ],
      },
      fullstack: {
        title: 'Full Stack Developer',
        company: 'Startup',
        date: '2020 - 2022',
        points: [
          '0 dan MVP mahsulot yaratish',
          "REST API va GraphQL backend'lar",
          'AWS va cloud xizmatlari bilan ishlash',
          'Startup muhitida tez va samarali ishlash',
        ],
      },
      frontend: {
        title: 'Frontend Developer',
        company: 'Agency',
        date: '2018 - 2020',
        points: [
          'Responsive va mobile-first dizaynlar',
          'JavaScript va React bilan interaktiv UI',
          'SEO optimizatsiya',
          'Cross-browser muvofiqlik',
        ],
      },
    },
    // About
    about: {
      subtitle: 'Kirish',
      title: 'Umumiy ma\'lumot',
      description: "Men professional web dasturchi bo'lib, zamonaviy va samarali web ilovalar yaratishga ixtisoslashganman. Foydalanuvchi tajribasiga e'tibor berib, chiroyli va funksional interfeyslar yarataman.",
      servicesTitle: 'Xizmatlar',
    },
    // Skills
    skills: {
      subtitle: 'Qobiliyatlar',
      title: "Ko'nikmalar va Tajriba",
      technologies: 'Texnologiyalar',
      experience: 'Ish tajribasi',
      dailyTech: 'Kundalik foydalaniladigan texnologiyalar',
    },
    // Projects
    projects: {
      subtitle: 'Ishlarim',
      title: 'Loyihalar',
      description: "Quyidagi loyihalar mening ko'nikmalarim va tajribamni aks ettiradi. Har bir loyihada qisqacha tavsif va code hamda demo havolalari mavjud.",
      moreProjects: "Ko'proq loyihalar",
      // Project cards
      ecommerce: {
        name: 'E-Commerce Platform',
        description: "To'liq funksional online do'kon platformasi. Payment integratsiya, admin panel, va real-time xabarlar.",
      },
      taskManagement: {
        name: 'Task Management App',
        description: 'Jamoa uchun task management tizimi. Real-time yangilanishlar, drag-drop, va Telegram integratsiya.',
      },
      aiChat: {
        name: 'AI Chat Application',
        description: 'ChatGPT API bilan integratsiya qilingan chat ilova. Voice input, history saqlash, va export funksiyalari.',
      },
      fitness: {
        name: 'Fitness Tracker',
        description: 'Shaxsiy fitness va ovqatlanish kuzatuvchisi. Grafiklar, maqsadlar, va progress tracking.',
      },
    },
    // Contact
    contact: {
      subtitle: 'Aloqa',
      title: "Bog'lanish",
      description: "Loyihangiz haqida gaplashmoqchimisiz? Yoki shunchaki salomlashmoqchisiz? Men bilan bog'laning va tez orada javob olasiz!",
      email: 'Email',
      phone: 'Telefon',
      location: 'Joylashuv',
      social: 'Ijtimoiy tarmoqlar',
      formTitle: 'Xabar yuborish',
      name: 'Ismingiz',
      namePlaceholder: 'Ismingizni kiriting',
      emailPlaceholder: 'email@example.com',
      message: 'Xabar',
      messagePlaceholder: 'Xabaringizni yozing...',
      sending: 'Yuborilmoqda...',
      sent: 'Yuborildi!',
      send: 'Yuborish',
    },
    // Footer
    footer: {
      rights: 'Barcha huquqlar himoyalangan',
      madeWith: 'bilan yaratilgan',
    },
    // Services
    services: {
      web: 'Web Dasturlash',
      webDesc: 'Zamonaviy va responsive web saytlar yaratish',
      mobile: 'Mobile Ilovalar',
      mobileDesc: 'React Native va Flutter bilan cross-platform ilovalar',
      backend: 'Backend Development',
      backendDesc: 'Node.js, Python, va database dizayn',
      design: 'UI/UX Dizayn',
      designDesc: 'Foydalanuvchilarga qulay interfeyslar yaratish',
    },
    // Settings
    settings: {
      title: 'Sozlamalar',
      language: 'Til',
      theme: 'Mavzu',
      preview: "Ko'rish",
    },
  },
  en: {
    nav: {
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      contact: 'Contact',
    },
    hero: {
      greeting: "Hi, I'm",
      viewProjects: 'View Projects',
      contactMe: 'Contact Me',
      bio: "I always try: It will be good / For the better. I'm passionate about creating modern and beautiful websites. I work with React, JavaScript and other front-end technologies.",
    },
    stats: {
      years: 'Years exp.',
      projects: 'Projects',
      clients: 'Clients',
      satisfaction: 'Satisfaction',
    },
    experience: {
      senior: {
        title: 'Senior Full Stack Developer',
        company: 'Tech Company',
        date: '2022 - Present',
        points: [
          'Developing large-scale web applications with React and Node.js',
          'Working with the team in Agile methodology',
          'Code review and mentorship',
          'Setting up and automating CI/CD pipelines',
        ],
      },
      fullstack: {
        title: 'Full Stack Developer',
        company: 'Startup',
        date: '2020 - 2022',
        points: [
          'Creating MVP product from scratch',
          'REST API and GraphQL backends',
          'Working with AWS and cloud services',
          'Fast and efficient work in startup environment',
        ],
      },
      frontend: {
        title: 'Frontend Developer',
        company: 'Agency',
        date: '2018 - 2020',
        points: [
          'Responsive and mobile-first designs',
          'Interactive UI with JavaScript and React',
          'SEO optimization',
          'Cross-browser compatibility',
        ],
      },
    },
    about: {
      subtitle: 'Introduction',
      title: 'Overview',
      description: "I'm a professional web developer specializing in creating modern and efficient web applications. I focus on user experience to create beautiful and functional interfaces.",
      servicesTitle: 'Services',
    },
    skills: {
      subtitle: 'Skills',
      title: 'Skills & Experience',
      technologies: 'Technologies',
      experience: 'Work Experience',
      dailyTech: 'Daily used technologies',
    },
    projects: {
      subtitle: 'My Work',
      title: 'Projects',
      description: 'The following projects reflect my skills and experience. Each project has a brief description and links to code and demo.',
      moreProjects: 'More Projects',
      ecommerce: {
        name: 'E-Commerce Platform',
        description: 'Fully functional online store platform. Payment integration, admin panel, and real-time notifications.',
      },
      taskManagement: {
        name: 'Task Management App',
        description: 'Team task management system. Real-time updates, drag-drop, and Telegram integration.',
      },
      aiChat: {
        name: 'AI Chat Application',
        description: 'Chat app integrated with ChatGPT API. Voice input, history saving, and export features.',
      },
      fitness: {
        name: 'Fitness Tracker',
        description: 'Personal fitness and nutrition tracker. Charts, goals, and progress tracking.',
      },
    },
    contact: {
      subtitle: 'Contact',
      title: 'Get in Touch',
      description: "Want to discuss your project? Or just say hello? Contact me and I'll get back to you soon!",
      email: 'Email',
      phone: 'Phone',
      location: 'Location',
      social: 'Social Networks',
      formTitle: 'Send a Message',
      name: 'Your Name',
      namePlaceholder: 'Enter your name',
      emailPlaceholder: 'email@example.com',
      message: 'Message',
      messagePlaceholder: 'Write your message...',
      sending: 'Sending...',
      sent: 'Sent!',
      send: 'Send',
    },
    footer: {
      rights: 'All rights reserved',
      madeWith: 'Made with',
    },
    services: {
      web: 'Web Development',
      webDesc: 'Creating modern and responsive websites',
      mobile: 'Mobile Apps',
      mobileDesc: 'Cross-platform apps with React Native and Flutter',
      backend: 'Backend Development',
      backendDesc: 'Node.js, Python, and database design',
      design: 'UI/UX Design',
      designDesc: 'Creating user-friendly interfaces',
    },
    settings: {
      title: 'Settings',
      language: 'Language',
      theme: 'Theme',
      preview: 'Preview',
    },
  },
  ru: {
    nav: {
      about: 'Обо мне',
      skills: 'Навыки',
      projects: 'Проекты',
      contact: 'Контакт',
    },
    hero: {
      greeting: 'Привет, я',
      viewProjects: 'Смотреть проекты',
      contactMe: 'Связаться',
      bio: 'Всегда стараюсь: Будет хорошо / К лучшему. Я увлечён созданием современных и красивых веб-сайтов. Работаю с React, JavaScript и другими front-end технологиями.',
    },
    stats: {
      years: 'Лет опыта',
      projects: 'Проекты',
      clients: 'Клиенты',
      satisfaction: 'Удовлетворённость',
    },
    experience: {
      senior: {
        title: 'Senior Full Stack Developer',
        company: 'Tech Company',
        date: '2022 - Настоящее время',
        points: [
          'Разработка крупномасштабных веб-приложений на React и Node.js',
          'Работа в команде по методологии Agile',
          'Code review и менторство',
          'Настройка и автоматизация CI/CD pipeline',
        ],
      },
      fullstack: {
        title: 'Full Stack Developer',
        company: 'Startup',
        date: '2020 - 2022',
        points: [
          'Создание MVP продукта с нуля',
          'REST API и GraphQL бэкенды',
          'Работа с AWS и облачными сервисами',
          'Быстрая и эффективная работа в стартап-среде',
        ],
      },
      frontend: {
        title: 'Frontend Developer',
        company: 'Agency',
        date: '2018 - 2020',
        points: [
          'Адаптивные и mobile-first дизайны',
          'Интерактивный UI на JavaScript и React',
          'SEO оптимизация',
          'Кросс-браузерная совместимость',
        ],
      },
    },
    about: {
      subtitle: 'Введение',
      title: 'Обзор',
      description: 'Я профессиональный веб-разработчик, специализирующийся на создании современных и эффективных веб-приложений. Я уделяю внимание пользовательскому опыту для создания красивых и функциональных интерфейсов.',
      servicesTitle: 'Услуги',
    },
    skills: {
      subtitle: 'Навыки',
      title: 'Навыки и Опыт',
      technologies: 'Технологии',
      experience: 'Опыт работы',
      dailyTech: 'Ежедневно используемые технологии',
    },
    projects: {
      subtitle: 'Мои работы',
      title: 'Проекты',
      description: 'Следующие проекты отражают мои навыки и опыт. Каждый проект имеет краткое описание и ссылки на код и демо.',
      moreProjects: 'Больше проектов',
      ecommerce: {
        name: 'E-Commerce Платформа',
        description: 'Полнофункциональная платформа интернет-магазина. Платежная интеграция, админ-панель и уведомления в реальном времени.',
      },
      taskManagement: {
        name: 'Управление задачами',
        description: 'Система управления задачами для команды. Обновления в реальном времени, drag-drop и интеграция с Telegram.',
      },
      aiChat: {
        name: 'AI Чат приложение',
        description: 'Чат-приложение с интеграцией ChatGPT API. Голосовой ввод, сохранение истории и экспорт.',
      },
      fitness: {
        name: 'Фитнес трекер',
        description: 'Персональный трекер фитнеса и питания. Графики, цели и отслеживание прогресса.',
      },
    },
    contact: {
      subtitle: 'Контакт',
      title: 'Связаться',
      description: 'Хотите обсудить ваш проект? Или просто поздороваться? Свяжитесь со мной, и я отвечу вам в ближайшее время!',
      email: 'Почта',
      phone: 'Телефон',
      location: 'Местоположение',
      social: 'Социальные сети',
      formTitle: 'Отправить сообщение',
      name: 'Ваше имя',
      namePlaceholder: 'Введите ваше имя',
      emailPlaceholder: 'email@example.com',
      message: 'Сообщение',
      messagePlaceholder: 'Напишите ваше сообщение...',
      sending: 'Отправка...',
      sent: 'Отправлено!',
      send: 'Отправить',
    },
    footer: {
      rights: 'Все права защищены',
      madeWith: 'Сделано с',
    },
    services: {
      web: 'Веб-разработка',
      webDesc: 'Создание современных и адаптивных сайтов',
      mobile: 'Мобильные приложения',
      mobileDesc: 'Кроссплатформенные приложения на React Native и Flutter',
      backend: 'Backend разработка',
      backendDesc: 'Node.js, Python и проектирование баз данных',
      design: 'UI/UX Дизайн',
      designDesc: 'Создание удобных интерфейсов',
    },
    settings: {
      title: 'Настройки',
      language: 'Язык',
      theme: 'Тема',
      preview: 'Предпросмотр',
    },
  },
  tr: {
    nav: {
      about: 'Hakkımda',
      skills: 'Yetenekler',
      projects: 'Projeler',
      contact: 'İletişim',
    },
    hero: {
      greeting: 'Merhaba, ben',
      viewProjects: 'Projeleri Gör',
      contactMe: 'İletişim',
      bio: 'Her zaman deniyorum: İyi olacak / Daha iyiye. Modern ve güzel web siteleri oluşturmaya tutkuluyum. React, JavaScript ve diğer front-end teknolojileriyle çalışıyorum.',
    },
    stats: {
      years: 'Yıl deneyim',
      projects: 'Projeler',
      clients: 'Müşteriler',
      satisfaction: 'Memnuniyet',
    },
    experience: {
      senior: {
        title: 'Senior Full Stack Developer',
        company: 'Tech Company',
        date: '2022 - Şu an',
        points: [
          'React ve Node.js ile büyük ölçekli web uygulamaları geliştirme',
          'Agile metodolojisinde takımla çalışma',
          'Code review ve mentorluk',
          'CI/CD pipeline kurulumu ve otomasyonu',
        ],
      },
      fullstack: {
        title: 'Full Stack Developer',
        company: 'Startup',
        date: '2020 - 2022',
        points: [
          'Sıfırdan MVP ürün oluşturma',
          'REST API ve GraphQL backend',
          'AWS ve bulut hizmetleriyle çalışma',
          'Startup ortamında hızlı ve verimli çalışma',
        ],
      },
      frontend: {
        title: 'Frontend Developer',
        company: 'Agency',
        date: '2018 - 2020',
        points: [
          'Duyarlı ve mobile-first tasarımlar',
          'JavaScript ve React ile interaktif UI',
          'SEO optimizasyonu',
          'Çapraz tarayıcı uyumluluğu',
        ],
      },
    },
    about: {
      subtitle: 'Giriş',
      title: 'Genel Bakış',
      description: 'Modern ve verimli web uygulamaları oluşturmada uzmanlaşmış profesyonel bir web geliştiricisiyim. Güzel ve işlevsel arayüzler oluşturmak için kullanıcı deneyimine odaklanıyorum.',
      servicesTitle: 'Hizmetler',
    },
    skills: {
      subtitle: 'Yetenekler',
      title: 'Yetenekler ve Deneyim',
      technologies: 'Teknolojiler',
      experience: 'İş Deneyimi',
      dailyTech: 'Günlük kullanılan teknolojiler',
    },
    projects: {
      subtitle: 'Çalışmalarım',
      title: 'Projeler',
      description: 'Aşağıdaki projeler becerilerimi ve deneyimimi yansıtmaktadır. Her projenin kısa bir açıklaması ve kod ile demo bağlantıları bulunmaktadır.',
      moreProjects: 'Daha Fazla Proje',
      ecommerce: {
        name: 'E-Ticaret Platformu',
        description: 'Tam işlevsel online mağaza platformu. Ödeme entegrasyonu, yönetici paneli ve gerçek zamanlı bildirimler.',
      },
      taskManagement: {
        name: 'Görev Yönetimi Uygulaması',
        description: 'Ekip görev yönetim sistemi. Gerçek zamanlı güncellemeler, sürükle-bırak ve Telegram entegrasyonu.',
      },
      aiChat: {
        name: 'AI Sohbet Uygulaması',
        description: 'ChatGPT API entegreli sohbet uygulaması. Sesli giriş, geçmiş kaydetme ve dışa aktarma özellikleri.',
      },
      fitness: {
        name: 'Fitness Takipçisi',
        description: 'Kişisel fitness ve beslenme takipçisi. Grafikler, hedefler ve ilerleme takibi.',
      },
    },
    contact: {
      subtitle: 'İletişim',
      title: 'İletişime Geç',
      description: 'Projenizi tartışmak mı istiyorsunuz? Ya da sadece merhaba demek mi? Benimle iletişime geçin, en kısa sürede size döneceğim!',
      email: 'E-posta',
      phone: 'Telefon',
      location: 'Konum',
      social: 'Sosyal Ağlar',
      formTitle: 'Mesaj Gönder',
      name: 'Adınız',
      namePlaceholder: 'Adınızı girin',
      emailPlaceholder: 'email@example.com',
      message: 'Mesaj',
      messagePlaceholder: 'Mesajınızı yazın...',
      sending: 'Gönderiliyor...',
      sent: 'Gönderildi!',
      send: 'Gönder',
    },
    footer: {
      rights: 'Tüm hakları saklıdır',
      madeWith: 'ile yapıldı',
    },
    services: {
      web: 'Web Geliştirme',
      webDesc: 'Modern ve duyarlı web siteleri oluşturma',
      mobile: 'Mobil Uygulamalar',
      mobileDesc: 'React Native ve Flutter ile çapraz platform uygulamaları',
      backend: 'Backend Geliştirme',
      backendDesc: 'Node.js, Python ve veritabanı tasarımı',
      design: 'UI/UX Tasarım',
      designDesc: 'Kullanıcı dostu arayüzler oluşturma',
    },
    settings: {
      title: 'Ayarlar',
      language: 'Dil',
      theme: 'Tema',
      preview: 'Önizleme',
    },
  },
  de: {
    nav: {
      about: 'Über mich',
      skills: 'Fähigkeiten',
      projects: 'Projekte',
      contact: 'Kontakt',
    },
    hero: {
      greeting: 'Hallo, ich bin',
      viewProjects: 'Projekte ansehen',
      contactMe: 'Kontaktieren',
      bio: 'Ich versuche immer: Es wird gut / Zum Besseren. Ich bin leidenschaftlich daran interessiert, moderne und schöne Websites zu erstellen. Ich arbeite mit React, JavaScript und anderen Front-End-Technologien.',
    },
    stats: {
      years: 'Jahre Erfahrung',
      projects: 'Projekte',
      clients: 'Kunden',
      satisfaction: 'Zufriedenheit',
    },
    experience: {
      senior: {
        title: 'Senior Full Stack Developer',
        company: 'Tech Company',
        date: '2022 - Heute',
        points: [
          'Entwicklung großer Webanwendungen mit React und Node.js',
          'Teamarbeit nach Agile-Methodik',
          'Code Review und Mentoring',
          'Einrichtung und Automatisierung von CI/CD-Pipelines',
        ],
      },
      fullstack: {
        title: 'Full Stack Developer',
        company: 'Startup',
        date: '2020 - 2022',
        points: [
          'MVP-Produkt von Grund auf erstellen',
          'REST API und GraphQL Backends',
          'Arbeit mit AWS und Cloud-Diensten',
          'Schnelle und effiziente Arbeit im Startup-Umfeld',
        ],
      },
      frontend: {
        title: 'Frontend Developer',
        company: 'Agency',
        date: '2018 - 2020',
        points: [
          'Responsive und Mobile-First-Designs',
          'Interaktives UI mit JavaScript und React',
          'SEO-Optimierung',
          'Cross-Browser-Kompatibilität',
        ],
      },
    },
    about: {
      subtitle: 'Einführung',
      title: 'Überblick',
      description: 'Ich bin ein professioneller Webentwickler, der sich auf die Erstellung moderner und effizienter Webanwendungen spezialisiert hat. Ich konzentriere mich auf die Benutzererfahrung, um schöne und funktionale Oberflächen zu erstellen.',
      servicesTitle: 'Dienstleistungen',
    },
    skills: {
      subtitle: 'Fähigkeiten',
      title: 'Fähigkeiten & Erfahrung',
      technologies: 'Technologien',
      experience: 'Berufserfahrung',
      dailyTech: 'Täglich verwendete Technologien',
    },
    projects: {
      subtitle: 'Meine Arbeit',
      title: 'Projekte',
      description: 'Die folgenden Projekte spiegeln meine Fähigkeiten und Erfahrungen wider. Jedes Projekt hat eine kurze Beschreibung und Links zu Code und Demo.',
      moreProjects: 'Mehr Projekte',
      ecommerce: {
        name: 'E-Commerce Plattform',
        description: 'Voll funktionsfähige Online-Shop-Plattform. Zahlungsintegration, Admin-Panel und Echtzeit-Benachrichtigungen.',
      },
      taskManagement: {
        name: 'Aufgabenverwaltung',
        description: 'Team-Aufgabenverwaltungssystem. Echtzeit-Updates, Drag-Drop und Telegram-Integration.',
      },
      aiChat: {
        name: 'AI Chat Anwendung',
        description: 'Chat-App mit ChatGPT API-Integration. Spracheingabe, Verlaufsspeicherung und Exportfunktionen.',
      },
      fitness: {
        name: 'Fitness Tracker',
        description: 'Persönlicher Fitness- und Ernährungstracker. Diagramme, Ziele und Fortschrittsverfolgung.',
      },
    },
    contact: {
      subtitle: 'Kontakt',
      title: 'Kontakt aufnehmen',
      description: 'Möchten Sie über Ihr Projekt sprechen? Oder einfach nur Hallo sagen? Kontaktieren Sie mich und ich werde mich bald bei Ihnen melden!',
      email: 'E-Mail',
      phone: 'Telefon',
      location: 'Standort',
      social: 'Soziale Netzwerke',
      formTitle: 'Nachricht senden',
      name: 'Ihr Name',
      namePlaceholder: 'Geben Sie Ihren Namen ein',
      emailPlaceholder: 'email@example.com',
      message: 'Nachricht',
      messagePlaceholder: 'Schreiben Sie Ihre Nachricht...',
      sending: 'Senden...',
      sent: 'Gesendet!',
      send: 'Senden',
    },
    footer: {
      rights: 'Alle Rechte vorbehalten',
      madeWith: 'Erstellt mit',
    },
    services: {
      web: 'Webentwicklung',
      webDesc: 'Erstellung moderner und responsiver Websites',
      mobile: 'Mobile Apps',
      mobileDesc: 'Plattformübergreifende Apps mit React Native und Flutter',
      backend: 'Backend-Entwicklung',
      backendDesc: 'Node.js, Python und Datenbankdesign',
      design: 'UI/UX Design',
      designDesc: 'Benutzerfreundliche Oberflächen erstellen',
    },
    settings: {
      title: 'Einstellungen',
      language: 'Sprache',
      theme: 'Thema',
      preview: 'Vorschau',
    },
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('portfolio-language');
    return saved || 'uz';
  });

  useEffect(() => {
    localStorage.setItem('portfolio-language', language);
  }, [language]);

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languages }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
