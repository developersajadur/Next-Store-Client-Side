import { Skeleton } from "@/components/ui/skeleton";

export default function PersonalInfoSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Heading */}
      <div>
        <Skeleton className="h-6 w-40 mb-2" />
        <Skeleton className="h-4 w-60" />
      </div>

      {/* Avatar */}
      <div className="relative w-fit">
        <Skeleton className="h-24 w-24 rounded-full" />
        <Skeleton className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full" />
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Phone Number */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Address */}
        <div className="space-y-2 col-span-full">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Skeleton className="h-10 w-32 rounded-md" />
      </div>
    </div>
  );
}
