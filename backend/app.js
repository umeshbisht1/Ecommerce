import express from 'express'
import cookieParser from 'cookie-parser'
import { router } from './router/product.route.js'
import { errorHandler } from './middleware/error.js'
import {routeruser} from './router/user.router.js'
import { orderrouter } from './router/order.route.js'
const app=express()
app.use(express.json())
app.use(cookieParser())
app.use(express.static("uploads"))
app.use("/api/v1",router)
app.use("/api/v1",routeruser)
app.use("/api/v1",orderrouter)
app.use(errorHandler)
export {app}