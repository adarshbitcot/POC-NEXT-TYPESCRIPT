import mongoose,{Model} from "mongoose";
import { Product, ProductI } from "../types/interfaces";


const ProductSchema=new mongoose.Schema<Product>({
    productName:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    category:{
        type:String,
        required:true,
        trim:true 
    },
    status:{
        type:String,
        required:true,
    },
    variation:[
        {
            variant:{
                type:String,
                required:true,
                trim:true
            },
            price:{
                type:String,
                required:true,
                trim:true
            },
            stock:{
                type:String,
                required:true,
                trim:true
            },
            productImage:{
                type:String,
                required:true,
                trim:true
            }
        }
    ]
})

const Product_Model:Model<Product>= mongoose.models.products || mongoose.model<ProductSchema>('products',ProductSchema)
export default Product_Model;

export type ProductSchema=mongoose.InferSchemaType<typeof ProductSchema>