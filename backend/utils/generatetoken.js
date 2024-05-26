import jwt from "jsonwebtoken";

//gereate token and set cookie
const generateTokenSet =((userId, res)=>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET,{
        expiresIn:'15d'
    })
   res.cookie("jwt", token,{
    maxAge:15*24*60*69*1000,//milisecond format
    httpOnly:true,  //User cannot access this cookie,  prevent XSS attacks cross-site scripting attacks
    sameSite:"strict"    //CSF attacks cross-site request forgery attacks
}) 
})

export default generateTokenSet