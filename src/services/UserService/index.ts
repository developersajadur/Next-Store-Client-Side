"use server";

import { revalidateTag } from "next/cache";
import { BASE_API_URL } from "..";
import { cookies } from "next/headers";

export const getMyProfileData = async () => {
  try {
    const res = await fetch(`${BASE_API_URL}/users/my-profile-data`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("token")!.value,
      },
      next: {
        tags: ["USER"],
      },
    });
    const result = await res.json();
    return result.data;
  } catch (error: any) {
    return Error(error);
  }
};

export const updateUser = async (userInfo: FormData) => {
  try {
    const res = await fetch(`${BASE_API_URL}/users/update-user`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        Authorization: (await cookies()).get("token")!.value,
      },
      body: userInfo,
    });
    const result = await res.json();
    revalidateTag("USER");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
