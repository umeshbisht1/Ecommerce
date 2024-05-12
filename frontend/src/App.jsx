import { useState } from "react";
import Layout from "./component/layout/header/Layout.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Footer from "./component/layout/footer/Footer.jsx";
import Home from "./component/home/Home.jsx";
import Navbar from "./component/layout/header/Navbar.jsx";
import Login from "./component/Login.jsx";
import Logout from "./component/Logout.jsx";
import Register from "./component/Register.jsx";
import AllProducts from "./component/AllProducts.jsx";
import Orders from "./component/Orders.jsx";
import OrderDetails from "./component/UserDetails.jsx";
import UserProfile from "./component/UserDetails.jsx";
import Search from "./component/layout/header/Search.jsx";
import AboutUs from "./component/layout/header/About.jsx";
import Detailsproduct from "./component/layout/header/Detailsproduct.jsx";
import Ordernow from "./component/layout/header/Ordernow.jsx";
import Create_product from "./component/Create_product.jsx";
import Update_Delete from "./component/Update_Delete.jsx";
import Updateproduct from "./component/Updateproduct.jsx";
import ContactPage from "./component/Contactpage.jsx";
import Placeorder from "./component/Placeorder.jsx";
import Shippinginfo from "./component/Shippinginfo.jsx";
import Userorder from "./component/Userorder.jsx";
import Cart from "./component/Cart.jsx";
import Dashboard from "./component/layout/Dashboard.jsx";
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="" element={<Home />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/all-products" element={<AllProducts />} />
          <Route path="/order" element={<Orders />} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/search" element={<Search />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/ordernow/:id" element={<Ordernow />} />
          <Route path="/product" element={<Detailsproduct />} />
          <Route path="/order-details" element={<OrderDetails />} />
          <Route path="/userorder" element={<Userorder/>} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/create_product" element={<Create_product />} />
          <Route path="/update_Delete" element={<Update_Delete />} />
          <Route path="/update_Delete/update" element={<Updateproduct />} />
          <Route path="/contact" element={<ContactPage />}></Route>
          <Route path="/place" element={<Placeorder/>}></Route>
          <Route path="/shipinfo" element={<Shippinginfo/>}></Route>
          <Route path="/dashboard" element={<Dashboard/>}></Route>
        </Routes>
        <Footer></Footer>
      </Router>
    </>
  );
}

export default App;
