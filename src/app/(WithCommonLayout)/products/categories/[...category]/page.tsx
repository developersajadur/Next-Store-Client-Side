import { FilterSidebar } from "@/components/modules/(UserModules)/Product/filter-sidebar";
import { MobileFilterSheet } from "@/components/modules/(UserModules)/Product/mobile-filter-sheet";
import { ProductCard } from "@/components/modules/(UserModules)/Product/ProductCard";
import { getAllProductsForCategoryWithQuery } from "@/services/(UserServices)/ProductService";
import { Suspense } from "react";
import { AllProductsPagination } from "@/components/modules/(UserModules)/Product/AllProductsPagination";
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

async function CategoryProductsPage({
  searchParams,
  params,
}: {
  searchParams: Record<string, string | string[]>;
   params: Promise<{ category: string }>;
}) {
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
     const { category } = await params;

  const productsData = await getAllProductsForCategoryWithQuery(category, page.toString(), limit.toString(), filters);


  const products = productsData.products || [];
  const meta = productsData.meta || { total: 0, totalPage: 1 };
  const totalPages = meta.totalPage || 1;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold capitalize">{category}</h1>
        <MobileFilterSheet />
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product: IProductCard) => (
            <ProductCard key={product._id} product={product} />
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

      {totalPages > 1 && (
        <AllProductsPagination
          currentPage={page}
          totalPages={totalPages}
          searchParams={searchParams}
        />
      )}
    </div>
  );
}

export default async function AllCategoryProducts({
  searchParams,
  params,
}: {
  searchParams: Promise<Record<string, string | string[]>>;
   params: Promise<{ category: string }>;
}) {
  const resolvedSearchParams = await searchParams;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-8">
        <aside className="hidden lg:block w-80 flex-shrink-0">
          <FilterSidebar />
        </aside>

        <main className="flex-1 min-w-0">
          <Suspense fallback={<AllProductsLoading />}>
            <CategoryProductsPage searchParams={resolvedSearchParams} params={params} />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
