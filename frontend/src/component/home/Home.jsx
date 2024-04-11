import React from 'react'
import {CgMouse} from 'react-icons/all'
import './HOme.css'
import PhotoSlider from './PhotoSlider'
function Home() {
    const products={
        name:"blue shirt",
        _id:1,
        url:"http://localhost:9000",
        price:"9000"

    }
  return (
    <>
    <div className="banner">
        {/* <p>Welcome to ecommerce</p>
        <h1>find amazing product here</h1>
      <Link>
      <button >
          Scroll <CgMouse/>
        </button>
      </Link> */}
    </div>
    <h2 className="homeHeading">Featured Products</h2>

{/* <div className="container" id="container">
  {products &&
    products.map((product) => (
      <ProductCard key={product._id} product={product} />
    ))}
</div> */}
 <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <PhotoSlider />
    </div>
    </>
  )
}

export default Home
