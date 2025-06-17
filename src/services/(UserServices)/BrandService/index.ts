"use server"

import { BASE_API_URL } from "../..";

export const getAllBrandWithSomeData = async () => {
  try {
    const res = await fetch(`${BASE_API_URL}/brands/get-all-with-some-data`, {
      method: "GET",
      cache: "no-store",
    });
    const brands = await res.json();
    return brands.data;
  } catch (error: any) {
    return { error: error.message };
  }
};
