import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    passward: "",
  });
  const [error,seterror]=useState(null)
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/v1/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const user = await res.json();
    if (user.success === false) 
        {
          console.log(user.message);
          seterror(user.message)
        }
    else
   { 
    // console.log(user);
    navigate('/login')
  
  }
setFormData(  {
  name: "",
  email: "",
  passward: "",
})
    // console.log("Registration data:", formData);
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
        <h2 className="text-2xl font-semibold mb-6">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
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
              value={formData.email}
              onChange={handleChange}
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
              value={formData.passward}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 w-full text-white px-4 py-2 rounded-md text-center hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Register
          </button>
          
        </form>
        {
          error?(<button className=" mt-2 text-red-500 bg-[#ffffff96] w-full px-4 py-2 rounded-md text-center border-color-red focus:outline-none focus:ring focus:border-blue-300">{error}</button>):""
        }
      </div>
    </div>
  );
};
export default Register;
