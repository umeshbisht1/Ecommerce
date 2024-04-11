import mongoose from "mongoose";
const connectdatabase=()=>{
    mongoose.connect(process.env.DB_URI).then(()=>{
        console.log("data base connected succesfully bawa");
    })
    
}
export {connectdatabase}