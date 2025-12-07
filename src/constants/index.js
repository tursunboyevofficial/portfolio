// Navigation links
export const navLinks = [
  { id: "about", title: "Haqimda" },
  { id: "skills", title: "Ko'nikmalar" },
  { id: "projects", title: "Loyihalar" },
  { id: "contact", title: "Aloqa" },
];

// Personal info
export const personalInfo = {
  name: "Botirjon",
  surname: "Tursunboyev",
  title: "Front End Developer",
  email: "tursunboyevbotirjon8@gmail.com",
  phone: "+998 95 811 01 17",
  location: "Toshkent, O'zbekiston",
  bio: `Doim harakat qilib ko'raman: Yaxshi bo'ladi / Yaxshilikka.
  Men zamonaviy va chiroyli web saytlar yaratishga ishtiyoqmandman.
  React, JavaScript va boshqa front-end texnologiyalar bilan ishlayman.`,
  resumeLink: null,
  social: {
    github: "https://github.com/tursunboyevofficial",
    linkedin: "https://www.linkedin.com/in/botirjon-tursunboyev-a59386277",
    telegram: "https://t.me/tursunboyevofficial",
    instagram: "https://instagram.com/tursunboyevofficial",
  },
};

// Services
export const services = [
  {
    title: "Web Dasturlash",
    icon: "web",
    description: "Zamonaviy va responsive web saytlar yaratish",
  },
  {
    title: "Mobile Ilovalar",
    icon: "mobile",
    description: "React Native va Flutter bilan cross-platform ilovalar",
  },
  {
    title: "Backend Development",
    icon: "backend",
    description: "Node.js, Python, va database dizayn",
  },
  {
    title: "UI/UX Dizayn",
    icon: "design",
    description: "Foydalanuvchilarga qulay interfeyslar yaratish",
  },
];

// Technologies/Skills
export const technologies = [
  { name: "React", icon: "react", level: 90, color: "#61DAFB" },
  { name: "JavaScript", icon: "javascript", level: 92, color: "#F7DF1E" },
  { name: "TypeScript", icon: "typescript", level: 75, color: "#3178C6" },
  { name: "HTML/CSS", icon: "html", level: 95, color: "#E34F26" },
  { name: "Tailwind CSS", icon: "tailwind", level: 88, color: "#06B6D4" },
  { name: "Git", icon: "git", level: 85, color: "#F05032" },
  { name: "Figma", icon: "figma", level: 70, color: "#F24E1E" },
  { name: "Three.js", icon: "threejs", level: 60, color: "#000000" },
];

// Experience
export const experiences = [
  {
    title: "Senior Full Stack Developer",
    company: "Tech Company",
    icon: "briefcase",
    date: "2022 - Hozir",
    points: [
      "React va Node.js yordamida katta hajmdagi web ilovalar ishlab chiqish",
      "Jamoa bilan Agile metodologiyasida ishlash",
      "Code review va mentorlik",
      "CI/CD pipeline'larni sozlash va avtomatlashtirish",
    ],
  },
  {
    title: "Full Stack Developer",
    company: "Startup",
    icon: "rocket",
    date: "2020 - 2022",
    points: [
      "0 dan MVP mahsulot yaratish",
      "REST API va GraphQL backend'lar",
      "AWS va cloud xizmatlari bilan ishlash",
      "Startup muhitida tez va samarali ishlash",
    ],
  },
  {
    title: "Frontend Developer",
    company: "Agency",
    icon: "target",
    date: "2018 - 2020",
    points: [
      "Responsive va mobile-first dizaynlar",
      "JavaScript va React bilan interaktiv UI",
      "SEO optimizatsiya",
      "Cross-browser muvofiqlik",
    ],
  },
];

// Projects
export const projects = [
  {
    key: "ecommerce",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "nodejs", color: "green-text-gradient" },
      { name: "postgresql", color: "pink-text-gradient" },
    ],
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=600",
    sourceCode: "https://github.com",
    liveDemo: "https://example.com",
  },
  {
    key: "taskManagement",
    tags: [
      { name: "nextjs", color: "blue-text-gradient" },
      { name: "typescript", color: "green-text-gradient" },
      { name: "mongodb", color: "pink-text-gradient" },
    ],
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600",
    sourceCode: "https://github.com",
    liveDemo: "https://example.com",
  },
  {
    key: "aiChat",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "openai", color: "green-text-gradient" },
      { name: "tailwind", color: "pink-text-gradient" },
    ],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600",
    sourceCode: "https://github.com",
    liveDemo: "https://example.com",
  },
  {
    key: "fitness",
    tags: [
      { name: "flutter", color: "blue-text-gradient" },
      { name: "firebase", color: "green-text-gradient" },
      { name: "dart", color: "pink-text-gradient" },
    ],
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600",
    sourceCode: "https://github.com",
    liveDemo: "https://example.com",
  },
];

// Testimonials
export const testimonials = [
  {
    testimonial:
      "Botirjon bilan ishlash juda yoqdi. Professional va o'z vaqtida topshiradi.",
    name: "Aziz Karimov",
    designation: "CEO",
    company: "TechStart",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    testimonial:
      "Loyihamizni kutilganidan ham yaxshiroq qilib yakunladi. Tavsiya qilaman!",
    name: "Malika Rahimova",
    designation: "Product Manager",
    company: "InnoHub",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    testimonial:
      "Texnik jihatdan juda kuchli va har doim yangi g'oyalar taklif qiladi.",
    name: "Bobur Toshev",
    designation: "CTO",
    company: "DevCorp",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
];
