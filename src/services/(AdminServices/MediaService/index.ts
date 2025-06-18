"use server";

import { cookies } from "next/headers";
import { BASE_API_URL } from "../..";
import { revalidateTag } from "next/cache";

export const getAllMedia = async (limit: number = 18) => {
  try {
    const res = await fetch(`${BASE_API_URL}/medias/all-media?limit=${limit}`, {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("token")!.value,
      },
      next: {
        tags: ["MEDIA"],
      },
    });

    const result = await res.json();
    // console.log(result);
    return result;
  } catch (error: any) {
    return { error: error.message };
  }
};


export const uploadMedia = async (images: FormData) => {
  try {
    const res = await fetch(`${BASE_API_URL}/medias/upload-multiple-media`, {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: (await cookies()).get("token")!.value,
      },
      body: images,
    });
    const result = await res.json();
     revalidateTag("MEDIA");
    return result;
  } catch (error: any) {
    return { error: error.message };
  }
};


