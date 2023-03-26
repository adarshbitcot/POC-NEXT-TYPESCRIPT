import { CONNECT_DB } from "../../../helper/db";
import  productModel, { ProductSchema } from '../../../model/productSchema'
import { NextApiRequest,NextApiResponse } from "next";
import { ProductI } from "../../../types/interfaces";

type Res={

}


async function handler(req:NextApiRequest, res:NextApiResponse){
  CONNECT_DB();
  const { updateId } = req.query;
  
  if (req.method == "PUT") {
    //get data from body
    //update product
    const data = req.body;
    console.log(data);
    const update = await productModel.updateOne({ _id: updateId }, data);

    if (update) res.status(200).json({ message: "Update SuccesFully" });
  }

  if (req.method == "GET") {
    const product = await productModel.findById( updateId );
    if (product) {
      return res.status(200).json({ message: "Fetch Product", product });
    }
    if(product==null) return res.status(400).json({message:"Not get Product"})
  }

  if (req.method == "DELETE") {
    if (updateId) {
      const deleted = await productModel.deleteOne({ _id: updateId });
      if (deleted) {
        return res.status(200).json({ message: "deleted SuccesFully" });
      }
    }
  }
}

export default handler;
