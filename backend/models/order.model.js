import mongoose from "mongoose";
import { Schema } from "mongoose";
const orderschema = new Schema({
    shippinginfo: {
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true,
            default: "India"
        },
        pincode: {
            type: Number,
            required: true,
        }
        ,
        phoneno: {
            type: Number,
            required: true,
        },
    },
    orderitem: [
        {
            name: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
                default: 0,
            },
            quantity: {
                type: Number,
                required: true,
                default: 0,

            },
            image: {
                type: String,
                required: true,
            },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            }
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    paymentinfo: {
        id: {
            type: String,
            required: true,

        },
        status: {
            type: String,
            required: true,
        },
    },
    paidAT: {
        type: Date,
        required: true
        // default:Date.now()
    },
    itemprice: {
        type: Number,
        required: true,
        default: 0,
    },
    taxprice: {
        type: Number,
        required: true,
        default: 0,
    },
    shippingprice: {
        type: Number,
        required: true,
        default: 0,
    },
    totalprice: {
        type: Number,
        required: true,
        default: 0,
    },
    orderstatus: {
        type: String,
        required: true,
        default: "processing",
    },
    deliveredat: {
        type: Date,
        default:Date.now()
    }

}, { timestamps: true })
export const Order = mongoose.model("Order", orderschema)