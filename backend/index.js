import {app} from './app.js'
import dotenv from 'dotenv'
import { connectdatabase } from './config/database.js'
import { v2 as cloudinary } from 'cloudinary';
import path from 'path'
import express from 'express'


dotenv.config({
    path:"backend/.env"
})
connectdatabase()
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUSINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
const  _dirname=path.resolve();

app.get("/",(req,res)=>{
    res.send("its okey bawa")
})

const server=app.listen(process.env.PORT||3000,()=>{
    console.log(`server at ${process.env.PORT}`);
})
app.use(express.static(path.join(_dirname,'/frontend/dist')))
app.get('*',(req,res)=>{
    res.sendFile(path.join(_dirname,'frontend',"dist",'index.html'))
})
process.on("unhandledRejection",(err)=>{
    console.log(`error ${err.message}`);
    console.log('shutting down the server due to unhandled rejection');
    server.close(()=>{
        process.exit(1);
    })

    })