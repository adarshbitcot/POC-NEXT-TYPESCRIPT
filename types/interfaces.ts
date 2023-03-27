import {
  ProductValidationSchema,
  SignInValidationSchema,
  SignUpValidationSchema,
} from "../helper/form_validation";
import * as yup from "yup";
import { AxiosError } from "axios";


// export interface ErrorResponse extends AxiosResponse {
//   status: number;
//   message: string;
// }

export function isAxiosError(something: any): something is AxiosError {
  return something.isAxiosError === true;
}

export type UserLogin = yup.InferType<typeof SignInValidationSchema>;
export type UserSignUp = yup.InferType<typeof SignUpValidationSchema>;
export type Product = yup.InferType<typeof ProductValidationSchema>;

type Nullable<T> = T | null;

type Variation = {
  variant: string;
  price: string;
  stock: string;
  productImage: string;
};

// export type InitialUpdateProduct={
//   _id: string
//   productName: string
//   description: string
//   price: number
//   status: NonNullable<"In stock" | "Limited stock" | "out of stock"> | Nullable<string>
//   costPerItem:string
//   taxRate:string
//   category:NonNullable<"clothe" | "bags" | "watches" | "shoes" | "devices"> | Nullable<string>
//   comparePrice:string
//   variation:Array<Variation>
// }

export type InitialUpdateProduct = {
  _id: string;
  productName: string;
  description: string;
  price: number;
  status:
    | NonNullable<"In stock" | "Limited stock" | "out of stock">
    | Nullable<string>;
  costPerItem: string;
  taxRate: string;
  category:
    | NonNullable<"clothe" | "bags" | "watches" | "shoes" | "devices">
    | Nullable<string>;
  comparePrice: string;
  variation: Array<Variation> | Variation;
};

export type InitialAddProduct = {
  productName: string;
  description: string;
  price: number;
  status:
    | NonNullable<"In stock" | "Limited stock" | "out of stock">
    | Nullable<string>;
  costPerItem: string;
  taxRate: string;
  category:
    | NonNullable<"clothe" | "bags" | "watches" | "shoes" | "devices">
    | Nullable<string>;
  comparePrice: string;
  variation: Array<Variation> | Variation;
};

export type ProductI = Product & {
  _id: string;
};
