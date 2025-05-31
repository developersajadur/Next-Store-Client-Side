import { ProductCardSkeleton } from "@/components/Skeletons/ProductCardSkeleton";
import React from "react";

const loading = () => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
      </div>
    </div>
  );
};

export default loading;
