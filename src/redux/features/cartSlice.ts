import { ICart } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TInitialState = {
  products: ICart[];
  address: string;
};

const initialState: TInitialState = {
  products: [],
  address: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart(state, action: PayloadAction<ICart>) {
      const product = action.payload;
      const existingProduct = state.products.find(
        (item) => item._id === product._id
      );

      if (existingProduct) {
        existingProduct.orderQuantity += 1;
      } else {
        state.products.push({ ...product, orderQuantity: 1 });
      }
    },
    removeProductFromCart(state, action: PayloadAction<string>) {
      state.products = state.products.filter((item) => item._id !== action.payload);
    },
    updateProductQuantity(
      state,
      action: PayloadAction<{ productId: string; type: "increase" | "decrease" }>
    ) {
      const { productId, type } = action.payload;
      state.products = state.products.map((item) =>
        item._id === productId
          ? {
              ...item,
              orderQuantity:
                type === "increase"
                  ? item.orderQuantity + 1
                  : Math.max(1, item.orderQuantity - 1),
            }
          : item
      );
    },
    setShippingAddress(state, action: PayloadAction<string>) {
      state.address = action.payload;
    },
    clearCart(state) {
      state.products = [];
    },
  },
});

export const {
  addProductToCart,
  removeProductFromCart,
  updateProductQuantity,
  setShippingAddress,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
