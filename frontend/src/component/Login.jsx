import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { signInFailure,signInSuccess,signInStart} from '../Store/createslice.js'
import {useNavigate} from 'react-router-dom'
import { Link } from 'react-router-dom';

function Login() {
  const dispatch = useDispatch();
 const navigate=useNavigate()
  const [formdata, setformdata] = useState({
    passward: '',
    email: ''
  })
  const [error,seterror]=useState(null)
  const evevthandler = async (e) => {
    e.preventDefault();
    //console.log(formdata);
    
      try {
        const response=await fetch('/api/v1/login',{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify(formdata)
        })
        const data=await response.json();
        
        if(data.success===false)
      {
        //console.log(data.message);
        seterror(data.message)
        dispatch(signInFailure(data.message));
        
      }
       else
       {
        dispatch(signInSuccess(data));
        
        navigate("/")
       }
     
      } catch (error) {

        //console.log(`error occured in ${error.message}`);
        seterror("Error occured in Loginning the message");
        navigate("/login")
      }

    

  }
  
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setformdata({
      ...formdata,
      [name]: value,
    });
  };
  return (
    <div className="min-h-screen flex items-center gap-20 justify-center bg-gray-50 ">
    <div className="flex gap-6">
      <Link
        to="/"
        className="flex items-center space-x-3 rtl:space-x-reverse"
      >
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          className="h-8"
          alt="Ecommerce"
        />
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">
          Ecommerce
        </span>
      </Link>
    </div>
    <div className="max-w-md w-full p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-6">Login</h2>
      <form onSubmit={evevthandler}>
       
         
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formdata.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="passward"
            value={formdata.passward}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 w-full text-white px-4 py-2 rounded-md text-center hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Login
        </button>
        
      </form>
      {
        error?(<button className=" mt-2 text-red-500 bg-[#ffffff96] w-full px-4 py-2 rounded-md text-center border-color-red focus:outline-none focus:ring focus:border-blue-300">{error}</button>):""
      }
    </div>
  </div>
  )
}

export default Login