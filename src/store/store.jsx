import { configureStore } from "@reduxjs/toolkit";
import Slicedata from "../store/slice";
export const store = configureStore({
  reducer: {
    Allstore: Slicedata.reducer,
  },
});
