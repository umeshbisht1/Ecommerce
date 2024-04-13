
import {app} from './app.js'
import dotenv from 'dotenv'
import { connectdatabase } from './config/database.js'
import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"   // file system


dotenv.config({
    path:"backend/.env"
})
connectdatabase()
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUSINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
app.get("/",(req,res)=>{
    res.send("its okey bawa")
})
const server=app.listen(process.env.PORT||3000,()=>{
    console.log(`server at ${process.env.PORT}`);
})
process.on("unhandledRejection",(err)=>{
    console.log(`error ${err.message}`);
    console.log('shutting down the server due to unhandled rejection');
    server.close(()=>{
        process.exit(1);
    })

    })