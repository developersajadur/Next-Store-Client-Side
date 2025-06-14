"use server"

import { cookies } from "next/headers";
import { BASE_API_URL } from "..";

export const PaymentConfirmation = async (orderId: string) => {
  try {
    const res = await fetch(
      `${BASE_API_URL}/payments/payment-confirmation?order_id=${orderId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("token")?.value || "",
        },
      }
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return new Error(error.message || "Something went wrong!");
  }
};