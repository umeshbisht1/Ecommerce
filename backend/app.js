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
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static("uploads"));
app.use("/api/v1", router);
app.use("/api/v1", routeruser);
app.use("/api/v1", orderrouter);
// app.use(express.static(path.join(_dirname,'/frontend/dist')))
// app.get('*',(req,res)=>{
//     res.sendFile(path.join(_dirname,'frontend',"dist",'index.html'))
// })
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
app.use(errorHandler);
export { app };
