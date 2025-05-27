"use client"

import { useState } from "react"
import { useKeenSlider } from "keen-slider/react"
import { Minus, Plus, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import "keen-slider/keen-slider.min.css";
import { IProductDetails } from "@/types"

const productImages = [
  "/placeholder.svg?height=400&width=400&text=QCY+Earbuds+1",
  "/placeholder.svg?height=400&width=400&text=QCY+Earbuds+2",
  "/placeholder.svg?height=400&width=400&text=QCY+Earbuds+3",
  "/placeholder.svg?height=400&width=400&text=QCY+Earbuds+4",
]

const relatedProducts = [
  {
    id: 1,
    name: "Awei T88 ANC TWS Earbuds",
    price: "1600৳",
    image: "/placeholder.svg?height=200&width=200&text=Awei+T88",
  },
  {
    id: 2,
    name: "Imilab Imiki T12 True Wireless Earphones",
    price: "2000৳",
    image: "/placeholder.svg?height=200&width=200&text=Imilab+T12",
  },
  {
    id: 3,
    name: "Haylou G3 True Wireless Gaming Earbuds",
    price: "3900৳",
    image: "/placeholder.svg?height=200&width=200&text=Haylou+G3",
  },
  {
    id: 4,
    name: "HAYLOU GT1 2022 True Wireless Earbuds",
    price: "2200৳",
    originalPrice: "2500৳",
    image: "/placeholder.svg?height=200&width=200&text=Haylou+GT1",
  },
  {
    id: 5,
    name: "Sony WF-1000XM4 Earbuds",
    price: "15000৳",
    image: "/placeholder.svg?height=200&width=200&text=Sony+WF",
  },
]

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
]

interface ProductDetailsProps {
  product: IProductDetails;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState("black")
  const [activeSection, setActiveSection] = useState("specification")

  // Main product image slider
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
  })

  // Thumbnail slider
  const [thumbnailRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slides: {
      perView: 4,
      spacing: 10,
    },
    vertical: false,
  })

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
  })

  const colors = [
    { name: "black", class: "bg-black" },
    { name: "blue", class: "bg-blue-600" },
    { name: "gray", class: "bg-gray-400" },
  ]

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

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
                    <div ref={sliderRef} className="keen-slider rounded-lg overflow-hidden">
                      {product.gallery_images.map((image, index) => (
                        <div key={index} className="keen-slider__slide">
                          <Image
                            src={image.url}
                            alt={`Product image ${index + 1}`}
                            width={400}
                            height={400}
                            className="w-full h-auto object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Thumbnail Images */}
                  <div ref={thumbnailRef} className="keen-slider">
                    {productImages.map((image, index) => (
                      <div key={index} className="keen-slider__slide cursor-pointer">
                        <div
                          className={`border-2 rounded-lg overflow-hidden ${
                            currentSlide === index ? "border-orange-500" : "border-gray-200"
                          }`}
                          onClick={() => instanceRef.current?.moveToIdx(index)}
                        >
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`Thumbnail ${index + 1}`}
                            width={80}
                            height={80}
                            className="w-full h-auto object-cover"
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
                      <span className="bg-orange-500 text-white px-2 py-1 text-sm rounded">99% OFF</span>
                      <Image src="/placeholder.svg?height=30&width=60&text=QCY" alt="QCY" width={60} height={30} />
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">QCY HT15 Buds ANC TWS Earbuds</h1>
                  </div>

                  {/* Price and Status */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-4 text-sm">
                      <span>Cash Discount Price:</span>
                      <span className="line-through text-gray-500">31500৳</span>
                      <span className="text-2xl font-bold text-orange-500">2250৳</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>
                        Status: <span className="text-green-600">In Stock</span>
                      </span>
                      <span>Product Code: AGL29311</span>
                    </div>
                  </div>

                  {/* WhatsApp Button */}
                  <Button className="bg-green-500 hover:bg-green-600 text-white">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message on WhatsApp
                  </Button>

                  {/* Color Selection */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Color:</label>
                    <div className="flex gap-2">
                      {colors.map((color) => (
                        <button
                          key={color.name}
                          className={`w-8 h-8 rounded border-2 ${color.class} ${
                            selectedColor === color.name ? "border-orange-500" : "border-gray-300"
                          }`}
                          onClick={() => setSelectedColor(color.name)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Quantity and Actions */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border rounded">
                      <Button variant="ghost" size="sm" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="px-4 py-2 min-w-[50px] text-center">{quantity}</span>
                      <Button variant="ghost" size="sm" onClick={() => setQuantity(quantity + 1)}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white">Buy Now</Button>
                    <Button variant="outline" className="text-orange-500 border-orange-500">
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Products */}
            <div className="bg-white rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold mb-6 text-center">Related Products</h2>
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
                    <div key={product.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={60}
                      height={60}
                      className="rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{product.name}</h4>
                      <p className="text-orange-500 font-bold text-sm">{product.price}</p>
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white text-xs">
                          Buy Now
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs">
                          Add to compare
                        </Button>
                      </div>
                    </div>
                  </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Details Navigation */}
            <div className="bg-white rounded-lg p-6">
              <div className="flex gap-4 mb-6 border-b">
                <button
                  className={`pb-2 px-4 font-medium ${
                    activeSection === "specification" ? "text-orange-500 border-b-2 border-orange-500" : "text-gray-600"
                  }`}
                  onClick={() => scrollToSection("specification")}
                >
                  Specification
                </button>
                <button
                  className="pb-2 px-4 font-medium text-gray-600 hover:text-orange-500"
                  onClick={() => scrollToSection("description")}
                >
                  Description
                </button>
                <button
                  className="pb-2 px-4 font-medium text-gray-600 hover:text-orange-500"
                  onClick={() => scrollToSection("warranty")}
                >
                  Warranty
                </button>
              </div>

              {/* Specification Section */}
              <div id="specification" className="mb-8">
                <h3 className="text-xl font-bold mb-4">Specification</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <tbody>
                      {[
                        ["Brand", "QCY"],
                        ["Model", "HT15"],
                        ["Bluetooth", "Version 5.4 | Communication distance: 10m"],
                        ["Charging Interface", "Type-C"],
                        ["IP Rating", "IPX4"],
                        ["Battery capacity", "350mAh (Case) | 32mAh (Earbuds)"],
                        ["Playtime", "Total Battery Life (ANC ON/OFF): up to 18H/25H"],
                        ["Other Features / Info", "Profiles: HFP/A2DP/AVRCP"],
                      ].map(([key, value], index) => (
                        <tr key={index} className="border-b">
                          <td className="py-3 px-4 font-medium bg-gray-50 w-1/3">{key}</td>
                          <td className="py-3 px-4">{value}</td>
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
                  <p className="mb-4">
                    The QCY HT15 Buds ANC TWS Earbuds deliver exceptional audio quality with advanced Active Noise
                    Cancellation technology. These wireless earbuds are designed for music enthusiasts who demand
                    premium sound quality and comfort.
                  </p>
                  <p className="mb-4">
                    Featuring Bluetooth 5.4 connectivity, these earbuds provide stable and efficient wireless connection
                    with your devices. The IPX4 rating ensures protection against water and sweat, making them perfect
                    for workouts and outdoor activities.
                  </p>
                  <p>
                    With up to 25 hours of total battery life and quick charging via Type-C, you can enjoy uninterrupted
                    music throughout your day.
                  </p>
                </div>
              </div>

              {/* Warranty Section */}
              <div id="warranty">
                <h3 className="text-xl font-bold mb-4">Warranty</h3>
                <div className="prose max-w-none">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>1 Year Official Warranty from QCY</li>
                    <li>Warranty covers manufacturing defects only</li>
                    <li>Physical damage and water damage not covered under warranty</li>
                    <li>Warranty claim requires original purchase receipt</li>
                    <li>Free replacement within first 7 days if any manufacturing defect found</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Recently Viewed Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-4">
              <h3 className="text-lg font-bold mb-4 text-orange-500">Recently Viewed</h3>
              <div className="space-y-4">
                {recentlyViewed.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{item.name}</h4>
                      <p className="text-orange-500 font-bold text-sm">{item.price}</p>
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white text-xs">
                          Buy Now
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs">
                          Add to compare
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
