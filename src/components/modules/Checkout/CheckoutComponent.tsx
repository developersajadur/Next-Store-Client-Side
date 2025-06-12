"use client";

import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MdOutlineDelete } from "react-icons/md";
import { Checkbox } from "@/components/ui/checkbox";
import { ShieldCheck } from "lucide-react";
import Image from "next/image";
import { checkoutSchemaValidation } from "./checkoutSchemaValidation";
import * as z from "zod";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import { createOrder } from "@/services/OrderService";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useUser } from "@/contexts/UserContext";
import { TTokenUser } from "@/types";
import { useState } from "react";
import {
  clearCart,
  removeProductFromCart,
  updateProductQuantity,
} from "@/redux/features/cartSlice";

type FormInputs = z.infer<typeof checkoutSchemaValidation>;

export default function CheckoutComponent() {
  const { user } = useUser();
  const currentUser: TTokenUser | null = user || null;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { products: cartItems } = useAppSelector((state) => state.cart);
  const handleRemoveItem = (productId: string) => {
    dispatch(removeProductFromCart(productId));
    toast.success("Item removed from cart");
  };

  const handleQuantityChange = (
    productId: string,
    type: "increase" | "decrease"
  ) => {
    dispatch(updateProductQuantity({ productId, type }));
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(checkoutSchemaValidation),
    defaultValues: {
      method: "online",
      fullName: "",
      email: "",
      phone: "",
      shippingAddress: "",
      note: "",
      termsAccepted: false,
    },
  });

  const watchMethod = watch("method");
  const watchTermsAccepted = watch("termsAccepted");

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.orderQuantity,
    0
  );
  const total = subtotal;

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    if (!currentUser) {
      router.push(`/login?redirectPath=/checkout`);
      toast.error("You must be logged in to place an order.");
      return;
    }

    setIsLoading(true);

    try {
      const dataToSend = {
        products: cartItems.map((item) => ({
          product: item._id,
          quantity: item.orderQuantity,
        })),
        orderName: data.fullName,
        orderEmail: data.email,
        orderPhone: data.phone,
        method: data.method,
        shippingAddress: data.shippingAddress,
        note: data.note,
      };
      console.log(dataToSend);

      const res = await createOrder(dataToSend);
      console.log(res);
      if (res.success) {
        toast.success("Order placed successfully!");
        dispatch(clearCart());
        if (data.method === "online") {
          router.push(res.data);
        }
      } else {
        toast.error(
          res.message || "An error occurred while placing the order."
        );
      }
    } catch (error: any) {
      toast.error(
        error.message || "An error occurred while placing the order."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-800">
        Checkout
      </h1>
      {cartItems.length === 0 ? (
        <h2 className="text-2xl text-center text-gray-500">
          Your cart is empty. Add some items to the cart to proceed Checkout.
        </h2>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-lg font-medium">Shipping Information</h2>

                {/* Payment Method */}
                <div className="space-y-3">
                  <Label>Payment Method</Label>
                  <RadioGroup
                    value={watchMethod}
                    onValueChange={(value: "online" | "cash") =>
                      setValue("method", value)
                    }
                    className="flex flex-wrap gap-4"
                  >
                    <label
                      htmlFor="online"
                      className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer w-full sm:w-[180px]"
                    >
                      <RadioGroupItem
                        value="online"
                        id="online"
                        className="text-orange-500 focus:ring-orange-500"
                      />
                      <span>Online</span>
                    </label>

                    <label
                      htmlFor="cash"
                      className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer w-full sm:w-[180px]"
                    >
                      <RadioGroupItem
                        value="cash"
                        id="cash"
                        className="text-orange-500 focus:ring-orange-500"
                      />
                      <span>Cash On Delivery</span>
                    </label>
                  </RadioGroup>

                  {errors.method && (
                    <p className="text-sm text-red-500">
                      {errors.method.message}
                    </p>
                  )}
                </div>

                {/* Main form */}
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">
                        Full name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="fullName"
                        placeholder="Enter full name"
                        {...register("fullName")}
                        className={errors.fullName ? "border-red-500" : ""}
                      />
                      {errors.fullName && (
                        <p className="text-sm text-red-500">
                          {errors.fullName.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email address <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter email address"
                        {...register("email")}
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">
                        Phone number <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter phone number"
                        {...register("phone")}
                        className={errors.phone ? "border-red-500" : ""}
                      />
                      {errors.phone && (
                        <p className="text-sm text-red-500">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="note">
                        Note <span className="text-gray-500">(Optional)</span>
                      </Label>
                      <textarea
                        id="note"
                        rows={1}
                        placeholder="Enter a note"
                        {...register("note")}
                        className={`w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.note ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.note && (
                        <p className="text-sm text-red-500">
                          {errors.note.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shippingAddress">
                      Shipping Address <span className="text-red-500">*</span>
                    </Label>
                    <textarea
                      id="shippingAddress"
                      rows={3}
                      placeholder="Enter your full Shipping Address"
                      {...register("shippingAddress")}
                      className={`w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.shippingAddress
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {errors.shippingAddress && (
                      <p className="text-sm text-red-500">
                        {errors.shippingAddress.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Terms */}
                <div className="flex items-start space-x-3 py-2">
                  <Checkbox
                    id="terms"
                    className="border-black border-2 cursor-pointer focus:ring-blue-500"
                    checked={watchTermsAccepted}
                    onCheckedChange={(checked) =>
                      setValue("termsAccepted", checked as boolean)
                    }
                  />
                  <div className="space-y-1 leading-none">
                    <Label
                      htmlFor="terms"
                      className="text-sm font-normal cursor-pointer"
                    >
                      I have read and agree to the Terms and Conditions.
                    </Label>
                    {errors.termsAccepted && (
                      <p className="text-sm text-red-500">
                        {errors.termsAccepted.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium">Review your cart</h2>
                <Link
                  href="/cart"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Back to Cart
                </Link>
              </div>

              {/* Cart Items */}
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-4 py-3 border-b"
                  >
                    {/* Image fixed on left */}
                    <div className="w-16 h-16 bg-white rounded border flex items-center justify-center flex-shrink-0">
                      <Image
                        src={item.image.url}
                        alt={item.image.fileName}
                        width={60}
                        height={60}
                        className="object-contain"
                      />
                    </div>

                    {/* Content area */}
                    <div className="flex-1 flex flex-col justify-between h-16">
                      {/* Row 1: Title and Delete */}
                      <div className="flex justify-between items-center">
                        <Link href={`/products/${item.slug}`}>
                          <h3 className="font-medium cursor-pointer hover:underline">
                            {item.title}
                          </h3>
                        </Link>
                        <button
                          onClick={() => handleRemoveItem(item._id)}
                          className="text-red-500 hover:text-red-700 cursor-pointer text-xl md:text-2xl ml-4"
                          aria-label="Remove item"
                        >
                          <MdOutlineDelete />
                        </button>
                      </div>

                      {/* Row 2: Price and Quantity Controls */}
                      <div className="flex justify-between items-center mt-1">
                        <p className="font-medium">
                          ${(item.price * item.orderQuantity).toFixed(2)}
                        </p>
                        <div className="flex items-center bg-gray-100 border rounded-md overflow-hidden">
                          <button
                            className="px-2 md:px-3 py-1 bg-gray-200 text-gray-700 cursor-pointer hover:bg-gray-300 rounded-l"
                            onClick={() =>
                              handleQuantityChange(item._id, "decrease")
                            }
                          >
                            -
                          </button>
                          <span className="px-4 font-semibold">
                            {item.orderQuantity}
                          </span>
                          <button
                            className="px-2 md:px-3 py-1 bg-gray-200 text-gray-700 cursor-pointer hover:bg-gray-300 rounded-r"
                            onClick={() =>
                              handleQuantityChange(item._id, "increase")
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="space-y-2 pt-4 border-t">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium pt-2 border-t">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Final Action Button */}
              <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600"
                onClick={handleSubmit(onSubmit)}
                disabled={isLoading}
              >
                {isLoading
                  ? "Processing..."
                  : watchMethod === "online"
                  ? "Pay Now"
                  : "Place Order"}
              </Button>

              <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                <ShieldCheck className="h-4 w-4" />
                <span>Secure Checkout - SSL Encrypted</span>
              </div>
              <p className="text-xs text-gray-500 text-center">
                Ensuring your financial and personal details are secure during
                every transaction.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
