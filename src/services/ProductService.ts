import { BASE_API_URL } from ".";

export const getAllProductsForHome = async () => {
  try {
     const res = await fetch(`${BASE_API_URL}/products/get-all-home-products`,{
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
     const res = await fetch(`${BASE_API_URL}/products/get-by-slug/${slug}`,{
    method: "GET",
      cache: "no-store",
    });
    const products = await res.json();
    return products.data;
  } catch (error: any) {
    return { error: error.message };
  }
};
