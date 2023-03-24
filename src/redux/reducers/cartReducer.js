import { createSlice } from "@reduxjs/toolkit";
import { discount } from "../../ulties/discount";
const cart = localStorage.getItem("cart");
const cartData = cart ? JSON.parse(cart) : [];
function allItems(cartData) {
  let totalItems = 0;
  cartData.forEach((element) => {
    const totalQuantity = totalItems + element.quantity;
    totalItems = totalQuantity;
  });
  return totalItems;
}
function totalMoney(cartData) {
  let totalPrice = 0;
  cartData.forEach((element) => {
    const totalMoney =
      element.quantity *
      (element.price - (element.price * element.discount) / 100);
    totalPrice = totalMoney;
  });
  return totalPrice;
}
const initialState = {
  cart: cartData.length > 0 ? cartData : [],
  items: cartData.length > 0 ? allItems(cartData) : 0,
  totalMoney: cartData.length > 0 ? totalMoney(cartData) : [],
};

export const cartSlice = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    addtoCart: (state, action) => {
      const checkItem = state.cart.find(
        (item) => item._id === action.payload._id
      );
      if (!checkItem) {
        state.items += action.payload.quantity;
        state.totalMoney +=
          discount(action.payload.price, action.payload.discount) *
          action.payload.quantity;
        state.cart.push(action.payload);
      } else {
        state.cart = [...state.cart];
      }
    },
    emptyCart: (state, action) => {
      state.totalMoney = 0;
      state.items = 0;
      state.cart = [];
    },

    deleteCartItem: (state, action) => {
      const find = state.cart.find((item) => {
        return item._id === action.payload;
      });
      if (find) {
        const index = state.cart.indexOf(find);
        state.items -= find.quantity;
        state.totalMoney -= discount(find.price, find.discount) * find.quantity;
        state.cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    incQuantity: (state, action) => {
      const find = state.cart.find((item) => {
        return item._id === action.payload;
      });
      if (find) {
        find.quantity += 1;
        state.items += 1;
        state.totalMoney += discount(find.price, find.discount);
        const index = state.cart.indexOf(find);
        state.cart[index] = find;
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    decQuantity: (state, action) => {
      const find = state.cart.find((item) => item._id === action.payload);
      if (find && find.quantity > 1) {
        find.quantity -= 1;
        state.items -= 1;
        state.totalMoney -= discount(find.price, find.discount);
        const index = state.cart.indexOf(find);
        state.cart[index] = find;
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
  },
});
export const {
  addtoCart,
  emptyCart,
  deleteCartItem,
  incQuantity,
  decQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
