import { BASE_API_URL } from "..";


export const getAllProductsWithQuery = async (
  page?: string,
  limit?: string,
  query?: { [key: string]: string | string[] | boolean | undefined }
) => {
  const params = new URLSearchParams();

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        params.append(key, value.toString());
      }
    });
  }

  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_API}/products/get-all-for-product-card?limit=${limit || "9"}&page=${page || "1"}&${params.toString()}`;
    const res = await fetch(url, { cache: "no-store" });
    const json = await res.json();
    // console.log(res);

    return {
      products: json.data?.data || [],
      meta: json.meta || { total: 0, totalPage: 1 },
    };
  } catch (error: any) {
    return { error: error.message || "Unknown error occurred" };
  }
};
export const getAllProductsForCategoryWithQuery = async (
    categorySlug: string,
  page?: string,
  limit?: string,
  query?: { [key: string]: string | string[] | boolean | undefined },
) => {
  const params = new URLSearchParams();

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        params.append(key, value.toString());
      }
    });
  }

  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_API}/products/get-all-category-products/${categorySlug}?limit=${limit || "9"}&page=${page || "1"}&${params.toString()}`;
    const res = await fetch(url, { cache: "no-store" });
    const json = await res.json();
    // console.log(res);

    return {
      products: json.data?.data || [],
      meta: json.meta || { total: 0, totalPage: 1 },
    };
  } catch (error: any) {
    return { error: error.message || "Unknown error occurred" };
  }
};



export const getAllProductsForHome = async () => {
  try {
    const res = await fetch(`${BASE_API_URL}/products/get-all-home-products`, {
      method: "GET",
      cache: "no-store",
    });
    const products = await res.json();
    return products.data;
  } catch (error: any) {
    return { error: error.message };
  }
};

export const getProductDetailsBySlug = async (slug: string) => {
  try {
    const res = await fetch(`${BASE_API_URL}/products/get-by-slug/${slug}`, {
      method: "GET",
      cache: "no-store",
    });
    const products = await res.json();
    return products.data;
  } catch (error: any) {
    return { error: error.message };
  }
};
export const getRelatedProducts = async (slug: string) => {
  try {
    const res = await fetch(
      `${BASE_API_URL}/products/get-related-product-by-slug/${slug}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );
    const products = await res.json();
    return products.data;
  } catch (error: any) {
    return { error: error.message };
  }
};
