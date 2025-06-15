import { IProductCard } from "./product.type";

export interface IOrderProduct {
  _id: string;
  product: IProductCard;
  quantity: number;
}

export const OrderStatus = {
  Pending: "Pending",
  Confirmed: "Confirmed",
  Shipped: "Shipped",
  Delivered: "Delivered",
  Cancelled: "Cancelled",
  Returned: "Returned",
} as const;

export type IOrderStatus = keyof typeof OrderStatus;

export interface IMyOrderResponse {
  _id: string;
  userId: string;
  products: IOrderProduct[];
  shippingAddress: string;
  orderEmail: string;
  orderPhone: string;
  orderName: string;
  method: "online" | "cash";
  isPaid: "pending" | "paid" | "failed" | "refunded";
  shippingCost: number;
  couponCode: number | null;
  totalPrice: number;
  note: string;
  status: IOrderStatus;
  paidAt?: Date;
  DeliveredAt?: Date;
  createdAt: string;
  updatedAt: string;
}
