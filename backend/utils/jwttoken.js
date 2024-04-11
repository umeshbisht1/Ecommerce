import { apiresponse } from "./apiresponse.js";

const sendtoken=(user,statuscode,res)=>{
    const token=user.getjwttoken();
   
    const options={
        httpOnly:true,
        expire:new Date(Date.now()+process.env.COOKIE_EXPIRE*24*60*60*1000)
    }
    
    //console.log(token);
    return res.status(statuscode).cookie('token',token,options).json(new apiresponse(200,user,token))
}
export{sendtoken}