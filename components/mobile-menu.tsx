"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import LanguageSwitcher from "@/components/language-switcher"

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useLanguage()

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (isOpen && !target.closest("#mobile-menu") && !target.closest("#menu-button")) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const href = e.currentTarget.getAttribute("href")

    // Close the menu first
    setIsOpen(false)

    // Wait a small amount of time to ensure the menu is closed before scrolling
    setTimeout(() => {
      if (href && href.startsWith("#")) {
        const targetElement = document.querySelector(href)
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
          })

          // Update URL without page reload
          history.pushState(null, "", href)
        }
      }
    }, 100)
  }

  return (
    <div className="md:hidden">
      <Button
        id="menu-button"
        variant="ghost"
        size="icon"
        className="p-1 text-white"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </Button>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div id="mobile-menu" className="fixed inset-0 z-50 bg-black">
          <div className="flex justify-between items-center p-4 border-b border-gray-800">
            <div className="flex items-center">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-wRKySQSIrQPudi26K0KnrsJEe2Qcwc.png"
                alt="Hafsiz Kargo"
                width={40}
                height={40}
                className="h-8 w-auto"
              />
            </div>
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <Button
                variant="ghost"
                size="icon"
                className="p-1 text-white"
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>
          </div>

          <nav className="flex flex-col p-4">
            <a
              href="#track"
              className="py-3 px-4 border-b border-gray-800 text-white font-medium hover:bg-gray-900"
              onClick={handleLinkClick}
            >
              {t("nav.track")}
            </a>
            <a
              href="#services"
              className="py-3 px-4 border-b border-gray-800 text-white font-medium hover:bg-gray-900"
              onClick={handleLinkClick}
            >
              {t("nav.services")}
            </a>
            <a
              href="#about"
              className="py-3 px-4 border-b border-gray-800 text-white font-medium hover:bg-gray-900"
              onClick={handleLinkClick}
            >
              {t("nav.about")}
            </a>
            <a
              href="#partners"
              className="py-3 px-4 border-b border-gray-800 text-white font-medium hover:bg-gray-900"
              onClick={handleLinkClick}
            >
              {t("nav.partners")}
            </a>
          </nav>
        </div>
      )}
    </div>
  )
}

