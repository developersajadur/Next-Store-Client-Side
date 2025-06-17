"use server"

import { cookies } from "next/headers"
import { revalidateTag } from "next/cache"
import { BASE_API_URL } from "@/services"

export interface TProduct {
  title: string
  image: string | null
  gallery_images: string[]
  category: string[]
  brand: string
  description: string
  short_description?: string
  price: number
  regular_price: number
  sale_price?: number
  color?: string[]
  stock_quantity: number
  specifications: {
    key: string
    value: string
  }[]
  warranty?: string
  weight?: number
  size?: string
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string
}

export const createProduct = async (data: TProduct) => {
  try {
    const res = await fetch(`${BASE_API_URL}/products/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("token")!.value,
      },
      body: JSON.stringify(data),
    })

    const result = await res.json()
    // console.log(result);

    revalidateTag("PRODUCT")
    return result
  } catch (error: any) {
    console.error("Error creating product:", error)
    throw new Error(error.message || "Failed to create product")
  }
}