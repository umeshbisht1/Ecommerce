// ProfileDropdown.js

import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux'
import { logoutSuccess,logoutFailure,logoutStart } from "../Store/createslice";
const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const data = useSelector((state) => state.currentUser?.data);
  const dispatch=useDispatch();
  const navigate=useNavigate()
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const logoutuser=async()=>{
    dispatch(logoutStart())
    try {
      const data = await axios.post("/api/v1/logout");
      dispatch(logoutSuccess(data))
      navigate("/");
     
    } catch (error) {
      dispatch(logoutFailure(error.mesage))
      console.log("error|| u are not logined in");
    }
  }

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center focus:outline-none"
      >
        <img
          src="https://cdn.pixabay.com/photo/2015/01/06/16/14/woman-590490_640.jpg"
          alt=""
          className="w-8 h-8 rounded-full mr-2"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-2">
          {/* Dropdown items */}
          <button className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left">
            <Link to="/user-profile" className="block w-full">
              Profile
            </Link>
          </button>

          <button className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left">
            <Link to="" className="block w-full">
              Setting
            </Link>
          </button>
         
          {
            data.role==="admin"?(<div>
               <button className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left">
            <Link to="/order" className="block w-full">
              Admin_Order
            </Link>
          </button>
             <button className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left">
            <Link to="/create_product" className="block w-full">
              Admin_Create_Product
            </Link>
          </button>
          <button className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left">
            <Link to="/Update_Delete" className="block w-full">
            Admin_Update/Delete_Product
            </Link>
          </button>
          {/* <button className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left">
            <Link to="/delete_product" className="block w-full">
            Admin_Delete Product
            </Link>
          </button> */}
          <button className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left">
            <Link to="/allorder" className="block w-full">
            Admin_Checkout_order
            </Link>
          </button>
              </div>
              ):(
                <button className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left">
                <Link to="/userorder" className="block w-full">
                  Order
                </Link>
              </button>
              )
          }
          
          <hr className="my-2" />
          <button className="block px-4 py-2 text-red-600 hover:bg-gray-200 w-full text-left" onClick={logoutuser}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
