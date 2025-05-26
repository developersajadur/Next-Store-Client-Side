import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [] as any
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProduct: (state, action) => {
            state.products.push(action.payload);
        }
    }
})

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;