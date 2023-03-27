import productSchema from "../../../model/productSchema";
import { NextApiRequest, NextApiResponse } from "next";


function CastToNumber(x: any): number {
  let convertedX = Number(x);
  return convertedX;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  let { page } = req.query;

  let limit = 10;
  let castPage = CastToNumber(page);
  let previousPage = castPage - 1;

  if (req.method == "GET") {
    const products = await (await productSchema.find({}))
      .reverse()
      .slice(previousPage * limit, castPage * limit);
    if (products.length > 0) {
      return res.status(200).json({ products, currentPage: castPage });
    }
  }

  //return res.json(query);
}

export default handler;
