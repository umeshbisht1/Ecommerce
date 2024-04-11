import { apierror } from "../utils/apierror.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken"
const authticateduser=asyncHandler(async(req,res,next)=>{
    const { token }=req.cookies;
  
    if(!token)
    {
        return next(new apierror(401,"user is not logged in "));
    }
    const decodeddata= jwt.verify(token,process.env.JWT_SECRET);
    console.log(decodeddata._id);
    req.user=await User.findById(decodeddata._id);
    next();

})
const authorizationrole=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role))
        return next(new apierror(403,`role ::${req.user.role} is not allowed to access`));
        next();
    }
    
}
 export {authticateduser,authorizationrole}