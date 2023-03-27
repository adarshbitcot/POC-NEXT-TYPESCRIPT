
import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { InitialUpdateProduct, ProductI } from "../types/interfaces";
import { RootState } from "./store";

type Initial={
  products: Array<InitialUpdateProduct>
  productLength:number
  currentPage: number
}

type ProductRes=Array<InitialUpdateProduct>

type CurrentPageRes={
  currentPage: number
}

type AddProductRes=Omit<InitialUpdateProduct,"price" |"_id"|"costPerItem"|"taxRate"|"comparePrice">

type FilterProductRes={
  products: Array<InitialUpdateProduct>,
  productLength: number,
}

const initialState:Initial = {
  products: [],
  productLength: 0,
  currentPage: 1,
};





export const ProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    AddProducts: (state:Initial, action:PayloadAction<ProductRes>) => {
      state.products = action.payload;
    },
    AddProductLength: (state, action) => {
      state.productLength = action.payload;
    },
    _FilterProducts:(state,action:PayloadAction<FilterProductRes>)=>{
      state.products = action.payload.products,
      state.productLength=action.payload.productLength
    },

    // SelectProducts: (state, { payload: id, prevId }) => {
    //   console.log(id, prevId);

    //   //Change PrevId Product State To False
    //   if (prevId !== null) {
    //     state.products= state.products.map((item, index) => {
    //       if (item._id == id.prevId) {
    //         item.selected = false;
    //       }
    //       return item;
    //     });
    //   }

    //   //select a Product And Update The State

    //   //select a Product And Update The State
    //   state.products = state.products.map((item, index) => {
    //     console.log("check", item._id === id.id);
    //     if (item._id == id.id) {
    //       item.selected = true;
    //     }
    //     else{
    //       item.selected=false
    //     }

    //     return item;
    //   });

    //   //then Map the Product With State
    // },

    SetCurrentPage: (state, action:PayloadAction<number>) => {
      if(state.currentPage !== action.payload){
        state.currentPage = action.payload;
      }
      // state.products = state.products.slice(0, action.payload * 20);
    },

    updateProducts: (state, action) => {},
    AddNewProducts:(state,action:PayloadAction<InitialUpdateProduct>)=>{
      state.products.pop()
      state.products.unshift(action.payload)
    },
    deleteProducts: (state, action:PayloadAction<string>) => {
      state.products=state.products.filter((data,index)=>data._id !== action.payload)
      state.productLength=state.productLength-1
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log("state", state);
      return {
        ...state,
        ...action.payload.products,
      };
    },
  },
});

export const {
  AddProducts,
  updateProducts,
  AddProductLength,
  SetCurrentPage,
  deleteProducts,
  AddNewProducts,
  _FilterProducts
} = ProductSlice.actions;
export const getAllProducts = (state:RootState) => state.products.products;
export const getProductById = (state:RootState, id:string) =>
  state.products.products.find((produ:InitialUpdateProduct, index:number) => produ._id == id);
export const getProductLength = (state:RootState) => state.products.productLength;
export const getCurrentPage = (state:RootState) => state.products.currentPage;
export default ProductSlice.reducer;

//we need to configure our store first=>done
