"use client"
import { removeProductFromCart, updateProductQuantity } from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { toast } from "sonner";

const CartComponent = () => {
  const [promoCode, setPromoCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);

  const dispatch = useAppDispatch();
  const { products: cartItems } = useAppSelector((state) => state.cart);

  const handleRemoveItem = (productId: string) => {
    dispatch(removeProductFromCart(productId));
    toast.success("Item removed from cart");
  };

  const handleQuantityChange = (productId: string, type: "increase" | "decrease") => {
    dispatch(updateProductQuantity({ productId, type }));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.orderQuantity, 0);
  const totalCost = subtotal;

  const handleCheckout = () => {
    console.log(
      "Order Placed:",
      cartItems.map((item) => ({ orderId: item._id, orderQuantity: item.orderQuantity }))
    );
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "save10" && !discountApplied) {
      setDiscountApplied(true);
    }
  };



  return (
    <div className="container mx-auto p-4 md:p-8 lg:p-12">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-800">
        Shopping Cart
      </h2>

      {cartItems.length === 0 ? (
        <h2 className="text-2xl text-center text-gray-500">
          Your cart is empty. Add some items to the cart to proceed.
        </h2>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 bg-white p-2 md:p-6 shadow-md rounded-lg">
            <h3 className="text-lg md:text-xl font-medium mb-4">
              {cartItems.length} Items
            </h3>
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex flex-col md:flex-row items-center justify-between border-b p-2 md:p-4 mb-4"
              >
                {/* Product Image and Details */}
                <div className="flex gap-4 items-center w-full md:w-auto">
                  <Image
                    src={item.image.url}
                    alt={item.image.fileName}
                    height={300}
                    width={300}
                    className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg shadow"
                  />
                  <div className="flex flex-col md:flex-row md:items-center justify-between w-full">
                    <div>
                      <div className="flex justify-between">
                        <Link href={`/products/${item.slug}`} className="text-md md:text-lg font-semibold text-primary">
                          {item.title}
                        </Link>
                        {/* Delete Button */}
                        <button
                          onClick={() => handleRemoveItem(item._id)}
                          className="text-red-500 hover:text-red-700 text-xl md:text-2xl md:hidden"
                        >
                          <MdOutlineDelete />
                        </button>
                      </div>
                      <div className="text-md md:text-lg flex flex-col md:flex-row gap-1 md:gap-3 items-start md:items-center font-semibold text-blue-600">
                        <p className="text-primary font-semibold">
                          Price: {item.price.toFixed(2)} BDT
                        </p>
                        <p className="text-primary line-through text-sm">
                          {0} BDT
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quantity & Price */}
                <div className="flex flex-row-reverse md:flex-col items-center md:items-end gap-2 mt-2 md:mt-0">
                  <button
                    onClick={() => handleRemoveItem(item._id)}
                    className="text-red-500 hover:text-red-700 cursor-pointer text-xl md:text-2xl hidden md:block"
                  >
                    <MdOutlineDelete />
                  </button>
                  <p className="text-md md:text-lg font-semibold">
                    {(item.price * item.orderQuantity).toFixed(2)} BDT
                  </p>
                  <div className="flex items-center bg-gray-100 border rounded-md overflow-hidden">
                    <button
                      className="px-2 md:px-3 py-1 bg-gray-200 text-gray-700 cursor-pointer hover:bg-gray-300"
                      onClick={() => handleQuantityChange(item._id, "decrease")}
                    >
                      -
                    </button>
                    <span className="px-3 md:px-4 font-semibold">{item.orderQuantity}</span>
                    <button
                      className="px-2 md:px-3 py-1 bg-gray-200 cursor-pointer text-gray-700 hover:bg-gray-300"
                      onClick={() => handleQuantityChange(item._id, "increase")}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white h-fit p-4 md:p-6 shadow-md rounded-lg">
            <h3 className="text-lg md:text-xl font-medium mb-4 text-gray-800">
              Order Summary
            </h3>
            <div className="flex justify-between mb-3 text-gray-600">
              <span>Subtotal ({cartItems.length} items)</span>
              <span className="font-semibold">{subtotal.toFixed(2)} BDT</span>
            </div>
            <div className="mt-4">
              <label className="text-sm font-semibold text-gray-700">
                Promo Code
              </label>
              <div className="flex mt-1">
                <input
                  type="text"
                  className="border rounded-l p-2 w-full text-sm"
                  placeholder="Enter your code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <button
                  className="bg-red-500 cursor-pointer text-white px-4 rounded-r hover:brightness-110"
                  onClick={applyPromoCode}
                >
                  Apply
                </button>
              </div>
              {discountApplied && (
                <p className="text-green-500 text-sm mt-2">
                  Promo applied! Free shipping.
                </p>
              )}
            </div>
            <div className="flex justify-between text-md md:text-lg font-semibold mt-4 text-gray-800">
              <span>Total</span>
              <span>{totalCost.toFixed(2)} BDT</span>
            </div>
            <button
              className="w-full mt-6 py-3 cursor-pointer bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-all duration-200 shadow-md"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartComponent;