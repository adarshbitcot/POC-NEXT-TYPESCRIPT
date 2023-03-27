import { NextApiRequest, NextApiResponse } from "next";
import { CONNECT_DB } from "../../../helper/db";
import { InitialAddProduct } from "../../../types/interfaces";
import ProductModel from ".././../../model/productSchema";
async function handler(req: NextApiRequest, res: NextApiResponse) {
  await CONNECT_DB();

  if (req.method == "POST") {
    console.log(req.body);
    let catogery: string = req.body.data.catogery;
    if (typeof catogery == "string") {
      const product: Array<
        InitialAddProduct & {
          _id: string;
        }
      > = await ProductModel.find({
        category: catogery,
      });
      console.log(product);

      if (product.length > 0) {
        return res
          .status(200)
          .json({ product: product, productLength: product.length });
      }
    }
  }
}

export default handler;
