import { BASE_API_URL } from ".";

export const getAllProductsForProductCard = async (
  page?: string,
  limit?: string,
  query?: { [key: string]: string | string[] | boolean | undefined }
) => {
  const params = new URLSearchParams();

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined) params.append(key, value.toString());
    });
  }

  try {
    const res = await fetch(
      `${BASE_API_URL}/products/get-all-for-product-card?limit=${
        limit || "10"
      }&page=${page || "1"}&${params.toString()}`,
      { cache: "no-store" }
    );
    return await res.json();
  } catch (error: any) {
    return { error: error.message };
  }
};
