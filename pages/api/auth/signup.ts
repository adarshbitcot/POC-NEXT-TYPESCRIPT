import { NextApiRequest, NextApiResponse } from "next";

const mongoose = require("mongoose");
const UserModel = require("../../../model/userSchema");
async function handler(req:NextApiRequest, res:NextApiResponse) {
  //connect to mongo db
  try {
    mongoose.connect(
      "mongodb+srv://adarshk0027:adarshk0027@cluster0.snbxi.mongodb.net/bitcotpoc?retryWrites=true&w=majority"
    );
    mongoose.connection
      .on("open", () => console.log("Database Connecte SuccesFully"))
      .on("error", (error:any) => console.log("MongooseError::::", error));
  
  } catch (error) {
    console.log("database Connectio Error",error);
  }
  
  if (req.method == "POST") {
    const { email, password } = req.body;
    //validate user also loged in

    const UserAlreadyExist=  await UserModel.findOne({ email })

    if (UserAlreadyExist) {
      return res.status(300).json({ Emessage: "User Already Exist" });
    }

    try {
      const createUser = await UserModel.create({ email, password });
      if (createUser) {
         res.status(200).json({ message: "User Created SuccesFully" });
         return

      }
    } catch (error) {
        console.log("authError",error);
       res
        .status(500)
        .json({ Emessage: "Something Went Wrong Check Network" });

        mongoose.connection.close()
         return
    }
  }



  if (req.method == "GET") {
  }
}

export default handler;

//connect mongodb First =>done
//then add userdata=>done
//validate data and return error messages=>done
