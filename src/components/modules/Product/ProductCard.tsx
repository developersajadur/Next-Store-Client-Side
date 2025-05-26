"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { IProductCard } from "@/types";

interface ProductCardProps {
  product: IProductCard;
}

export function ProductCard({ product }: ProductCardProps) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = (id: string) => {
    console.log("Add to Cart:", id);
  };

  const handleBuyNow = (id: string) => {
    console.log("Buy Now:", id);
  };

  const formatPrice = (price: number) => `${price.toLocaleString()}৳`;

  const isOutOfStock = product.stock_quantity <= 0;
  const displayPrice = product.sale_price ?? product.price;
  const hasDiscount = product.regular_price && product.regular_price > displayPrice;

  return (
    <Card className="w-full py-2 max-w-sm mx-auto bg-white product-card-custom-shadow">
      <CardContent className="p-4">
        {/* Product Image */}
        <div className="relative aspect-[4/3] mb-3 bg-gray-50 rounded-md overflow-hidden">
          {!imageError ? (
            <Image
              src={product.image?.url || "/placeholder.svg"}
              alt={product.title}
              fill
              className={`object-contain p-2 rounded-md transition-opacity duration-300 ${
                imageLoading ? "opacity-0" : "opacity-100"
              }`}
              onLoad={() => setImageLoading(false)}
              onError={() => {
                setImageError(true);
                setImageLoading(false);
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <div className="text-gray-400 text-center">
                <div className="w-12 h-12 mx-auto mb-1 bg-gray-200 rounded flex items-center justify-center">
                  <span className="text-xl">📦</span>
                </div>
                <p className="text-xs">Image not available</p>
              </div>
            </div>
          )}

          {imageLoading && !imageError && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-md" />
          )}
        </div>

        {/* Title */}
        <h3 className="text-base font-medium text-center text-gray-900 mb-2">
          {product.title}
        </h3>

        {/* Price */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-lg font-semibold text-orange-500">
            {formatPrice(displayPrice)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(product.regular_price!)}
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={() => handleBuyNow(product._id)}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-sm py-2"
            disabled={isOutOfStock}
          >
            {isOutOfStock ? "Out of Stock" : "Buy Now"}
          </Button>
          <Button
            onClick={() => handleAddToCart(product._id)}
            variant="outline"
            className="flex-1 border-orange-500 text-orange-500 hover:text-orange-500 hover:bg-gray-50 text-sm py-2"
            disabled={isOutOfStock}
          >
            Add To Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
