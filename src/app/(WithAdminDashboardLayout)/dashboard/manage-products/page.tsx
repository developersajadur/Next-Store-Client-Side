
import { ManageProducts } from "@/components/modules/(AdminModules)/Manage-Products/ManageProduct";
import { getAllProductsWithQuery } from "@/services/(UserServices)/ProductService";

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
  const limit = 20;

  const productsData = await getAllProductsWithQuery(page.toString(), limit.toString(), filters);

  if ("error" in productsData) {
    return <div className="text-red-600 text-center mt-10">Error: {productsData.error}</div>;
  }

  const products = productsData.products || [];
  const meta = productsData.meta || { total: 0, totalPage: 1 };
  const totalPages = meta.totalPage || 1;

  return (
    <ManageProducts
      products={products}
      currentPage={page}
      totalPages={totalPages}
      totalItems={meta.total}
    />
  );
}

export default async function ManageProductsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[]>>;
}) {
  const resolvedSearchParams = await searchParams;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* <Suspense fallback={<AdminProductsLoading />}> */}
        <ProductsPage searchParams={resolvedSearchParams} />
      {/* </Suspense> */}
    </div>
  );
}
