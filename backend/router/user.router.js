import express from 'express'
import { Loginuser, Register, deleteuser, forgitpassword,addtocart,getcart2,getallusers, getdetailsofoneuser, getuserprofile, logout, resetpassword, updatepassword, updateprofile, updaterole, removecart } from '../controller/user.controller.js';
import { authorizationrole, authticateduser } from '../middleware/auth.js';
const routeruser=express.Router();
routeruser.route("/register").post(Register)
routeruser.route("/login").post(Loginuser)
routeruser.route("/forgetpassword").post(forgitpassword)
routeruser.route("/password/reset/:token").put(resetpassword)
routeruser.route("/logout").post(logout)
routeruser.route("/addtocart").post(authticateduser,addtocart)
routeruser.route("/getcart2").get(authticateduser,getcart2)
routeruser.route("/removecart/:id").put(authticateduser,removecart);
routeruser.route("/getprofile").get(authticateduser,getuserprofile)

routeruser.route("/changepassord").put(authticateduser,updatepassword)
routeruser.route("/updateprofile").put(authticateduser,updateprofile)
routeruser.route("/admin/getallusers").get(authticateduser,authorizationrole("admin"),getallusers);
routeruser.route("/admin/getsingleuser/:id").get(authticateduser,authorizationrole("admin"),getdetailsofoneuser);
routeruser.route("/admin/updaterole/:id").put(authticateduser,authorizationrole("admin"),updaterole);
routeruser.route("/admin/deleteuser/:id").delete(authticateduser,authorizationrole("admin"),deleteuser);

export {routeruser}