"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "ru" | "uz"

type Translations = {
  [key: string]: {
    ru: string
    uz: string
  }
}

// Define all translations here
const translations: Translations = {
  // Navigation
  "nav.track": {
    ru: "Отслеживать посылку",
    uz: "Yuborma kuzatuvi",
  },
  "nav.services": {
    ru: "Наши услуги",
    uz: "Bizning xizmatlar",
  },
  "nav.about": {
    ru: "О нас",
    uz: "Biz haqimizda",
  },
  "nav.partners": {
    ru: "Наши партнеры",
    uz: "Bizning hamkorlar",
  },

  // Hero section
  "hero.title": {
    ru: "Hafsiz Kargo - ваш надежный курьерский партнер",
    uz: "Hafsiz Kargo - sizning ishonchli kuryer hamkoringiz",
  },
  "hero.description": {
    ru: "Мы - динамично развивающаяся компания, предоставляющая профессиональные услуги в сфере грузоперевозок, туризма и консалтинга. Наша цель - предложить надежные решения, ориентированные на потребности наших клиентов.",
    uz: "Biz yuk tashish, turizm va konsalting sohasida professional xizmatlar ko'rsatuvchi dinamik rivojlanayotgan kompaniyamiz. Bizning maqsadimiz - mijozlarimizning ehtiyojlariga yo'naltirilgan ishonchli yechimlarni taklif qilish.",
  },

  // Tracking section
  "track.title": {
    ru: "Отслеживайте свою",
    uz: "O'z yubormanggizni",
  },
  "track.highlight": {
    ru: "посылка",
    uz: "kuzating",
  },
  "track.description": {
    ru: "Отслеживайте статус и местоположение вашей посылки в режиме реального времени. Введите номер отслеживания и получите актуальную информацию о местонахождении вашего груза.",
    uz: "Yubormanggizning holati va joylashuvini real vaqt rejimida kuzating. Kuzatuv raqamini kiriting va yukinggizning joylashuvi haqida dolzarb ma'lumot oling.",
  },
  "track.placeholder": {
    ru: "Введите номер отслеживания",
    uz: "Kuzatuv raqamini kiriting",
  },
  "track.button": {
    ru: "Отследить",
    uz: "Kuzatish",
  },
  "track.support": {
    ru: "Для получения дополнительной информации о вашей посылке, пожалуйста, свяжитесь с нашей службой поддержки.",
    uz: "Yubormanggiz haqida qo'shimcha ma'lumot olish uchun, iltimos, bizning qo'llab-quvvatlash xizmatimiz bilan bog'laning.",
  },

  // Services section
  "services.title": {
    ru: "Наши услуги",
    uz: "Bizning xizmatlar",
  },

  // About section
  "about.title": {
    ru: "О нас",
    uz: "Biz haqimizda",
  },
  "about.subtitle": {
    ru: "Hafsiz Kargo",
    uz: "Hafsiz Kargo",
  },
  "about.description1": {
    ru: "Мы - динамично развивающаяся компания, предоставляющая профессиональные услуги в сфере грузоперевозок, туризма и консалтинга. Наша цель - предложить надежные решения, ориентированные на потребности наших клиентов.",
    uz: "Biz yuk tashish, turizm va konsalting sohasida professional xizmatlar ko'rsatuvchi dinamik rivojlanayotgan kompaniyamiz. Bizning maqsadimiz - mijozlarimizning ehtiyojlariga yo'naltirilgan ishonchli yechimlarni taklif qilish.",
  },
  "about.description2": {
    ru: "С момента основания компании мы стремимся к постоянному совершенствованию наших услуг, внедрению инновационных технологий и повышению качества обслуживания клиентов.",
    uz: "Kompaniya tashkil etilgan kundan boshlab, biz xizmatlarimizni doimiy takomillashtirish, innovatsion texnologiyalarni joriy etish va mijozlarga xizmat ko'rsatish sifatini oshirishga intilamiz.",
  },

  // Contact form
  "contact.title": {
    ru: "Связаться с нами",
    uz: "Biz bilan bog'lanish",
  },
  "contact.description": {
    ru: "Оставьте свои контактные данные, и мы свяжемся с вами в ближайшее время.",
    uz: "Aloqa ma'lumotlaringizni qoldiring va biz siz bilan tez orada bog'lanamiz.",
  },
  "contact.firstName": {
    ru: "Имя",
    uz: "Ism",
  },
  "contact.lastName": {
    ru: "Фамилия",
    uz: "Familiya",
  },
  "contact.phone": {
    ru: "Номер телефона",
    uz: "Telefon raqami",
  },
  "contact.email": {
    ru: "Электронная почта",
    uz: "Elektron pochta",
  },
  "contact.message": {
    ru: "Сообщение",
    uz: "Xabar",
  },
  "contact.submit": {
    ru: "Отправить",
    uz: "Yuborish",
  },
  "contact.success": {
    ru: "Спасибо! Ваше сообщение успешно отправлено. Мы свяжемся с вами в ближайшее время.",
    uz: "Rahmat! Xabaringiz muvaffaqiyatli yuborildi. Tez orada siz bilan bog'lanamiz.",
  },
  "contact.error": {
    ru: "Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте еще раз позже.",
    uz: "Xabar yuborishda xatolik yuz berdi. Iltimos, keyinroq qayta urinib ko'ring.",
  },
  "contact.sending": {
    ru: "Отправка...",
    uz: "Yuborilmoqda...",
  },

  // Partners section
  "partners.title": {
    ru: "Наши партнеры",
    uz: "Bizning hamkorlar",
  },

  // Footer
  "footer.copyright": {
    ru: "Все права защищены.",
    uz: "Barcha huquqlar himoyalangan.",
  },

  // Tracking results
  "tracking.info": {
    ru: "Информация о посылке",
    uz: "Yuborma haqida ma'lumot",
  },
  "tracking.number": {
    ru: "Номер отслеживания:",
    uz: "Kuzatuv raqami:",
  },
  "tracking.status": {
    ru: "Статус:",
    uz: "Holati:",
  },
  "tracking.sender": {
    ru: "Отправитель:",
    uz: "Yuboruvchi:",
  },
  "tracking.recipient": {
    ru: "Получатель:",
    uz: "Qabul qiluvchi:",
  },
  "tracking.weight": {
    ru: "Вес:",
    uz: "Og'irligi:",
  },
  "tracking.cost": {
    ru: "Стоимость:",
    uz: "Narxi:",
  },
  "tracking.history": {
    ru: "История отправления",
    uz: "Yuborma tarixi",
  },
  "tracking.kg": {
    ru: "кг",
    uz: "kg",
  },
  "tracking.sum": {
    ru: "сум",
    uz: "so'm",
  },

  // Status names
  "status.packaging": {
    ru: "На упаковке",
    uz: "Qadoqlashda",
  },
  "status.sent": {
    ru: "Посылка отправлено",
    uz: "Yuborma jo'natildi",
  },
  "status.customs": {
    ru: "Таможенном оформлении",
    uz: "Bojxona rasmiylashtiruvi",
  },
  "status.warehouse": {
    ru: "На складе",
    uz: "Omborxonada",
  },
  "status.delivery": {
    ru: "На доставке",
    uz: "Yetkazib berishda",
  },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("ru")

  // Load language preference from localStorage on client side
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "ru" || savedLanguage === "uz")) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  // Translation function
  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`)
      return key
    }
    return translations[key][language]
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

