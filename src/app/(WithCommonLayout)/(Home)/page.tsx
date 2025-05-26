import { BannerSlider } from "@/components/modules/Home/BannerSlider";
import FeaturedProducts from "@/components/modules/Home/FeaturedProducts";
import { HomeSidebar } from "@/components/modules/Home/HomeSidebar";

export default async function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar - Desktop Only */}
          <HomeSidebar />

          {/* Main Content */}
          <div className="flex-1">
            <BannerSlider />
          </div>
        </div>
        {/* Products Section */}
        <FeaturedProducts />
      </main>
    </div>
  );
}
