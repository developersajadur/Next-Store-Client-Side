"use server"

import { FieldValues } from "react-hook-form";
import { BASE_API_URL } from "../..";
import { cookies } from "next/headers";



export const changePassword = async (data: FieldValues) => {
  try {
    const res = await fetch(`${BASE_API_URL}/users/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
         Authorization: (await cookies()).get("token")!.value,
      },
    body: JSON.stringify(data),
    });
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};