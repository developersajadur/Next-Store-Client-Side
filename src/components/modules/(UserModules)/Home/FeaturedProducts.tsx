
import { IProductCard } from "@/types";
import { ProductCard } from "../Product/ProductCard";
import { ProductCardSkeleton } from "@/components/Skeletons/ProductCardSkeleton";

interface FeaturedProductsProps {
  products: IProductCard[];
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products }) => {
  return (
    <div className="mt-8 md:mt-28">
      <h2 className="text-3xl md:text-4xl font-semibold text-center mb-4">
        Featured Products
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0
          ? products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))
          : Array.from({ length: 4 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
