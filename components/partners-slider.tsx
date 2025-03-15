"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const partners = [
  {
    id: 1,
    name: "Otabek Express",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=200&h=100&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Air Express",
    logo: "https://images.unsplash.com/photo-1563770660941-10a63607692e?q=80&w=200&h=100&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Chopar Express",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=200&h=100&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Ruzgar Express",
    logo: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=200&h=100&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Fast Express",
    logo: "https://images.unsplash.com/photo-1606185540834-d6e7483ee1a4?q=80&w=200&h=100&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Global Express",
    logo: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=200&h=100&auto=format&fit=crop",
  },
  {
    id: 7,
    name: "City Express",
    logo: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?q=80&w=200&h=100&auto=format&fit=crop",
  },
  {
    id: 8,
    name: "Mega Express",
    logo: "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?q=80&w=200&h=100&auto=format&fit=crop",
  },
]

export default function PartnersSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Calculate total number of slides based on viewport
  const partnersPerSlide = isMobile ? 1 : 4
  const totalSlides = Math.ceil(partners.length / partnersPerSlide)

  const nextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
    setTimeout(() => setIsAnimating(false), 500)
  }

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [totalSlides])

  return (
    <div className="relative max-w-7xl mx-auto px-4">
      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
        disabled={isAnimating}
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-gray-600" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
        disabled={isAnimating}
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-gray-600" />
      </button>

      {/* Slider container */}
      <div className="overflow-hidden mx-12">
        <div
          ref={sliderRef}
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {/* Create slides with partnersPerSlide partners each */}
          {Array.from({ length: totalSlides }).map((_, slideIndex) => (
            <div key={slideIndex} className="w-full flex-shrink-0 flex flex-wrap">
              {partners
                .slice(slideIndex * partnersPerSlide, slideIndex * partnersPerSlide + partnersPerSlide)
                .map((partner) => (
                  <div key={partner.id} className={`${isMobile ? "w-full" : "w-1/4"} px-4 py-2`}>
                    <div className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-center h-[120px]">
                      <Image
                        src={partner.logo || "/placeholder.svg"}
                        alt={partner.name}
                        width={200}
                        height={100}
                        className="max-w-full h-auto object-contain"
                      />
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>

      {/* Dots navigation */}
      {totalSlides > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isAnimating) {
                  setIsAnimating(true)
                  setCurrentSlide(index)
                  setTimeout(() => setIsAnimating(false), 500)
                }
              }}
              className={`w-2 h-2 rounded-full transition-colors ${
                currentSlide === index ? "bg-blue-600" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

