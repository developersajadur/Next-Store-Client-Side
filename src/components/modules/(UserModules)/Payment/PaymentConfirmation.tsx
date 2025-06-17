"use client";

import { Check, FileText, XCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { PaymentConfirmation } from "@/services/(UserServices)/PaymentService";
import { clearCart } from "@/redux/features/cartSlice";
import { TPaymentResponse } from "@/types";
import Link from "next/link";

export default function PaymentConfirmationComponent() {
  const [orderData, setOrderData] = useState<TPaymentResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) {
        setError("No order ID provided");
        setLoading(false);
        return;
      }

      try {
        const response = await PaymentConfirmation(orderId);
        if (response.success) {
          dispatch(clearCart());
          setOrderData(response?.data);
        } else {
          setError(response.message || "Failed to verify order");
        }
      } catch (err: any) {
        setError(err.message || "Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [dispatch, orderId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-xl font-medium text-gray-700">
          Verifying Payment...
        </h1>
      </div>
    );
  }

  if (error || !orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-xl font-semibold text-red-500">
          {error || "Payment information not available"}
        </h1>
      </div>
    );
  }

  const statusColor =
    orderData.status === "paid"
      ? "bg-green-500"
      : orderData.status === "pending"
      ? "bg-yellow-500"
      : "bg-red-500";

  const statusText =
    orderData.status === "paid"
      ? "Payment completed"
      : orderData.status === "pending"
      ? "Payment pending"
      : "Payment failed";

  const StatusIcon =
    orderData.status === "paid"
      ? Check
      : orderData.status === "pending"
      ? Clock
      : XCircle;

  const {
    sp_order_id,
    createdAt,
    amount,
    gatewayResponse,
    userId,
    method,
    transactionId,
  } = orderData;

  const formattedDate = new Date(createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white shadow-lg">
        <CardContent className="p-8 text-center space-y-6">
          <div className="flex justify-center">
            <div
              className={`w-16 h-16 ${statusColor} rounded-xl flex items-center justify-center`}
            >
              <StatusIcon className="w-8 h-8 text-white" strokeWidth={3} />
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-2xl font-semibold text-gray-900">
              {statusText}
            </h1>
            {
              orderData.status === "paid" ? (
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <FileText className="w-4 h-4" />
              <span>Order number {sp_order_id}</span>
            </div>
              ) : null
            }
          </div>

          <Separator className="my-6" />

          {orderData.status === "paid" ? (
            <div className="space-y-4 text-left">
              <h2 className="text-lg font-medium text-gray-900 text-center sm:text-left">
                Transaction details
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Name</span>
                  <span className="font-medium text-gray-900 break-all">
                    {userId?.name || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Email</span>
                  <span className="font-medium text-gray-900 break-all">
                    {userId?.email || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Date</span>
                  <span className="font-medium text-gray-900">
                    {formattedDate}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Payment Method</span>
                  <span className="font-medium text-gray-900">
                    {gatewayResponse?.method || method || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Transaction ID</span>
                  <span className="font-medium text-gray-900 break-all">
                    {transactionId || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total</span>
                  <span className="font-semibold text-gray-900 text-lg">
                    ৳{amount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4 text-sm text-gray-600">
              <p>
                {orderData.status === "pending"
                  ? "Your payment is currently pending. Please wait while we confirm it."
                  : "Unfortunately, your payment has failed. You can try again or contact support if you have been charged."}
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
                <Link href="/checkout">
                  <Button className="w-full text-white bg-orange-500 sm:w-auto">
                    Try Again
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button className="w-full bg-black text-white hover:bg-orange-500 sm:w-auto">
                    Contact Support
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {orderData.status === "paid" && (
            <Button
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-lg"
              size="lg"
            >
              View invoice
            </Button>
          )}

          <div className="pt-4 space-y-2 text-xs text-gray-500 text-center">
            <div className="font-medium">Next Store Inc.</div>
            <div className="whitespace-pre-line leading-relaxed">
              Dinajpur, Rangpur, Bangladesh
            </div>
            <div className="pt-1">itzmesojib@gmail.com | +8801787448412</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
