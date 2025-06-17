"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Logo } from "@/components/shared/Logo"

const slides = [
  {
    id: 1,
    title: "Build Your Dream PC with",
    highlight: "OUR CUSTOM PC BUILD SERVICE",
    image: "https://img.freepik.com/premium-photo/black-computer-monitor-with-black-screen-that-says-dell-bottoma-computer-monitor_1236215-12945.jpg?ga=GA1.1.1480656127.1739272442&semt=ais_hybrid&w=740",
    bgColor: "from-purple-600 via-purple-700 to-purple-800",
  },
  {
    id: 2,
    title: "Gaming Accessories",
    highlight: "FANTECH GLETSER MAX",
    image: "https://img.freepik.com/free-photo/view-neon-illuminated-gaming-desk-setup-with-keyboard_23-2149529371.jpg?ga=GA1.1.1480656127.1739272442&semt=ais_hybrid&w=740",
    bgColor: "from-gray-800 via-gray-900 to-black",
  },
  {
    id: 3,
    title: "Premium Gaming Gear",
    highlight: "FANTECH GLETSER",
    image: "https://img.freepik.com/free-photo/still-life-seat-gamers_23-2149746563.jpg?ga=GA1.1.1480656127.1739272442&semt=ais_hybrid&w=740",
    bgColor: "from-blue-600 via-blue-700 to-blue-800",
  },
]

export function BannerSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative rounded-lg overflow-hidden" style={{ minHeight: "400px" }}>
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            index === currentSlide ? "translate-x-0" : index < currentSlide ? "-translate-x-full" : "translate-x-full"
          }`}
        >
          <div className={`w-full h-full bg-gradient-to-r ${slide.bgColor} relative`}>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 left-10 w-24 h-24 bg-white rounded-full blur-2xl"></div>
              <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full blur-xl"></div>
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between p-6 lg:p-12 h-full">
              {/* Left Content */}
              <div className="flex-1 text-white mb-8 lg:mb-0">
                {/* Logo */}
                <div className="mb-6">
                  <Logo size="md" showText={true} />
                </div>

                {/* Main Content */}
                <div className="space-y-2">
                  <p className="text-orange-300 text-sm lg:text-base">{slide.title}</p>

                  <div className="space-y-1">
                    {slide.highlight.split(" ").map((word, wordIndex) => (
                      <div key={wordIndex} className="text-2xl lg:text-4xl xl:text-5xl font-bold">
                        <span className={wordIndex >= 2 ? "text-yellow-400" : "text-white"}>{word}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="flex items-center space-x-2 mt-8">
                  <Phone className="h-5 w-5 text-white" />
                  <span className="text-white font-medium">01939300301</span>
                </div>
                <p className="text-sm text-gray-200 mt-1">www.nextstore.com</p>
              </div>

              {/* Right Content */}
              <div className="flex-1 flex justify-center lg:justify-end">
                <div className="relative w-full max-w-md lg:max-w-lg">
                  <Image
                    src={slide.image || "/placeholder.svg"}
                    alt={`${slide.highlight} - Gaming accessories and components`}
                    width={500}
                    height={400}
                    className="w-full h-auto object-contain"
                    priority={index === 0}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <Button
        onClick={prevSlide}
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-20"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        onClick={nextSlide}
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-20"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-6 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? "bg-white" : "bg-white/40"}`}
          />
        ))}
      </div>
    </div>
  )
}
