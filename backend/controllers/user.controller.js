import User from "../models/user.model.js"

export const getUserForSideBar = async(req, res)=>{
   try{
   const loggedInuserId=  req.user._id
   const filterUser = await  User.find({_id: { $ne: loggedInuserId}}).select("-password")

   res.status(200).json(filterUser)

   }catch(error){
    console.log("Error in getusersidebar", error.message)
    res.status(500).json({error: "Internal server error"})
   }
}