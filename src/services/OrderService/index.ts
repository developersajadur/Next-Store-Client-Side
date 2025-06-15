"use server"

import { FieldValues } from "react-hook-form";
import { BASE_API_URL } from "..";
import { cookies } from "next/headers";
import { IOrderStatus } from "@/types";



export const createOrder = async (orderData: FieldValues) => {
  try {
    const res = await fetch(`${BASE_API_URL}/orders/make-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
         Authorization: (await cookies()).get("token")!.value,
      },
    body: JSON.stringify(orderData),
    });
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getOrdersForMe = async (query?: string) => {
  const res = await fetch(
    `${BASE_API_URL}/orders/get-my-orders${query ? `?${query}` : ""}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("token")!.value,
      },
    }
  );
  const result = await res.json();
  return result.data.data;
};
