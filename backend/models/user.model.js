import mongoose from "mongoose";
import validator from "validator";
import { Schema } from "mongoose";
import bcrypt from 'bcrypt'
import Jwt from "jsonwebtoken"
import crypto from 'crypto'
const userschema = new Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        maxLength: [30, "name length can,t exceded from 30"],
        minLength: [4, "name should have mopre than 4"]

    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
        validate:[validator.isEmail,"please enter the valid email"]
    },
    passward: {
        type: String,
        required: [true, "passward is required"],
        minLength: [8, "password should have mopre than 4"],
        select:false,
    },
    avatar:{
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,

        }
    },
    role: {
        type: String,
        default:"user"
    },
    resetPasswordToken:String,
    resetpasswordExpire:Date,
}, { timestamps: true });
userschema.pre("save",async function(next)
{
    if(!this.isModified("passward"))
    {
        next();
    }
    this.passward=await bcrypt.hash(this.passward,10);

})
userschema.methods.getjwttoken=function()
{
    return Jwt.sign(
        {
            _id:this._id,
           
        },
        process.env.JWT_SECRET,
        {
            expiresIn:process.env.JWT_EXPIRE
        }
    )
}
userschema.methods.iscorrect=async function(enterpassward)
{
    console.log(enterpassward,this.passward);
   return await bcrypt.compare(enterpassward,this.passward);
}
userschema.methods.getrestpasswardtoken=async function(){
//generate token;
const resettoken=crypto.randomBytes(20).toString("hex");
// hashing and adding to userschema;
this.resetPasswordToken=crypto.createHash("sha256").update(resettoken).digest("hex");
this.resetpasswordExpire=Date.now()+15*60*1000; 

return resettoken;
}
export const User = mongoose.model("User", userschema);