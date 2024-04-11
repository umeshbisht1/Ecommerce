import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function UserDetails() {
  const user = useSelector((state) => state.currentUser?.data);
  const navigate=useNavigate();
  const updateAccount=async()=>{
    
  }
  const deleteAccount=async()=>{
    
  }
  return user ? (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto my-7">
    <div className="flex items-center justify-center mb-4">
      <img
        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKLGqscuA4NKYUWNwJn4yOXFvAKVsl7Au9Og&s'
        alt={user.name}
        className="rounded-full w-24 h-24 object-cover"
      />
    </div>
    <h2 className="text-2xl font-bold text-center mb-2">{user.name}</h2>
    <p className="text-gray-600 text-center mb-4">{user.email}</p>
    <div className="bg-gray-100 rounded-full px-4 py-2 text-gray-700 inline-block font-bold">
      <b>{user.role}</b>
    </div>
    <div className="mt-6">
      <h3 className="text-lg font-bold mb-2">User Details</h3>
      <ul className="space-y-2">
        <li>
          <span className="font-bold">ID:</span> {user._id}
        </li>
        <li>
          <span className="font-bold">Avatar Public ID:</span>{' '}
          {user.avatar.public_id}
        </li>
      </ul>
    </div>
    <div className="mt-6 flex justify-between">
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        Edit
      </button>
      <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
        Delete Account
      </button>
    </div>
  </div>
  ):navigate("/login")
  ;
}
export default UserDetails;
