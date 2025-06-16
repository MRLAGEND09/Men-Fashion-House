import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  cart: [],

  userInfo: null,
};

export const counterSlice = createSlice({
  name: "shopping",
  initialState,
  reducers: {
    addShpping: (state, action) => {
      const exisistingProduct = state.cart.find(
        (item) => item.id === action.payload.id
      );

      if (exisistingProduct) {
        exisistingProduct.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },

    incressQuantity: (state, action) => {
      const exisistingProduct = state.cart.find(
        (item) => item.id === action.payload
      );

      if (exisistingProduct) {
        exisistingProduct.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const exisistingProduct = state.cart.find(
        (item) => item.id === action.payload
      );

      if (exisistingProduct.quantity > 1) {
        exisistingProduct.quantity -= 1;
        toast.success("decrement your product");
      } else {
        toast.error("can not delete less then 1 ");
      }
    },

    singleDelete: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },

    allRemove: (state) => {
      state.cart = [];
    },

    addUser: (state, action) => {
      state.userInfo = action.payload;
    },
    deleteUser: (state) => {
      state.userInfo = null;
    },
  },
});

export const {
  addShpping,
  incressQuantity,
  decrementQuantity,
  singleDelete,
  allRemove,
  addUser,
  deleteUser,
} = counterSlice.actions;

export default counterSlice.reducer;
