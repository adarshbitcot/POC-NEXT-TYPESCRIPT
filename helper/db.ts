import mongoose from "mongoose";


export const CONNECT_DB=()=>{
    mongoose.connect(
        "mongodb+srv://adarshk0027:adarshk0027@cluster0.snbxi.mongodb.net/bitcotpoc?retryWrites=true&w=majority"
      );
      mongoose.connection
        .on("open", () => console.log("Database Connecte SuccesFully"))
        .on("error", (error) => console.log("MongooseError::::", error));
}

export const CANCEL_CONNECTION=()=>{
    mongoose.connection.close()
}



