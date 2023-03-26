import { NextApiRequest, NextApiResponse } from "next";
import { CONNECT_DB } from "../../../helper/db";
import UserModel from "../../../model/userSchema";

async function handler(req:NextApiRequest, res:NextApiResponse) {
  CONNECT_DB();
  if (req.method == "POST") {
    const { email, password } = req.body;
    console.log(password);
    if (email && password) {
      //Check user already register or not
      const AlredyRegistered = await UserModel.findOne({ email });
      //if not already registered throw error
      if (!AlredyRegistered) {
        return res.status(300).json({ message: "User Not Registered Yet" });
      }

      if (AlredyRegistered.password == password) {
        //return success Response
        console.log("coreect password");
        return  res.status(200).json({ user: AlredyRegistered });
      }

      return res.status(300).json({ message: "Password Is Incorrect" });
    }
  }
}
export default handler;
