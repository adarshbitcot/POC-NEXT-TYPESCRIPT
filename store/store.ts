import { configureStore } from "@reduxjs/toolkit";
import { ProductSlice } from "./product_slice";
import { createWrapper } from "next-redux-wrapper";
import {Store} from 'redux'

const makeStore = () =>
  configureStore({
    reducer: {
      [ProductSlice.name]: ProductSlice.reducer,
    },
    devTools: true,
  });
//console.log(makeStore);
//const store=makeStore()
const store = makeStore().getState
export const wrapper = createWrapper<RootStore>(makeStore, { debug: true });
export type RootState=ReturnType<typeof store >
export type RootStore=ReturnType<typeof makeStore>
