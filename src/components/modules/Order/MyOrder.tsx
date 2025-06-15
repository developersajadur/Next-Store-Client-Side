// File: components/modules/Order/MyOrder.tsx
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, MoreHorizontal, Package, Truck, Clock } from "lucide-react";
import { IMyOrderResponse } from "@/types";
import OrderCardSkeleton from "./OrderCardSkeleton";
import { getOrdersForMe } from "@/services/OrderService";
import Image from "next/image";
import Link from "next/link";

export default function MyOrders() {
  const [activeTab, setActiveTab] = useState("current");
  const [orders, setOrders] = useState<IMyOrderResponse[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      let statusQuery = "";

      if (activeTab === "current") {
        statusQuery = "status=Pending&status=Confirmed&status=Shipped";
      } else if (activeTab === "delivered") {
        statusQuery = "status=Delivered";
      }

      const res = await getOrdersForMe(statusQuery);
      setOrders(res || []);
      setLoading(false);
    };

    fetchOrders();
  }, [activeTab]);

  const OrderCard = ({ order }: { order: IMyOrderResponse }) => (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">Order #: {order._id}</h3>
            <p className="text-sm text-muted-foreground">
              {order.products.length} Products | {order.orderName} |{" "}
              {new Date(order.createdAt).toDateString()}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Download invoice</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View Details</DropdownMenuItem>
                <DropdownMenuItem>Track Order</DropdownMenuItem>
                <DropdownMenuItem>Contact Support</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Status:</span>
            <Badge variant="secondary" className="ml-2">
              {order.status}
            </Badge>
          </div>
          <div>
            <span className="text-muted-foreground">Date of delivery:</span>
            <p className="font-medium">
              {order.DeliveredAt
                ? new Date(order.DeliveredAt).toDateString()
                : "Not delivered"}
            </p>
          </div>
          <div className="sm:col-span-2 lg:col-span-1">
            <span className="text-muted-foreground">Delivered to:</span>
            <p className="font-medium">{order.shippingAddress}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Total:</span>
            <p className="text-lg font-semibold">
              {order.totalPrice.toFixed(2)} BDT
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t">
          {order.products.map((item, idx) => (
            <div key={idx} className="flex gap-3 p-3 bg-muted/30 rounded-lg">
              <div className="w-20 h-20 bg-muted rounded-md flex items-center justify-center flex-shrink-0">
                <Image
                  src={item.product.image.url || "/placeholder.png"}
                  alt={item.product?.title || "Product Image"}
                  width={100}
                  height={100}
                  className="object-cover rounded-md"
                />
              </div>
              <div className="flex-1 min-w-0">
                <Link className="hover:underline" href={`/products/${item.product.slug}`}>
                <h4 className="font-medium text-sm line-clamp-2 mb-1">
                  {item.product?.title}
                </h4>
                </Link>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p>Quantity: {item.quantity}x</p>
                  <p>Price: {item.product?.sale_price?.toFixed(2)} BDT</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold">My Orders</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-fit grid-cols-3">
          <TabsTrigger value="current" className="flex items-center gap-2">
            <Truck className="h-4 w-4" />
            <span className="sm:inline">Current</span>
          </TabsTrigger>
          <TabsTrigger value="delivered" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className="sm:inline">Delivered</span>
          </TabsTrigger>
          <TabsTrigger value="all" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            <span className="sm:inline">All Orders</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4 mt-6">
          {loading ? (
            [...Array(2)].map((_, idx) => <OrderCardSkeleton key={idx} />)
          ) : orders.length > 0 ? (
            orders.map((order) => <OrderCard key={order._id} order={order} />)
          ) : (
            <Card className="p-8 text-center">
              <Truck className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No orders found</h3>
              <p className="text-muted-foreground">
                {activeTab === "current"
                  ? "You don't have any orders in progress."
                  : activeTab === "unpaid"
                  ? "All your orders have been paid for."
                  : "No orders found."}
              </p>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
