import React from "react";
import { Link } from "react-router-dom"; // If you're using React Router
import { useSelector } from "react-redux";
const Slidebar = ({ isOpen, onClose }) => {
  const data=useSelector(state=>state.currentUser?.data)
  
  const list=["login","register"]
  return (
    <div
      className={`bg-gray-800 bg-opacity-[0.7]  text-white h-screen w-full  fixed top-0 left-0 overflow-y-auto transition-transform transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col gap-[50%] h-full">
        <div className="p-4">
          <button onClick={onClose} className="text-white">
            &#x2715;
          </button>
        </div>
        <ul className="  flex-1 p-4 flex gap-[20px]">
          {
            data ? (<li><Link to="/logout" onClick={onClose}>Logout</Link></li>) : 
            (list.map((ele,i) => <li key={i}><Link to="/login" onClick={onClose}>{ele}</Link></li>))
          }

          
          <li>
            <Link to="/all-products" onClick={onClose}>
              All Products
            </Link>
          </li>
          <li>
            <Link to="/orders" onClick={onClose}>
              Orders
            </Link>
          </li>
          <li>
            <Link to="/order-details" onClick={onClose}>
              Order Details
            </Link>
          </li>
          {
            data?(<li>
              <Link to="/user-profile" onClick={onClose}>
                User Profile
              </Link>
            </li>):""
          }
        </ul>
      </div>
    </div>
  );
};

export default Slidebar;
