import { FilterSidebar } from "@/components/modules/Product/filter-sidebar";
import { MobileFilterSheet } from "@/components/modules/Product/mobile-filter-sheet";
import { ProductCard } from "@/components/modules/Product/ProductCard";
import { getAllProductsWithQuery } from "@/services/ProductService";
import { Suspense } from "react";
import { AllProductsPagination } from "@/components/modules/Product/AllProductsPagination";
import { IProductCard } from "@/types";
import AllProductsLoading from "@/components/Loaders/AllProductsLoading";

interface SearchParams {
  search?: string;
  minPrice?: string;
  maxPrice?: string;
  availability?: string;
  sortBy?: string;
  page?: string;
}

async function ProductsPage({ searchParams }: { searchParams: Record<string, string | string[]> }) {
  const getValue = (key: keyof SearchParams): string | undefined => {
    const value = searchParams[key];
    return typeof value === "string" ? value : undefined;
  };

  const filters = {
    search: getValue("search"),
    minPrice: getValue("minPrice"),
    maxPrice: getValue("maxPrice"),
    availability: getValue("availability"),
    sortBy: getValue("sortBy") || "default",
  };

  const page = parseInt(getValue("page") || "1", 10);
  const limit = 9;

  const productsData = await getAllProductsWithQuery(page.toString(), limit.toString(), filters);

  if ("error" in productsData) {
    return <div className="text-red-600 text-center mt-10">Error: {productsData.error}</div>;
  }

  const products = productsData.products || [];
  const meta = productsData.meta || { total: 0, totalPage: 1 };
  const totalPages = meta.totalPage || 1;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">
            {filters.search ? `Search results for "${filters.search}"` : "Our Products"}
          </h1>
        </div>
        <MobileFilterSheet />
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {products.map((product: IProductCard) => (
            <div key={product._id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-muted-foreground">No products found</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <AllProductsPagination currentPage={page} totalPages={totalPages} searchParams={searchParams} />
      )}
    </div>
  );
}

export default async function AllProductsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[]>>;
}) {
  const resolvedSearchParams = await searchParams;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-8">
        {/* Sidebar on Desktop */}
        <aside className="hidden lg:block w-80 flex-shrink-0">
          <FilterSidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <Suspense
            fallback={
              <AllProductsLoading/>
            }
          >
            <ProductsPage searchParams={resolvedSearchParams} />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
