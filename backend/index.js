
import {app} from './app.js'
import dotenv from 'dotenv'
import { connectdatabase } from './config/database.js'
dotenv.config({
    path:"backend/.env"
})
connectdatabase()
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