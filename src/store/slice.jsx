import { createSlice } from "@reduxjs/toolkit";
import data from "../api/data.json";

// Load cart and favourite data from localStorage and sessionStorage if available
const storedCart = JSON.parse(localStorage.getItem("cart")) || JSON.parse(sessionStorage.getItem("cart")) || [];
const storedFavourite = JSON.parse(localStorage.getItem("favourite")) || JSON.parse(sessionStorage.getItem("favourite")) || [];

const initialState = {
  cart: storedCart,
  Favourite: storedFavourite,
  items: data,
  TotalQuantity: 0,
  TotalPrice: 0,
};

export const DataSlice = createSlice({
  name: "Data",
  initialState,
  reducers: {
    addtocart: (State, action) => {
      let find = State.cart.findIndex(
        (items) => items.id === action.payload.id
      );
      if (find >= 0) {
        State.cart[find].qu += 1;
      } else State.cart.push(action.payload);
      
      // Save updated cart to localStorage and sessionStorage
      localStorage.setItem("cart", JSON.stringify(State.cart));
      sessionStorage.setItem("cart", JSON.stringify(State.cart));
    },
    addvalue: (State, action) => {
      let findIndex = State.cart.findIndex(
        (items) => items.id === action.payload.id
      );
      if (findIndex >= 0) {
        State.cart[findIndex].qu = State.cart[findIndex].qu + 1;
      }
      
      // Save updated cart to localStorage and sessionStorage
      localStorage.setItem("cart", JSON.stringify(State.cart));
      sessionStorage.setItem("cart", JSON.stringify(State.cart));
    },
    subvalue: (State, action) => {
      let findIndex = State.cart.findIndex(
        (items) => items.id === action.payload.id
      );
      if (findIndex >= 0) {
        if (State.cart[findIndex].qu === 1) {
          return;
        } else State.cart[findIndex].qu = State.cart[findIndex].qu - 1;
      }

      // Save updated cart to localStorage and sessionStorage
      localStorage.setItem("cart", JSON.stringify(State.cart));
      sessionStorage.setItem("cart", JSON.stringify(State.cart));
    },
    getcarttotal: (state) => {
      let { TotalQuantity, TotalPrice } = state.cart.reduce(
        (carttotal, cartitem) => {
          let { price, qu } = cartitem;
          const itemtotal = price * qu;
          carttotal.TotalPrice += itemtotal;
          carttotal.TotalQuantity += qu;
          return carttotal;
        },
        {
          TotalPrice: 0,
          TotalQuantity: 0,
        }
      );
      state.TotalPrice = parseInt(TotalPrice.toFixed(2));
      state.TotalQuantity = TotalQuantity;
    },
    addtofavourite: (State, action) => {
      let find = State.Favourite.findIndex(
        (item) => item.name === action.payload.name
      );
      if (find >= 0) {
        return;
      } else {
        State.Favourite.push(action.payload);
      }

      // Save updated favourite list to localStorage and sessionStorage
      localStorage.setItem("favourite", JSON.stringify(State.Favourite));
      sessionStorage.setItem("favourite", JSON.stringify(State.Favourite));
    },
    Unfavourite: (State, action) => {
      let find = State.Favourite.findIndex(
        (item) => item.name === action.payload.name
      );
      State.Favourite.splice(find, 1);

      // Save updated favourite list to localStorage and sessionStorage
      localStorage.setItem("favourite", JSON.stringify(State.Favourite));
      sessionStorage.setItem("favourite", JSON.stringify(State.Favourite));
    },
    itemremove: (state, action) => {
      state.cart = state.cart.filter((x) => x.id !== action.payload.id);

      // Save updated cart to localStorage and sessionStorage
      localStorage.setItem("cart", JSON.stringify(state.cart));
      sessionStorage.setItem("cart", JSON.stringify(state.cart));
    },
  },
});

export default DataSlice;
export const {
  addtocart,
  addtofavourite,
  getcarttotal,
  addvalue,
  subvalue,
  itemremove,
  Unfavourite,
} = DataSlice.actions;
