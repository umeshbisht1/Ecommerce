import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <section className="about-us bg-gray-100 py-12 px-10">
      <div className="container mx-auto">
        <div className="text-center mb-8">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse justify-center mb-3">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Ecommerce"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">
            Ecommerce
          </span>
        </Link>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">About Our Ecommerce Website</h2>
          <p className="text-gray-600 mb-3 ">Welcome to our ecommerce website! We strive to provide the best shopping experience for our customers by offering a wide range of products and excellent customer service. Our team works diligently to ensure that your online shopping experience is seamless and enjoyable.</p>
        </div>
        <div className="flex flex-wrap justify-center">
          <div className="w-full md:w-1/3 px-4 mb-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
             
              <img src="\src\images\IMG-20240315-WA0049.jpg" alt="Front End Developer" className="mx-auto mb-4 rounded-full h-24 w-24" />
              <h2 className='text-center'><b>Shivam Joshi</b></h2>
              <h3 className="text-xl font-bold text-gray-800 text-center">Front End Developer</h3>
              <p className="text-gray-600">Our front end developers work tirelessly to create a user-friendly interface that enhances your shopping experience. They are dedicated to crafting responsive and visually appealing designs that make navigating our website a breeze.</p>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-4 mb-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <img src="\src\images\IMG-20240315-WA0050.jpg" alt="UI/UX Designer" className="mx-auto mb-4 rounded-full h-24 w-24" />
              <h2 className='text-center'><b>Siddharth Singh</b></h2>
              <h3 className="text-xl font-bold text-gray-800 text-center">UI/UX Designer</h3>
              <p className="text-gray-600">Our UI/UX designers are passionate about creating intuitive and visually stunning interfaces. They focus on understanding user behaviors and preferences to design interfaces that are both aesthetically pleasing and easy to use.</p>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-4 mb-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <img src="\src\images\IMG_20240101_201022~2.jpg" alt="Backend Developer" className="mx-auto mb-4 rounded-full h-24 w-24" />
              <h2 className='text-center'><b>Umesh Singh</b></h2>
              <h3 className="text-xl font-bold text-gray-800 text-center">Backend Developer</h3>
              <p className="text-gray-600">Behind the scenes, our backend developers work hard to ensure that our website runs smoothly and efficiently. They manage databases, servers, and server-side applications to handle your transactions securely and reliably.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;