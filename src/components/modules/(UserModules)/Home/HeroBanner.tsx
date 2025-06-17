"use client"

import { Phone } from "lucide-react"
import Image from "next/image"

export function HeroBanner() {
  return (
    <div className="relative bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 rounded-lg overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 right-10 w-32 h-32 bg-purple-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-purple-400 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-300 rounded-full blur-xl"></div>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between p-6 lg:p-12">
        {/* Left Content */}
        <div className="flex-1 text-white mb-8 lg:mb-0">
          {/* Logo */}
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm flex items-center justify-center">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              </div>
            </div>
            <div>
              <h1 className="text-lg font-bold">NEXT</h1>
              <p className="text-sm opacity-90">STORE</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-2">
            <p className="text-orange-300 text-sm lg:text-base">Build Your</p>
            <p className="text-orange-300 text-sm lg:text-base">Dream PC with</p>

            <div className="space-y-1">
              <div className="text-4xl lg:text-6xl font-bold">
                <span className="text-white">OUR</span>
              </div>
              <div className="text-4xl lg:text-6xl font-bold">
                <span className="text-white">CUSTOM</span>
              </div>
              <div className="text-4xl lg:text-6xl font-bold">
                <span className="text-yellow-400">PC BUILD</span>
              </div>
              <div className="text-4xl lg:text-6xl font-bold">
                <span className="text-yellow-400">SERVICE</span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex items-center space-x-2 mt-8">
            <Phone className="h-5 w-5 text-white" />
            <span className="text-white font-medium">01939300301</span>
          </div>
          <p className="text-sm text-purple-200 mt-1">www.gadgetnova.com</p>

          {/* Dots Indicator */}
          <div className="flex space-x-2 mt-6">
            <div className="w-3 h-3 bg-white rounded-full"></div>
            <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
            <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
          </div>
        </div>

        {/* Right Content - PC Components Image */}
        <div className="flex-1 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-md lg:max-w-lg">
            <Image
              src="https://img.freepik.com/premium-photo/black-computer-monitor-with-black-screen-that-says-dell-bottoma-computer-monitor_1236215-12945.jpg?ga=GA1.1.1480656127.1739272442&semt=ais_hybrid&w=740"
              alt="PC Components - Motherboard, CPU, Graphics Card, and Gaming Accessories"
              width={500}
              height={400}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  )
}
