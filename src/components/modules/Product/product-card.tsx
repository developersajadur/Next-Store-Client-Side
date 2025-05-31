import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"

interface ProductCardProps {
  product: any
}

export function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  const getAvailabilityBadge = (availability: string) => {
    switch (availability) {
      case "in-stock":
        return (
          <Badge variant="default" className="bg-green-500">
            In Stock
          </Badge>
        )
      case "out-of-stock":
        return <Badge variant="destructive">Out of Stock</Badge>
      case "pre-order":
        return <Badge variant="secondary">Pre Order</Badge>
      default:
        return null
    }
  }

  const getActionButton = (availability: string) => {
    switch (availability) {
      case "in-stock":
        return (
          <div className="flex gap-2">
            <Button className="flex-1 bg-orange-500 hover:bg-orange-600">Buy Now</Button>
            <Button variant="outline" size="icon">
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        )
      case "out-of-stock":
        return (
          <Button disabled className="w-full">
            Out of Stock
          </Button>
        )
      case "pre-order":
        return (
          <Button variant="secondary" className="w-full">
            Pre Order
          </Button>
        )
      default:
        return null
    }
  }

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="aspect-square relative mb-4 bg-gray-50 rounded-lg overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
          />
          <div className="absolute top-2 right-2">{getAvailabilityBadge(product.availability)}</div>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium text-sm line-clamp-2 min-h-[2.5rem]">{product.name}</h3>

          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">{formatPrice(product.price)}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>

          {getActionButton(product.availability)}
        </div>
      </CardContent>
    </Card>
  )
}
