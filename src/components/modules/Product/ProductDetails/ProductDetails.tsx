"use client";

import { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import {
  Minus,
  Plus,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { IProductCard, IProductDetails, TMediaSomeData } from "@/types";
import "keen-slider/keen-slider.min.css";
import { ProductCard } from "../ProductCard";
import Link from "next/link";

const recentlyViewed = [
  {
    id: 1,
    name: "Galaxy Watch7",
    price: "19500৳",
    image: "/placeholder.svg?height=60&width=60&text=Watch7",
  },
  {
    id: 2,
    name: "iPhone 16 Pro",
    price: "131000৳",
    image: "/placeholder.svg?height=60&width=60&text=iPhone16",
  },
  {
    id: 3,
    name: "Galaxy A56 5G",
    price: "41700৳",
    image: "/placeholder.svg?height=60&width=60&text=A56",
  },
  {
    id: 4,
    name: "MacBook Air M4 13-in...",
    price: "119000৳",
    image: "/placeholder.svg?height=60&width=60&text=MacBook",
  },
];
interface ProductDetailsProps {
  product: IProductDetails;
  relatedProducts: IProductCard[];
}
export default function ProductDetails({
  product,
  relatedProducts,
}: ProductDetailsProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [activeSection, setActiveSection] = useState("specification");

  // Main product image slider
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  // Thumbnail slider
  const [thumbnailRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slides: {
      perView: 4,
      spacing: 10,
    },
    vertical: false,
  });

  // Related products slider
  const [relatedRef, relatedInstanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "free-snap",
    slides: {
      perView: 4,
      spacing: 16,
    },
    breakpoints: {
      "(max-width: 640px)": {
        slides: { perView: 1, spacing: 12 },
      },
      "(max-width: 768px)": {
        slides: { perView: 2, spacing: 14 },
      },
      "(max-width: 1024px)": {
        slides: { perView: 3, spacing: 16 },
      },
    },
  });

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const productImages: TMediaSomeData[] = [
    product?.image,
    ...(Array.isArray(product?.gallery_images) ? product.gallery_images : []),
  ];

  const formatPrice = (price: number) => `${price.toLocaleString()}৳`;

  const isOutOfStock = product.stock_quantity <= 0;
  const displayPrice = product.sale_price ?? product.price;
  const hasDiscount =
    product.regular_price && product.regular_price > displayPrice;
  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.regular_price - displayPrice) / product.regular_price) * 100
      )
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Product Section */}
            <div className="bg-white rounded-lg p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Product Images */}
                <div className="space-y-4">
                  {/* Main Image Slider */}
                  <div className="relative">
                    <div
                      ref={sliderRef}
                      className="keen-slider rounded-lg overflow-hidden"
                    >
                      {productImages.map((image, index) => (
                        <div
                          key={index}
                          className="keen-slider__slide flex justify-center items-center"
                        >
                          <div className="w-96 h-96 relative cursor-pointer">
                            <Image
                              src={image.url}
                              alt={image.fileName}
                              fill
                              className="object-cover rounded-lg"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Thumbnail Images */}
                  <div ref={thumbnailRef} className="keen-slider">
                    {productImages.map((image, index) => (
                      <div
                        key={index}
                        className="keen-slider__slide cursor-pointer"
                        onClick={() => instanceRef.current?.moveToIdx(index)}
                      >
                        <div
                          className={`w-20 h-20 relative rounded-lg overflow-hidden border-2 ${
                            currentSlide === index
                              ? "border-orange-500"
                              : "border-gray-200"
                          }`}
                        >
                          <Image
                            src={image.url}
                            alt={image.fileName}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                  {/* Header */}
                  <div>
                    <div className="flex items-center gap-4 mb-2">
                      <span className="bg-orange-500 text-white px-2 py-1 text-sm rounded">
                        {discountPercentage}% OFF
                      </span>
                      <Image
                        src={product.brand.image.url}
                        alt={product.brand.title}
                        width={60}
                        height={30}
                      />
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                      {product.title}
                    </h1>
                  </div>

                  {/* Price and Status */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-4 text-sm">
                      <span>Cash Discount Price:</span>

                      <span className="text-2xl font-bold text-orange-500">
                        {formatPrice(displayPrice)}
                      </span>
                      {hasDiscount && (
                        <span className=" text-gray-500 line-through">
                          {formatPrice(product.regular_price!)}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>
                        Status:{" "}
                        {isOutOfStock ? (
                          <span className="text-red-600">Stock Out</span>
                        ) : (
                          <span className="text-green-600">In Stock</span>
                        )}
                      </span>

                      <span>
                        Product Code:{" "}
                        {product._id.toLocaleUpperCase().slice(0, 10)}
                      </span>
                    </div>
                  </div>

                  {/* WhatsApp Button */}
                  <Link href="https://wa.me/+8801787448412">
                    <Button className="bg-green-500 hover:bg-green-600 text-white">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Message on WhatsApp
                    </Button>
                  </Link>

                  {/* Color Selection */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Color:
                    </label>
                    <div className="flex gap-2">
                      {Array.isArray(product.color) &&
                      product.color.length > 0 ? (
                        product.color
                          .filter((c) => c && c.trim() !== "")
                          .map((color: string, index) => (
                            <Button
                              key={index}
                              onClick={() => setSelectedColor(color)}
                              size="sm"
                              className={`border  ${
                                selectedColor === color
                                  ? "border-orange-500 border-2"
                                  : "border-black/20"
                              }`}
                              style={{ backgroundColor: color, color: "#FF9F00" }}
                            >
                              {/* {color} */}
                            </Button>
                          ))
                      ) : (
                        <span className="text-sm text-gray-500 italic">
                          Not Available
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity and Actions */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border rounded">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="px-4 py-2 min-w-[50px] text-center">
                        {quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                      Buy Now
                    </Button>
                    <Button
                      variant="outline"
                      className="text-orange-500 border-orange-500"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Products */}

            {relatedProducts?.length > 0 && (
              <div className="bg-white rounded-lg p-6 mb-8">
                <h2 className="text-3xl md:text-4xl font-semibold text-center">
                  Related Products
                </h2>
                <div className="relative">
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white shadow-lg hidden md:flex"
                    onClick={() => relatedInstanceRef.current?.prev()}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white shadow-lg hidden md:flex"
                    onClick={() => relatedInstanceRef.current?.next()}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>

                  <div ref={relatedRef} className="keen-slider">
                    {relatedProducts.map((product) => (
                      <div key={product._id} className="keen-slider__slide">
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Product Details Navigation */}
            <div className="bg-white rounded-lg p-6">
              <div className="flex gap-4 mb-6 border-b">
                {[
                  { id: "specification", label: "Specification" },
                  { id: "description", label: "Description" },
                  { id: "warranty", label: "Warranty" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    className={`pb-2 px-4 font-medium cursor-pointer ${
                      activeSection === tab.id
                        ? "text-orange-500 border-b-2 border-orange-500"
                        : "text-gray-600 hover:text-orange-500"
                    }`}
                    onClick={() => scrollToSection(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Specification Section */}
              <div id="specification" className="mb-8">
                <h3 className="text-xl font-bold mb-4">Specification</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <tbody>
                      {product.specifications?.map((spec, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-3 px-4 font-medium bg-gray-50 w-1/3">
                            {spec.key}
                          </td>
                          <td className="py-3 px-4">{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Description Section */}
              <div id="description" className="mb-8">
                <h3 className="text-xl font-bold mb-4">Description</h3>
                <div className="prose max-w-none">
                  <p className="mb-4">{product.description}</p>
                </div>
              </div>

              {/* Warranty Section */}
              <div id="warranty">
                <h3 className="text-xl font-bold mb-4">Warranty</h3>
                <div className="prose max-w-none">
                  {product.warranty ? (
                    <p className="text-base leading-relaxed text-gray-700">
                      {product.warranty}
                    </p>
                  ) : (
                    <p className="text-base text-red-500">Not Available</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Recently Viewed Sidebar */}
          <div className="lg:col-span-1">
            {recentlyViewed.length > 0 ? (
              <div className="bg-white rounded-lg p-6 sticky top-4">
                <h3 className="text-lg font-bold mb-4 text-orange-500">
                  Recently Viewed
                </h3>
                <div className="space-y-4">
                  {recentlyViewed.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50"
                    >
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={60}
                        height={60}
                        className="rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">
                          {item.name}
                        </h4>
                        <p className="text-orange-500 font-bold text-sm">
                          {item.price}
                        </p>
                        <div className="flex gap-2 mt-2">
                          <Button
                            size="sm"
                            className="bg-orange-500 hover:bg-orange-600 text-white text-xs"
                          >
                            Buy Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-gray-500 italic">No recently viewed items.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
