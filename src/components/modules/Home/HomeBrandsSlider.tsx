// "use client";

// import React from "react";
// import { TSomeBrand } from "@/types";
// import Image from "next/image";
// import Link from "next/link";
// import "keen-slider/keen-slider.min.css";
// import { useKeenSlider } from "keen-slider/react";

// type Props = {
//   brands: TSomeBrand[];
// };

// const HomeBrandsSlider = ({ brands }: Props) => {
//   const [sliderRef] = useKeenSlider<HTMLDivElement>({
//     loop: true,
//     mode: "snap",
//     slides: {
//       perView: 4,
//       spacing: 10,
//     },
//     breakpoints: {
//       "(max-width: 1024px)": {
//         slides: {
//           perView: 4,
//           spacing: 10,
//         },
//       },
//       "(max-width: 768px)": {
//         slides: {
//           perView: 3,
//           spacing: 10,
//         },
//       },
//       "(max-width: 480px)": {
//         slides: {
//           perView: 2,
//           spacing: 8,
//         },
//       },
//     },
//   });

//   return (
//     <section className="w-full py-12 md:py-16 bg-gray-50">
//       <div className="container mx-auto px-4 md:px-6">
//         {/* Section Title */}
//         <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-10">
//           Our Best Brands
//         </h2>

//         {/* Keen Slider */}
//         <div ref={sliderRef} className="keen-slider w-full">
//           {brands.map((brand) => (
//          <div key={brand._id} className="keen-slider__slide flex justify-center">
//   <Link href={`/products/brands/${brand.slug}`} className="block">
//     <div className="w-[100px] h-[100px] flex items-center justify-center transition-all duration-300">
//       <Image
//         src={brand.image.url}
//         alt={brand.title}
//         width={80}
//         height={80}
//         className="object-contain rounded"
//       />
//     </div>
//   </Link>
// </div>

//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HomeBrandsSlider;



"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import React from "react";
import { TSomeBrand } from "@/types";
import Image from "next/image";
import Link from "next/link";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";



const topBrands = [
  { name: "Apple", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP1cYW90JJieSf9_Lzdfj-mjVsxfeAvWKB-QC-MxubqHnGgJo4tkZLPGcYoX9oybp_eEM&usqp=CAU" },
  { name: "Samsung", logo: "https://images.samsung.com/is/image/samsung/assets/bd/about-us/brand/logo/mo/360_197_1.png?$720_N_PNG$" },
  { name: "OnePlus", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR99GWXBflWRh5c1zylNzj2_yppTIjk188bE_43DqqiuGf_SzNgCQcMpCWLBR-b6Fuj3Yk&usqp=CAU" },
  { name: "Xiaomi", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb8TxYNjqUV6e4ICxbQZwaqVWJZQr90TeK9y8eD93WVgCVPF7V5YRj07yMl4v0yfCFDVU&usqp=CAU" },
  { name: "Google", logo: "https://cdn2.hubspot.net/hubfs/53/image8-2.jpg" },
]

type Props = {
  brands: TSomeBrand[];
};

export default function HomeBrandsSlider ({ brands }: Props){
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "free-snap",
    slides: {
      perView: 5,
      spacing: 16,
    },
    breakpoints: {
      "(max-width: 640px)": {
        slides: { perView: 2, spacing: 12 },
      },
      "(max-width: 768px)": {
        slides: { perView: 3, spacing: 14 },
      },
      "(max-width: 1024px)": {
        slides: { perView: 4, spacing: 16 },
      },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  })

  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-center">Shop By Brands</h2>
          <Button
            variant="outline"
            className="hidden sm:flex items-center gap-2 text-orange-500 border-orange-500 hover:bg-orange-50"
          >
            All Brands
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Top Brands Row - Full Width */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 mb-8 md:mb-12">
          {topBrands.map((brand, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-4 md:p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer border border-gray-100"
            >
              <Image
                src={brand.logo || "/placeholder.svg"}
                alt={brand.name}
                width={120}
                height={60}
                className="max-w-full h-auto object-contain"
              />
            </div>
          ))}
        </div>

        {/* Slider Section - Reduced Width on Large Devices */}
        <div className="lg:max-w-4xl lg:mx-auto">
          <div className="relative">
            {/* Navigation Buttons */}
            {loaded && instanceRef.current && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white shadow-lg hover:bg-gray-50 hidden md:flex"
                  onClick={(e: any) => {
                    e.stopPropagation()
                    instanceRef.current?.prev()
                  }}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white shadow-lg hover:bg-gray-50 hidden md:flex"
                  onClick={(e: any) => {
                    e.stopPropagation()
                    instanceRef.current?.next()
                  }}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}

            {/* Keen Slider Container with Custom Styles */}
            <div
              ref={sliderRef}
              className="keen-slider overflow-hidden"
              style={{
                display: "flex",
                userSelect: "none",
                touchAction: "pan-y",
                WebkitTouchCallout: "none",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              {brands.map((brand, index) => (
                <div
                  key={index}
                  className="keen-slider__slide"
                  style={{
                    minHeight: "0px",
                    overflow: "visible",
                    position: "relative",
                    width: "100%",
                  }}
                >
                  <Link href={`/products/brands/${brand.slug}`} className="flex items-center justify-center p-4 md:p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer border border-gray-100 h-full">
                    <Image
                      src={brand.image.url || "/placeholder.svg"}
                      alt={brand.title}
                      width={120}
                      height={60}
                      className="max-w-full h-auto object-contain"
                      draggable={false}
                    />
                  </Link>
                </div>
              ))}
            </div>

            {/* Mobile Navigation Dots */}
            {loaded && instanceRef.current && (
              <div className="flex justify-center mt-6 gap-2 md:hidden">
                {[...Array(Math.ceil(brands.length / 2)).keys()].map((idx) => (
                  <button
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      Math.floor(currentSlide / 2) === idx ? "bg-orange-500" : "bg-gray-300"
                    }`}
                    onClick={() => instanceRef.current?.moveToIdx(idx * 2)}
                  />
                ))}
              </div>
            )}

            {/* Mobile All Brands Button */}
            <div className="flex justify-center mt-6 sm:hidden">
              <Button
                variant="outline"
                className="flex items-center gap-2 text-orange-500 border-orange-500 hover:bg-orange-50"
              >
                All Brands
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
