import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const ContactUs = () => {
  return (
    <>
    <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Contact Us
        </h1>

        {/* Address */}
        <div className="mb-4">
          <h2 className="text-lg font-medium text-gray-700">📍 Address</h2>
          <p className="text-gray-600">
            SG Disposals Headquarters <br />
            123 Greenway Street <br />
            Panruti, Tamil Nadu, India
          </p>
        </div>

        {/* Phone */}
        <div className="mb-4">
          <h2 className="text-lg font-medium text-gray-700">📞 Phone</h2>
          <p className="text-gray-600">+91 98765 43210</p>
        </div>

        {/* Email */}
        <div className="mb-4">
          <h2 className="text-lg font-medium text-gray-700">✉️ Email</h2>
          <p className="text-gray-600">support@sgdisposals.com</p>
        </div>

        {/* Business Hours */}
        <div className="mb-6">
          <h2 className="text-lg font-medium text-gray-700">🕒 Business Hours</h2>
          <p className="text-gray-600">
            Mon – Fri: 9:00 AM – 6:00 PM IST <br />
            Sat: 10:00 AM – 2:00 PM IST <br />
            Sun: Closed
          </p>
        </div>

        {/* Contact Form */}
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-gray-700">Message</label>
            <textarea
              rows="4"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Write your message..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default ContactUs;