import React, { useState, useEffect } from "react";
import ProfileDropdown from "../../Profiledropdown";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import addtocart from "../../../../images/shopping-cart.svg";
function Navbar() {
  const data = useSelector((state) => state.userReducer?.currentUser?.data)
  const count=useSelector((state) => state.cartreducer.cart)
  //console.log(data);
  
  // useEffect(() => {
  //   setcount(data?.cart.length||0);
  // }, [data]);
  const [product, setproduct] = useState();
  const [Sdata, setSerach] = useState("");
  const navigate = useNavigate();

  const search = async (event) => {
    event.preventDefault();
    if (Sdata) {
      navigate(`/search?keyword=${Sdata}`);
      // const res=await fetch(`/api/v1/products?keyword=${Sdata}`);

      // const data=await res.json();
      // console.log(data);
    } else setSerach("");
  };

  return (
    <nav className=" bg-[#336DF6] dark:border-gray-700 ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* left part */}
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Ecommerce
          </span>
        </Link>
        <div className=" rounded-lg border-black border-2 py-2 px-4">
          <form action="" className="flex gap-6" onSubmit={search}>
            <input
              value={Sdata}
              type="text"
              placeholder="Search"
              className="rounded-md px-2"
              onChange={(e) => setSerach(e.target.value)}
            />
            <button onClick={search}>
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                  d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                />
              </svg>
            </button>
          </form>
        </div>
        {/* < right part> */}
        <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown ">
          <ul className="  bg-[#336DF6] text-black flex flex-col font-medium   md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:border-gray-700">
            <li className=" bg-[#336DF6]">
              <Link to="/">Home</Link>
            </li>

            <li className=" bg-[#336DF6]">
              <Link to="/about">About</Link>
            </li>
            <li className=" bg-[#336DF6]">
              <Link to="/all-products">Products</Link>
            </li>
            <li className=" bg-[#336DF6]">
              <Link to="/contact">Contact</Link>
            </li>

            {data ? (
              <>
                <div className=" flex gap-3 justify-center items-center">
                  <li>
                    <ProfileDropdown></ProfileDropdown>
                  </li>
                  <Link className="relative" to="/cart">
                    <img src={addtocart} alt="" />
                    <p className="absolute text-[#dadada] top-[-10px] right-[-15px] px-[6px] border-[#dadada] rounded-xl bg-[#ea4545]">
                      {count > 0 ? count : ""}
                    </p>
                  </Link>
                </div>
              </>
            ) : (
              <ul className="flex gap-6">
                <li className=" bg-[#336DF6]">
                  <Link to="/login">Login</Link>
                </li>
                <li className=" bg-[#336DF6]">
                  <Link to="/register">Register</Link>
                </li>
              </ul>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
