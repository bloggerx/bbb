"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: "Strategic Minds",
      subtitle: "Gather",
      description: "Join the elite chess community in an unforgettable event",
    },
    {
      title: "Chess Excellence",
      subtitle: "2025",
      description: "Experience world-class chess competitions and networking",
    },
    {
      title: "Think Forward",
      subtitle: "Compete",
      description: "Challenge yourself against the brightest minds",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Chess Pattern Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <defs>
            <pattern id="chessboard" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="25" height="25" fill="currentColor" />
              <rect x="25" y="25" width="25" height="25" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="400" height="400" fill="url(#chessboard)" />
        </svg>
      </div>

      {/* Slides */}
      <div className="relative w-full h-full flex items-center justify-center">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 flex flex-col items-center justify-center text-center px-4 transition-all duration-1000 ${
              index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div className="max-w-3xl mx-auto animate-fade-in">
              <p className="text-primary font-semibold text-lg mb-2">{slide.subtitle}</p>
              <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-4 leading-tight text-balance">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty">{slide.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-0 right-0 flex items-center justify-between px-4 md:px-8">
        <button
          onClick={prevSlide}
          className="p-2 rounded-full bg-primary/20 hover:bg-primary/40 text-primary transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? "bg-primary w-8" : "bg-primary/40"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="p-2 rounded-full bg-primary/20 hover:bg-primary/40 text-primary transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* CTA Button */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <Link href="/register">
          <Button
            size="lg"
            className="bg-primary hover:bg-secondary text-primary-foreground text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            Get Started
          </Button>
        </Link>
      </div>
    </section>
  )
}
