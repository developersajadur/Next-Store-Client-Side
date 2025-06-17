"use server"

import { BASE_API_URL } from "@/services";

export const getAllCategoryWithSomeData = async () => {
  try {
    const res = await fetch(`${BASE_API_URL}/categories/get-all-with-some-data`, {
      method: "GET",
      cache: "no-store",
    });
    const categories = await res.json();
    return categories.data;
  } catch (error: any) {
    return { error: error.message };
  }
};
