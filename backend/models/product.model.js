import mongoose from "mongoose";
const productschema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter the name"]
    },
    description:{
        type:String,
        required:[true,"please enter the description"]
    },
    price:{
        type:Number,
        required:[8,"enter the price:"]

    },
    rating:{
        type:Number,
        default:0,
    },
    images:[
        {
            public_id:{
                type:String,
                required:true,
            },
            url:{
                type:String,
                required:true,

            }
        }
    ],
    category:{
        type:String,
        required:[true,"category must be required"],
    },
    stock:{
        type:Number,
        required:[true,"please enter the stock"],
        maxLength:4,
        default:1,
    },
    numofdreview:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
                required:true,
            },
          
            name:{
                type:String,  
            },
            rating:{
                type:Number,  
            },
            comment:{
                type:String,
            }
        }
    ],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
},{timestamps: true });
export const Product=mongoose.model("Product",productschema);