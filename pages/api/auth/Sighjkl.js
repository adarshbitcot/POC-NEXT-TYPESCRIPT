import mongoose from "mongoose";
const UserModel=require('../../../model/userSchema')
async function handler(req, res) {
    //connecting Mongodb
  mongoose.connect(
    "mongodb+srv://adarshk0027:adarshk0027@cluster0.snbxi.mongodb.net/bitcotpoc?retryWrites=true&w=majority"
  );
  mongoose.connection
    .on("open", () => console.log("Database Connecte SuccesFully"))
    .on("error", (error) => console.log("MongooseError::::", error));

  if (req.method == "POST") {
    const { email, password } = req.body;

    if (email && password) {
        const AlredyRegistered=await UserModel.findOne({email})

        if(!AlredyRegistered){
            res.status(300).json({Emessage:"Email Is Not Regestered Yet"})
            mongoose.connection.close()
            return
        }

        //check Password 
         console.log("alreadyRegistered",AlredyRegistered,password);
        if(AlredyRegistered.password==password){
            //return success Response
            res.status(200).json({message:"User Logged In SuccesFully"})
            mongoose.connection.close()
            return
        }
        
        res.status(300).json({Emessage:"Password Is Not Correct"})
        return

    }
  }
}

export default handler;


