import express from 'express'
import { Router } from 'express'
import { authorizationrole, authticateduser } from '../middleware/auth.js';
import { adminallorders, allorders, changestatus, deltedorder, getsingleorder, neworder } from '../controller/order.controller.js';
const orderrouter=express.Router();
orderrouter.route("/ordernow").post(authticateduser,neworder)
orderrouter.route("/sigleorderdetails/:id").get(authticateduser,getsingleorder)
orderrouter.route("/allorder/:id").get(authticateduser,allorders)
orderrouter.route("/admin/allorders").get(authticateduser,authorizationrole("admin"),adminallorders)
orderrouter.route("/admin/updatestatus/:id").put(authticateduser,authorizationrole("admin"),changestatus)
orderrouter.route("/admin/deleteorder/:id").delete(authticateduser,authorizationrole("admin"),deltedorder)


export {orderrouter}