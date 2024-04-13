import { Order } from "../models/order.model.js";
import { apierror } from "../utils/apierror.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiresponse } from "../utils/apiresponse.js";
import { Product } from "../models/product.model.js";
// order
const neworder = asyncHandler(async (req, res, next) => {
  const {
    shippinginfo,
    orderitem,
    taxprice,
    totalprice,
    paymentinfo,
    itemprice,
    shippingprice,
  } = req.body;
  const order = await Order.create({
    shippinginfo,
    orderitem,
    taxprice,
    totalprice,
    paymentinfo,
    itemprice,
    shippingprice,
    user: req.user._id,
    paidAT: Date.now(),
  });
  res.status(200).json(new apiresponse(201, order, "order have been placed"));
});
const getsingleorder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) {
    next(new apierror(404, `product with that id ${req.params.id} not found`));
  }
  res
    .status(200)
    .json(new apiresponse(200, order, "order is fetched from datatbase"));
});
const allorders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({
    user: req.user._id,
  });
  if (!orders) {
    next(new apierror(404, `user have not placed any oredr`));
  }
  res
    .status(200)
    .json(
      new apiresponse(200, orders, " all the order is fetched from datatbase")
    );
});
const adminallorders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find();
  if (!orders) {
    next(new apierror(404, `error occured in fetching the details`));
  }
  let totalamount = 0;
  orders.forEach((order) => (totalamount += order.totalprice));
  res
    .status(200)
    .json(
      new apiresponse(
        200,
        { totalamount, orders },
        " all the order with total amount fetched "
      )
    );
});
const changestatus = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  //console.log(order);
  if (!order) {
    return next(new apierror(404, "product not found"));
  }
  if (order.orderstatus === "Delivered") {
    return next(new apierror(404, "u have already dilivered the order"));
  }
  order.orderitem.forEach(async (order) => {
    await updatestock(order.product, order.quantity);
  });
  console.log(req.body.status);
  order.orderstatus = req.body.status;
  if (req.body.status == "Delivered") order.deliveredat = Date.now();
  await order.save({ validateBeforeSave: false });
  console.log(order);
  res.status(200).json(new apiresponse(200, "order status has been changed"));
});
// update stock:::
async function updatestock(id, quantity) {
  const product = await Product.findById(id);
  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}
const deltedorder = asyncHandler(async (req, res, next) => {
  await Order.deleteOne({ _id: req.params.id });
  res.status(200).json(new apiresponse(200, "order have been delted "));
});

export {
  neworder,
  allorders,
  getsingleorder,
  adminallorders,
  changestatus,
  deltedorder,
};
