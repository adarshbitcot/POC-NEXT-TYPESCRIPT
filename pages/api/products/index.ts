import { CONNECT_DB } from "../../../helper/db";
import productModel from "../../../model/productSchema";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req:NextApiRequest,res:NextApiResponse){
    //CONNECT DB FIRST
    CONNECT_DB()
    if(req.method=="GET"){
        const products=await (await productModel.find({})).reverse()

        if(products.length> 0){
            return res.status(200).json({products})
        }
        
    }
}

export default handler;