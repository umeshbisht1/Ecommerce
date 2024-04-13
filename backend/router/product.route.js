import express from 'express'
import { createproduct, deleteproduct, deletereview, findallreviews, getallproduct,productReview,productdetails,updateproduct } from '../controller/product.controller.js';
import { authticateduser,authorizationrole } from '../middleware/auth.js';
import { upload } from '../middleware/multer.js';
const router=express.Router();
router.route("/products").get(getallproduct)
router.route("/admin/create").post(authticateduser,authorizationrole("admin"),upload.single("images"),createproduct)
router.route("/admin/update/:id").put(authticateduser,authorizationrole("admin"),updateproduct).delete(authticateduser,authorizationrole("admin"),deleteproduct);
router.route("/update/:id").get(productdetails);
router.route("/review").put(authticateduser,productReview);
router.route("/getallreview").get(findallreviews);
router.route("/deletereviw").delete(authticateduser,deletereview)
export{
 router
}
