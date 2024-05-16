import express from "express";
import cookieParser from "cookie-parser";
import { router } from "./router/product.route.js";
import { errorHandler } from "./middleware/error.js";
import { routeruser } from "./router/user.router.js";
import { orderrouter } from "./router/order.route.js";
import { Order } from "./models/order.model.js";
import { User } from "./models/user.model.js";
import { Product } from "./models/product.model.js";
import getprofit from "./utils/getprofit.js";
import path from 'path'
import dotenv from 'dotenv'
import { connectdatabase } from './config/database.js'
import { v2 as cloudinary } from 'cloudinary';
import cors from 'cors'

const app = express();


dotenv.config({
    path:"backend/.env"
})
connectdatabase()
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUSINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

const server=app.listen(process.env.PORT||3000,()=>{
    console.log(`server at ${process.env.PORT}`);
})
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.static("uploads"));
app.get("/",(req,res)=>{
    res.send("its okey bawa")
})

app.use("/api/v1", router);
app.use("/api/v1", routeruser);
app.use("/api/v1", orderrouter);
// app.use(express.static(path.join(__dirname,'/frontend')))
app.get("/api/details", async (req, res) => {
    
    let c = 0;
    let total = 0;
    let user=0;
    let product=0;
    try {
      user = await User.countDocuments();
      product = await Product.countDocuments();
      const order = await Order.find({});
  
      //orderstatus: 'Delivered',
      order.map((item) => {
        if (item.orderstatus == "Delivered") c++;
        total++;
      });
    } catch (error) {
      console.log(error);
    }
     const profit=await getprofit();
    
    return res.json({ tuser: user, tproduct:product, order: [c, total - c],profit });
  });
// app.get('*',(req,res)=>{
//     res.sendFile(path.join(__dirname,'frontend','index.html'))
// })




app.use(errorHandler); 
process.on("unhandledRejection",(err)=>{
    console.log(`error ${err.message}`);
    console.log('shutting down the server due to unhandled rejection');
    server.close(()=>{
        process.exit(1);
    })

    })