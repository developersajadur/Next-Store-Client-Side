"use client";

import React from "react";
import { TSomeBrand } from "@/types";
import Image from "next/image";
import Link from "next/link";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

type Props = {
  brands: TSomeBrand[];
};

const HomeBrandsSlider = ({ brands }: Props) => {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "snap",
    slides: {
      perView: 4,
      spacing: 10,
    },
    breakpoints: {
      "(max-width: 1024px)": {
        slides: {
          perView: 10,
          spacing: 10,
        },
      },
      "(max-width: 768px)": {
        slides: {
          perView: 5,
          spacing: 10,
        },
      },
      "(max-width: 480px)": {
        slides: {
          perView: 3,
          spacing: 10,
        },
      },
    },
  });

  return (
    <div className="mt-14 w-full">
     <h2 className="text-3xl md:text-4xl font-semibold text-center mb-10">
      Our Best Brands
      </h2>
      <div ref={sliderRef} className="keen-slider w-full">
        {brands.map((brand) => (
          <div key={brand._id} className="keen-slider__slide flex justify-center">
            <Link href={`/products/brands/${brand.slug}`}>
              <div className="w-[100px] h-[100px] flex items-center justify-center transition-all duration-300">
                <Image
                  src={brand.image.url}
                  alt={brand.title}
                  width={80}
                  height={80}
                  className="object-contain rounded"
                />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeBrandsSlider;
