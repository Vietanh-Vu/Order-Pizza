import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      // payload = newItem
      state.cart.push(action.payload);
    },
    deleteItem: (state, action) => {
      // payload = pizzaId
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity: (state, action) => {
      // payload = pizzaId
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.unitPrice * item.quantity;
    },
    decreaseItemQuantity: (state, action) => {
      // payload = pizzaId
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.unitPrice * item.quantity;
      if (item.quantity === 0) {
        cartSlice.caseReducers.deleteItem(state, action);
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

// for more performance use reselect library
// export const getTotalCartQuantity = (state) =>
//   state.cart.cart.reduce((acc, item) => acc + item.quantity, 0);
const selectCart = (state) => state.cart.cart;

export const getTotalCartQuantity = createSelector([selectCart], (cart) => {
  return cart.reduce((acc, item) => acc + item.quantity, 0);
});

// export const getTotalCartPrice = (state) =>
//   state.cart.cart.reduce((acc, item) => acc + item.totalPrice, 0);
export const getTotalCartPrice = createSelector([selectCart], (cart) => {
  return cart.reduce((acc, item) => acc + item.totalPrice, 0);
});

// export const getCart = (state) => state.cart.cart;
export const getCart = createSelector(selectCart, (cart) => {
  return cart;
});

export const getCurrentQuantityById = (id) =>
  createSelector(
    [selectCart],
    (cartItems) => cartItems.find((item) => item.pizzaId === id)?.quantity ?? 0,
  );

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
