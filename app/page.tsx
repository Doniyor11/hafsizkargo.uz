"use client"

import Image from "next/image"
import Link from "next/link"
import { Phone, Mail } from "lucide-react"
import PartnersSlider from "@/components/partners-slider"
import ContactForm from "@/components/contact-form"
import TrackingForm from "@/components/tracking-form"
import LanguageSwitcher from "@/components/language-switcher"
import MobileMenu from "@/components/mobile-menu"
import { useLanguage } from "@/contexts/language-context"

export default function Home() {
  return <HomeContent />
}

function HomeContent() {
  const { t } = useLanguage()

  const services = [
    {
      id: 1,
      title: "Грузоперевозки",
      description: "Международные и локальные грузоперевозки с полным документальным сопровождением.",
      image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Таможенное оформление",
      description: "Профессиональное таможенное оформление грузов и документов для международных перевозок.",
      image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Туры",
      description: "Организация туристических поездок и бизнес-туров с полным сопровождением.",
      image: "https://images.unsplash.com/photo-1526495124232-a04e1849168c?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 4,
      title: "Бизнес-услуги",
      description: "Консалтинговые услуги для бизнеса, включая логистику, документооборот и оптимизацию процессов.",
      image: "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?q=80&w=800&auto=format&fit=crop",
    },
  ]

  return (
    <main className="min-h-screen flex flex-col">
      {/* Top header with contact info */}
      <div className="bg-gray-100 py-3 px-4 flex justify-end items-center text-sm text-gray-700 border-b">
        <div className="container mx-auto flex justify-end items-center gap-4">
          <div className="flex items-center gap-1">
            <Phone className="w-4 h-4" />
            <span>+998 97 757 57 47</span>
          </div>
          <div className="flex items-center gap-1">
            <Mail className="w-4 h-4" />
            <span>@jakhonshokh</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <header className="bg-black py-4 sticky top-0 z-999 shadow-sm">
        <div className="container mx-auto flex justify-between items-center px-4">
          <Link href="/" className="flex items-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-wRKySQSIrQPudi26K0KnrsJEe2Qcwc.png"
              alt="Hafsiz Kargo"
              width={60}
              height={60}
              className="h-12 w-auto"
            />
          </Link>

          <div className="flex items-center gap-4">
            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <a href="#track" className="text-white hover:text-gray-300 font-medium transition-colors">
                {t("nav.track")}
              </a>
              <a href="#services" className="text-white hover:text-gray-300 font-medium transition-colors">
                {t("nav.services")}
              </a>
              <a href="#about" className="text-white hover:text-gray-300 font-medium transition-colors">
                {t("nav.about")}
              </a>
              <a href="#partners" className="text-white hover:text-gray-300 font-medium transition-colors">
                {t("nav.partners")}
              </a>
            </nav>

            {/* Language switcher */}
            <LanguageSwitcher className="hidden md:flex" />

            {/* Mobile menu */}
            <MobileMenu />
          </div>
        </div>
      </header>

      {/* Hero section */}
      <section className="relative h-[500px]">
        <div className="absolute inset-0 bg-black/50 z-0">
          <Image
            src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?q=80&w=2000&auto=format&fit=crop"
            alt="Logistics warehouse with cargo containers"
            width={2000}
            height={1000}
            className="w-full h-full object-cover"
            priority
          />
        </div>
        <div className="relative z-10 container mx-auto h-full flex flex-col justify-center text-white px-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t("hero.title")}</h1>
            <p className="text-lg opacity-90">{t("hero.description")}</p>
          </div>
        </div>
      </section>

      {/* Tracking section */}
      <section id="track" className="py-16 px-4 scroll-mt-20">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-2">
            {t("track.title")} <span className="text-orange-500">{t("track.highlight")}</span>
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">{t("track.description")}</p>

          <TrackingForm />
        </div>
      </section>

      {/* Services section */}
      <section id="services" className="py-16 px-4 bg-gray-50 scroll-mt-20">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">{t("services.title")}</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/80 z-10"></div>
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  width={800}
                  height={500}
                  className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
                  <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                  <p className="text-white/90 text-sm mb-4 max-w-md opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    {service.description}
                  </p>
                  <div className="h-1 w-12 bg-orange-500 rounded-full transition-all duration-300 group-hover:w-24"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About section */}
      <section id="about" className="py-16 px-4 scroll-mt-20">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-center">{t("about.title")}</h2>

          <div className="flex flex-col md:flex-row gap-8 mb-12">
            <div className="md:w-1/2">
              <Image
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2000&auto=format&fit=crop"
                alt="Logistics and shipping operations"
                width={500}
                height={300}
                className="rounded-lg w-full h-auto object-cover"
              />
            </div>
            <div className="md:w-1/2">
              <h3 className="text-2xl font-semibold mb-4">Hafsiz Kargo</h3>
              <p className="text-gray-700 mb-4">{t("about.description1")}</p>
              <p className="text-gray-700">{t("about.description2")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form section */}
      <section className="relative">
        <ContactForm />
      </section>

      {/* Partners section */}
      <section id="partners" className="py-16 px-4 bg-white scroll-mt-20">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">{t("partners.title")}</h2>
          <PartnersSlider />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-wRKySQSIrQPudi26K0KnrsJEe2Qcwc.png"
                alt="Hafsiz Kargo"
                width={50}
                height={50}
                className="h-10 w-auto mb-4"
              />
              <p>
                © {new Date().getFullYear()} Hafsiz Kargo. {t("footer.copyright")}
              </p>
            </div>

            <div className="flex flex-col space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+998 97 757 57 47</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>@jakhonshokh</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

