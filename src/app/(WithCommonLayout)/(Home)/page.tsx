import { BannerSlider } from "@/components/modules/Home/BannerSlider";
import FeaturedProducts from "@/components/modules/Home/FeaturedProducts";
import HomeBrandsSlider from "@/components/modules/Home/HomeBrandsSlider";
import { HomeSidebar } from "@/components/modules/Home/HomeSidebar";
import OnSaleProducts from "@/components/modules/Home/OnSaleProducts";
import { getAllBrandWithSomeData } from "@/services/BrandService";
import { getAllCategoryWithSomeData } from "@/services/CategoryService";
import { getAllProductsForHome } from "@/services/ProductService";
import { THomeProductResponse } from "@/types";

export default async function HomePage() {
  const [productsData, brands, categories] = await Promise.all([
    getAllProductsForHome(),
    getAllBrandWithSomeData(),
    getAllCategoryWithSomeData(),
  ]);

  const products: THomeProductResponse = productsData;

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar - Desktop Only */}
          <HomeSidebar categories={categories} />

          {/* Main Content */}
          <div className="flex-1">
            <BannerSlider />
          </div>
        </div>

        {/* Products Section */}
        {products?.featuredProducts?.length > 0 && (
          <FeaturedProducts products={products.featuredProducts} />
        )}

        {brands?.length > 0 && <HomeBrandsSlider brands={brands} />}

        {products?.onSaleProducts?.length > 0 && (
          <OnSaleProducts products={products.onSaleProducts} />
        )}
      </main>
    </div>
  );
}
