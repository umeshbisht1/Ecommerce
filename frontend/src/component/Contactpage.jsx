import React, { useState } from 'react';
import axios from 'axios';

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // try {
    //   await axios.post('/api/contact', { name, email, message });
    //   setSuccess(true);
    //   setName('');
    //   setEmail('');
    //   setMessage('');
    // } catch (error) {
    //   console.error('Error submitting contact form:', error);
    //}
  };

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
      {success ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-8">
          Thank you for your message! We'll get back to you soon.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="mb-6">
            <label htmlFor="name" className="block font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded px-4 py-3 w-full"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded px-4 py-3 w-full"
              required
            />
          </div>
          <div className="mb-8">
            <label htmlFor="message" className="block font-bold mb-2">
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border rounded px-4 py-3 w-full"
              rows="5"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded"
          >
            Submit
          </button>
        </form>
      )}
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold mb-2">
          Developed by
          <span className="text-blue-500 ml-2">Umesh Singh Bisht</span>
        </h2>
        <p className="text-gray-600">
          Using the
          <span className="text-blue-500 font-bold ml-2">MERN</span>
          stack (MongoDB, Express.js, React, and Node.js)
        </p>
      </div>
    </div>
  );
};

export default ContactPage;