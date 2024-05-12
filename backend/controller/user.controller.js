import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { apiresponse } from "../utils/apiresponse.js";
import { apierror } from "../utils/apierror.js";
import { sendtoken } from "../utils/jwttoken.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";

import { Product } from "../models/product.model.js";
const Register = asyncHandler(async (req, res, next) => {
  const { name, email, passward } = req.body;
  const user = await User.create({
    name,
    email,
    passward,
    avatar: {
      public_id: "this isa a sample id",
      url: "https://localhost:900/",
    },
  });
  sendtoken(user, 201, res);
});
const Loginuser = asyncHandler(async (req, res, next) => {
  const { email = "", passward = "" } = req.body;
  console.log(req.body);
  if (!email || !passward)
    return next(new apierror(404, "all the feild must required bawa"));
  const user = await User.findOne({ email: email }).select("+passward");
  //console.log(user);
  if (!user) {
    return next(new apierror(404, "user not found"));
  }
  const check = await user.iscorrect(passward);
  if (!check) {
    return next(new apierror(404, "invalid username and password"));
  }
  return sendtoken(user, 200, res);
});
const logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json(new apiresponse(200, "user is logout successfully"));
});
const forgitpassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new apierror(404, "user not found"));
  const resettoken = await user.getrestpasswardtoken();
  console.log(resettoken);
  await user.save({ validateBeforeSave: false });
  const resetpasswordurl = `http://${req.get(
    "host"
  )}/api/v1/passward/reset/${resettoken}`;
  const message = `your password reset token is -\n\n ${resetpasswordurl} \n\n if you have not request lease ignore it`;
  console.log(message);
  try {
    await sendEmail({
      email: user.email,
      subject: "ecommerce password recovery",
      message,
    });
    return res
      .status(200)
      .json(
        new apiresponse(200, `email has been sent to ${user.email} sucessfully`)
      );
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetpasswordExpire = undefined;
    await user.save();
    return next(new apierror(500, "mesage not sent succesfully"));
  }
});
const resetpassword = asyncHandler(async (req, res, next) => {
  const resettoken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  console.log(resettoken);
  const user = await User.findOne({
    resetPasswordToken: resettoken,
    resetpasswordExpire: { $gt: Date.now() },
  });
  console.log(user);
  if (!user) {
    return next(
      new apierror(400, "reset password token is in valid or has been expired")
    );
  }
  console.log(req.body.passward, req.body.confirmpassward);
  if (req.body.passward !== req.body.confirmpassward)
    return next(new apierror(400, "password is not valid"));
  console.log(req.body.passward, req.body.confirmpassward);
  user.passward = req.body.passward;
  user.resetPasswordToken = undefined;
  user.resetpasswordExpire = undefined;
  await user.save();
  sendtoken(user, 200, res);
});
const getuserprofile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  res.status(200).json(new apiresponse(200, user, "your profile is here"));
});
const updatepassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+passward");
  const check = user.iscorrect(req.body.oldpassward);
  if (!check) return next(new apierror(400, "old password is not corrrect"));
  if (req.body.newpassward !== req.body.confirmpassward)
    next(
      new apierror(401, "new passward anf=d confirm apssward sholud be same")
    );
  user.passward = req.body.newpassward;
  await user.save();

  sendtoken(user, 200, res);
});
const updateprofile = asyncHandler(async (req, res, next) => {
  const newuser = {
    name: req.body.name,
    email: req.body.email,
  };

  // cloudnery avatr profile
  const user = await User.findByIdAndUpdate(req.user._id, newuser, {
    new: true,
  });
  res
    .status(200)
    .json(
      new apiresponse(200, user, "your profile have beeen updated successfully")
    );
});
//admin routes to get of all details::
const getallusers = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  res
    .status(200)
    .json(
      new apiresponse(200, users, "all the users are fetched succesfully bawa")
    );
});
// admin route to get deatils of spefic user::
const getdetailsofoneuser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    next(
      new apierror(
        401,
        `user does not exixts with the spefic id ${req.params._id}`
      )
    );
  }
  console.log(user);
  res
    .status(200)
    .json(
      new apiresponse(200, user, "specfic users is fetched succesfully bawa")
    );
});
//total no of user::
const updaterole = asyncHandler(async (req, res, next) => {
  // const newuser={
  //     name:req.body.name,
  //     email:req.body.email,
  //     role:req.body.role
  // }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { $set: { role: req.body.role } },
    {
      new: true,
    }
  );
  res
    .status(200)
    .json(
      new apiresponse(200, user, "your profile have beeen updated successfully")
    );
});
const getcart2 = async (req, res, next) => {
  //const loginuser=await User.findById(req.params.id);
  //console.log(req.user);
  const user = await User.aggregate([
    {
      $match: {
        email: req.user.email,
      },
    },
    {
      $unwind: "$cart",
    },
    {
      $lookup: {
        from: "products",
        localField: "cart._id",
        foreignField: "_id",
        as: "cartProducts",
      },
    },
  ]);
  console.log(user);
  return res.json({ user });
};
const addtocart = asyncHandler(async (req, res, next) => {
  const product = req.body;

  if (product) {
    const user = await User.findById(req.user._id);

    const found = user.cart.find((obj) => obj._id == req.body._id);

    if (found) {
      console.log("Found object:", found);
    } else {
      user.cart.push(req.body._id);
      await user.save();
    }
    //

    return res
      .status(200)
      .json(new apiresponse(200, user, "product added  to cart succssfully"));
  }
  return res
    .status(403)
    .json(new apiresponse(200, "product  not added  to cart "));
});
const removecart=asyncHandler(async(req,res,next)=>{
  const user=req.user;
  user.cart=user.cart.filter(item => item._id.toString() !== req.params.id)
  await user.save({validateBeforeSave:false});
  return res.json({data:"removed successfully",statuscode:200});
})
const deleteuser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    next(new apierror(401, "user not found "));
  }
  await User.deleteOne({ _id: req.params.id });
  res
    .status(200)
    .json(new apiresponse(200, user, "user have been deleted  successfully"));
});

export {
  removecart,
  Register,
  Loginuser,
  logout,
  forgitpassword,
  resetpassword,
  getuserprofile,
  updatepassword,
  updateprofile,
  getallusers,
  getdetailsofoneuser,
  updaterole,
  deleteuser,
  addtocart,
  getcart2,
};
