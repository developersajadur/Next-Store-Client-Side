"use server";

import { BASE_API_URL } from "../..";

export const getSingleProductWithSomeDataBySlug = async (slug: string) => {
  try {
    const res = await fetch(`${BASE_API_URL}/products/get-single-product-with-some-data/${slug}`, {
      method: "GET",
      cache: "no-store",
    });
    const result = await res.json();
    return result.data;
  } catch (error: any) {
    return Error(error);
  }
};
