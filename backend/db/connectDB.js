import mongoose from "mongoose";


export const connectDb=async()=>{
    try{
 await mongoose.connect(process.env.MONGOURL)
  console.log("db connected !!!")
    }catch(error){
   console.log(error, "connecting to connect")
    }
}