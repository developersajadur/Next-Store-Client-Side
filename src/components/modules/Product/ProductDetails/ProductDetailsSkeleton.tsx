"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Image Slider Skeleton */}
                <div className="space-y-4">
                  <Skeleton className="w-full h-96 rounded-lg" />
                  <div className="flex gap-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <Skeleton key={i} className="w-20 h-20 rounded-lg" />
                    ))}
                  </div>
                </div>

                {/* Info Skeleton */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Skeleton className="w-24 h-6 rounded" />
                    <Skeleton className="w-32 h-8 rounded" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="w-48 h-6 rounded" />
                    <Skeleton className="w-24 h-6 rounded" />
                    <Skeleton className="w-64 h-6 rounded" />
                  </div>
                  <Skeleton className="w-48 h-10 rounded" />
                  <div className="flex gap-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <Skeleton key={i} className="w-14 h-8 rounded" />
                    ))}
                  </div>
                  <div className="flex items-center gap-4">
                    <Skeleton className="w-28 h-10 rounded" />
                    <Skeleton className="w-24 h-10 rounded" />
                    <Skeleton className="w-24 h-10 rounded" />
                  </div>
                </div>
              </div>
            </div>

            {/* Related Products Skeleton */}
            <div className="bg-white rounded-lg p-6 mb-8">
              <Skeleton className="w-64 h-10 mx-auto mb-4 rounded" />
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-64 rounded-lg" />
                ))}
              </div>
            </div>

            {/* Bottom Section Skeleton */}
            <div className="bg-white rounded-lg p-6">
              <div className="flex gap-4 mb-4">
                {["specification", "description", "reviews"].map((_, i) => (
                  <Skeleton key={i} className="w-32 h-8 rounded" />
                ))}
              </div>
              <Skeleton className="w-full h-40 rounded" />
            </div>
          </div>

          {/* Recently Viewed Skeleton */}
          <div className="bg-white rounded-lg p-6 space-y-4">
            <Skeleton className="w-40 h-6 rounded" />
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex gap-4 items-center">
                <Skeleton className="w-16 h-16 rounded" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
