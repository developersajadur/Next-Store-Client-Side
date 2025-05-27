"use client";

import { IProductCard } from "@/types";
import { ProductCard } from "../Product/ProductCard";
import { ProductCardSkeleton } from "@/components/Skeletons/ProductCardSkeleton";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import React from "react";

interface OnSaleProductsProps {
  products: IProductCard[];
}

const OnSaleProducts: React.FC<OnSaleProductsProps> = ({ products }) => {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "snap",
    slides: {
      perView: 4,
      spacing: 16,
    },
    breakpoints: {
      "(max-width: 1024px)": {
        slides: {
          perView: 3,
          spacing: 12,
        },
      },
      "(max-width: 768px)": {
        slides: {
          perView: 2,
          spacing: 8,
        },
      },
    },
  });

  return (
    <div className="mt-14 md:mt-28">
      <h2 className="text-3xl md:text-4xl font-semibold text-center mb-4">
        On Sale Products 🔥
      </h2>
      {products.length > 0 ? (
        <div ref={sliderRef} className="keen-slider">
          {products.map((product, index) => (
            <div key={index} className="keen-slider__slide">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OnSaleProducts;
