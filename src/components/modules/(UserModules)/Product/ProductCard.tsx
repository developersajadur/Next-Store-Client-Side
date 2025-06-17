"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { IProductCard } from "@/types";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import { addProductToCart } from "@/redux/features/cartSlice";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: IProductCard;
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter()
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const dispatch = useDispatch();

  const handleAddToCart = (product: IProductCard) => {
      dispatch(addProductToCart({ ...product, orderQuantity: 1 }));
    toast.success("Product added to cart successfully!");
    router.push("/cart")
  };

  const handleBuyNow = (slug: string) => {
    router.push(`/checkout/${slug}`)
  };

  const formatPrice = (price: number) => `${price.toLocaleString()}৳`;

  const isOutOfStock = product.stock_quantity <= 0;
  const displayPrice = product.sale_price ?? product.price;
  const hasDiscount = product.regular_price && product.regular_price > displayPrice;

  return (
    <div className="bg-gray-50 rounded-lg p-4 text-center shadow-sm">
      <Link href={`/products/${product.slug}`}>
        <div className="relative w-full aspect-[4/3] bg-white rounded-md overflow-hidden mb-3">
          {!imageError ? (
            <Image
              src={product.image?.url || "/placeholder.svg"}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className={`object-contain p-2 transition-opacity duration-300 ${
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
            <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-md z-0" />
          )}
        </div>

        <h3 className="font-medium text-sm mb-2 line-clamp-2">
          {product.title}
        </h3>
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
      </Link>

      <div className="flex gap-2">
        <Button
          onClick={() => handleBuyNow(product.slug)}
          size="sm"
          className="bg-orange-500 hover:bg-orange-600 text-white flex-1"
          disabled={isOutOfStock}
        >
          {isOutOfStock ? "Out of Stock" : "Buy Now"}
        </Button>
        <Button
          onClick={() => handleAddToCart(product)}
          size="sm"
          variant="outline"
          className="text-orange-500 border-orange-500 flex-1 flex items-center justify-center gap-1"
          disabled={isOutOfStock}
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
