// components/modules/Product/ProductCardSkeleton.tsx

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function ProductCardSkeleton() {
  return (
    <Card className="w-full max-w-sm mx-auto bg-white border rounded-xl shadow-sm">
      <CardContent className="p-4">
        {/* Image Placeholder */}
        <div className="relative w-full aspect-square mb-4">
          <Skeleton className="w-full h-full rounded-md" />
        </div>

        {/* Product Title */}
        <Skeleton className="h-6 w-3/4 mx-auto mb-3" />

        {/* Price and Discount Section */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <Skeleton className="h-5 w-20" /> {/* Price */}
          <Skeleton className="h-4 w-16" /> {/* Discount */}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </CardContent>
    </Card>
  )
}
