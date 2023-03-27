import { NextApiRequest, NextApiResponse } from "next";
import { CONNECT_DB } from "../../../helper/db";
import productModel from "../../../model/productSchema";

async function handler(req:NextApiRequest, res:NextApiResponse) {
  
  CONNECT_DB();
  if (req.method == "POST") {
    //add product
    //get data from req
    const data = req.body;
    console.log(data);
    productModel.create(data).then((data) => {
      return res.status(200).json({ message: "Product Added Success Fully",data });
    });

    //if(add_product) res.status(200).json({message:"Product Added Success Fully"})
  }

  if (req.method == "PUT") {
    //get data from body
    //update product
    const data = req.body;
    const update = await productModel.updateOne({ _id: data._id }, data);

    if (update) res.status(200).json({ message: "Update SuccesFully" });
  }

  
}

export default handler;
