import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
const Shippinginfo = () => {
    const navigate=useNavigate();
  const [shippingInfo, setShippingInfo] = useState({
    address: 'dungra bhonali almora',
    city: 'almora',
    state: 'uttarkhand',
    country: 'india',
    pincode: 263622,
    phoneno: 9528167281,
  });

  const handleInputChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  };
  const add=()=>{
    navigate('/place',{
        pit:{
            address:shippingInfo
        }
    })
  }

  return (
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
     <div className=" w-full text-center my-5"> <button className='px-[10px] py-3 rounded-xl border font-bold text-center' onClick={add}><b>Add Address</b></button></div>
    </div>
  );
};

export default Shippinginfo;