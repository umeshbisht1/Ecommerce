import React, { useState } from "react";
import Shippinginfo from "./Shippinginfo";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { button } from "@material-tailwind/react";

const Placeorder = () => {
  const [itemQuantity, setItemQuantity] = useState(1);

  const user = useSelector((state) => state.currentUser?.data);
  const [address, setaddress] = useState("");
  const location = useLocation();
  const { product } = location.state;
  const [shippingInfo, setShippingInfo] = useState({
    address: "dungra bhonali almora",
    city: "almora",
    state: "uttarkhand",
    country: "india",
    pincode: 263622,
    phoneno: 9528167281,
  });

  const handleInputChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  };
  const add = () => {
    setaddress(shippingInfo);
  };
  const [orderDetails, setorder] = useState({
    itemPrice: product.price,
    taxPrice: 90,
    shippingPrice: 40,
    total: parseInt(product.price) + 90 + 40,
  });
  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    setorder({
      itemPrice: newQuantity * product.price,
      taxPrice: 90,
      shippingPrice: 40,
      total: parseInt(newQuantity * product.price) + 90 + 40,
    });
    setItemQuantity(newQuantity);
  };

  return (
    <>
      <div className=" flex justify-around items-center w-full my-6 mx-3">
        <h1>Deliver to:</h1>
        <button className="rounded border px-9 py-3">
          {" "}
          <Link to="/shipinfo">
            <b>add Address</b>
          </Link>
        </button>
      </div>
      {address ? (
        // filled address
        <div className="bg-gray-100 p-6 rounded-md shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="font-medium mr-2">Address:</span>
              <p>{address.address}</p>
            </div>
            <div className="flex items-center">
              <span className="font-medium mr-2">City:</span>
              <p>{address.city}</p>
            </div>
            <div className="flex items-center">
              <span className="font-medium mr-2">State:</span>
              <p>{address.state}</p>
            </div>
            <div className="flex items-center">
              <span className="font-medium mr-2">Country:</span>
              <p>{address.country}</p>
            </div>
            <div className="flex items-center">
              <span className="font-medium mr-2">Pincode:</span>
              <p>{address.pincode}</p>
            </div>
            <div className="flex items-center">
              <span className="font-medium mr-2">Phone Number:</span>
              <p>{address.phoneno}</p>
            </div>
          </div>
        </div>
      ) : (
        // shipping info
        <div className="bg-gray-100 p-8 rounded-md shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="address" className="block font-medium mb-1">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={shippingInfo.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="city" className="block font-medium mb-1">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={shippingInfo.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="state" className="block font-medium mb-1">
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={shippingInfo.state}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="country" className="block font-medium mb-1">
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={shippingInfo.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="pincode" className="block font-medium mb-1">
                  Pincode
                </label>
                <input
                  type="number"
                  id="pincode"
                  name="pincode"
                  value={shippingInfo.pincode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="phoneno" className="block font-medium mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneno"
                  name="phoneno"
                  value={shippingInfo.phoneno}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </form>
          <div className=" w-full text-center my-5">
            {" "}
            <button
              className="px-[10px] py-3 rounded-xl border font-bold text-center"
              onClick={add}
            >
              <b>Add Address</b>
            </button>
          </div>
        </div>
      )}
      {/* product details */}
      <h1 className="font-bold mx-6 my-3"><b>Product Details</b></h1>
      <div className="bg-white px-6  rounded-md shadow-lg flex items-center ">
       
        <div className="flex-1">
          <div className=""><h3 className="text-lg font-medium mb-1">name: {product.name}</h3>
          <p className="text-gray-500 mb-2"> Producrt id:{product._id}</p></div>
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold"> Price: {product.price}</p>
            <div className="flex items-center space-x-2">
              <label
                htmlFor={`quantity-${itemQuantity}`}
                className="text-gray-500 font-medium"
              >
                Qty:
              </label>
              <input
                type="number"
                id={`quantity-${itemQuantity}`}
                min="1"
                value={itemQuantity}
                onChange={handleQuantityChange}
                className="w-16 px-2 py-1 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-md shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <p>Item Price</p>
            <p>{orderDetails.itemPrice}</p>
          </div>
          <div className="flex justify-between">
            <p>Tax</p>
            <p>{orderDetails.taxPrice}</p>
          </div>
          <div className="flex justify-between">
            <p>Shipping</p>
            <p>{orderDetails.shippingPrice}</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between font-bold text-lg">
            <p>Total</p>
            <p>💵{orderDetails.total}</p>
          </div>
        </div>
      </div>
      <div className="text-end my-6 mr-4"><button className='py-4 px-8 rounded-lg border bg-yellow-200 font-bold'>Place Now</button></div>
    </>
  );
};
export default Placeorder;
