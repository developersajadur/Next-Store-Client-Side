import { Skeleton } from "@/components/ui/skeleton";

export default function CheckoutSkeleton() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Skeleton className="h-8 w-40 mb-6" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column Skeleton */}
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-4">
            <Skeleton className="h-6 w-48" />

            {/* Payment Method */}
            <div className="flex gap-4 flex-wrap">
              <Skeleton className="h-12 w-44 rounded-md" />
              <Skeleton className="h-12 w-44 rounded-md" />
            </div>

            {/* Main form fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
            <Skeleton className="h-24 w-full" />

            {/* Terms and Conditions */}
            <div className="flex items-start space-x-3">
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-5 w-64" />
            </div>
          </div>
        </div>

        {/* Right Column Skeleton */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg p-6 space-y-6">
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-20" />
            </div>

            <div className="space-y-4">
              {[1, 2].map((_, i) => (
                <div key={i} className="flex items-center gap-4 py-3 border-b">
                  <Skeleton className="w-16 h-16 rounded border" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-full" />
                    <div className="flex justify-between">
                      <Skeleton className="h-5 w-16" />
                      <Skeleton className="h-8 w-24" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-4 border-t">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-10" />
              </div>
              <div className="flex justify-between pt-2 border-t">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-10" />
              </div>
            </div>

            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-4 w-48 mx-auto" />
            <Skeleton className="h-3 w-64 mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}
