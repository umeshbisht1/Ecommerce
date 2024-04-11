// Layout.js
import React, { useState } from 'react';
import Slidebar from './Slidebar';
import ProfileDropdown from '../../Profiledropdown';




const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex fixed top-0 left-0 z-[1000] w-[100%] justify-between">
     <Slidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      <div className="flex text-[#3a2588] justify-around items-center">
        <button onClick={toggleSidebar} className="text-lg">&#9776;</button>
      
      </div>
      <div className="flex gap-3">
      <img className='w-[30px] h-[30px] rounded-md ' src="https://media.istockphoto.com/id/1206806317/vector/shopping-cart-icon-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=1RRQJs5NDhcB67necQn1WCpJX2YMfWZ4rYi1DFKlkNA=" alt="" />
      <ProfileDropdown/>
      </div>
    </div>
  );
};

export default Layout;

