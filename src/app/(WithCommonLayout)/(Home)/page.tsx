import { BannerSlider } from "@/components/modules/(UserModules)/Home/BannerSlider";
import FeaturedProducts from "@/components/modules/(UserModules)/Home/FeaturedProducts";
import HomeBrandsSlider from "@/components/modules/(UserModules)/Home/HomeBrandsSlider";
import { HomeSidebar } from "@/components/modules/(UserModules)/Home/HomeSidebar";
import OnSaleProducts from "@/components/modules/(UserModules)/Home/OnSaleProducts";
import { getAllBrandWithSomeData } from "@/services/(UserServices)/BrandService";
import { getAllCategoryWithSomeData } from "@/services/(UserServices)/CategoryService";
import { getAllProductsForHome } from "@/services/(UserServices)/ProductService";
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
      <main className="">
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

        {products?.onSaleProducts?.length > 0 && (
          <OnSaleProducts products={products.onSaleProducts} />
        )}
        {brands?.length > 0 && <HomeBrandsSlider brands={brands} />}
      </main>
    </div>
  );
}
