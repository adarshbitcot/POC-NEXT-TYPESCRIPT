import mongoose, { Model } from "mongoose"



const UserSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        requuired:true
    }

})

// UserSchema.pre('save', function(next){
//     if(this.password){
//         console.log("this.paswrd",this.password);
//         bcrypt.hash(this.password,10).then((data)=>this.password=data)
//     }
//     next();
// })


const UserModel:Model<UserSchemaM> = mongoose.models.user || mongoose.model<UserSchemaM>('user',UserSchema)
export default UserModel;
export type UserSchemaM =mongoose.InferSchemaType<typeof UserSchema>





