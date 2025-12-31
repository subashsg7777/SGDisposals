import React from "react";
import logo from "../../public/icon.png";
import { FaCcMastercard, FaCcVisa, FaFacebook, FaInstagram, FaLinkedin, FaPaypal } from "react-icons/fa";
import { FaCcAmex, FaCcDiscover, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-gray-700 pt-12 pb-6 px-6 md:px-16">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 ">
        {/* Logo + Store Locations */}
        <div>
        <span className="flex items-center text-center gap-5">
            <img src={logo} alt='SG_Disposals Icon' className='h-20'/>
          <h2 className="text-2xl font-bold text-black mb-4">SG Disposals</h2>
          </span>
          <h3 className="font-semibold mb-2">Our Store Locations</h3>
          <p className="text-sm mb-1">5/94 Dwaraka Nagar, Manali New Town,</p>
          <p className="text-sm">Andarkupam Checkpost, Chennai-103</p>
        </div>

        {/* Top Categories */}
        <div>
          <h3 className="font-semibold mb-2">Top Services</h3>
          <ul className="space-y-1 text-sm">
            <li>Garbage Collection</li>
            <li>Organic Products</li>
            <li>Get Green Coins</li>
            <li>Reduce, Reuse, Recycle</li>
            <li>Renewable Energy Sources</li>
          </ul>
        </div>

        {/* Important Links */}
        <div>
          <h3 className="font-semibold mb-2">Important Links</h3>
          <ul className="space-y-1 text-sm">
            <li>About Us</li>
            <li>Contact Us</li>
            <li>FAQ</li>
            <li>Latest Posts</li>
            <li>Order Track</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-semibold mb-2">Newsletter</h3>
          <p className="text-sm mb-3">
            Enter your email to receive our latest updates about our products.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-3 py-2 border border-gray-300 rounded-l-md text-sm"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-r-md text-sm">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
        <p>© 2026 SG Disposals . All Rights Reserved.</p>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          {/* Payment Icons */}
          <span className="flex gap-2 items-center"><FaPaypal />PayPal</span>
          <span className="flex gap-2 items-center"><FaCcVisa />VISA</span>
          <span className="flex gap-2 items-center"><FaCcMastercard />MasterCard</span>
          <span className="flex gap-2 items-center"><FaCcAmex />American Express</span>
          <span className="flex gap-2 items-center"><FaCcDiscover />DISCOVER</span>
        </div>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          {/* Social Icons */}
          <span className="flex gap-2 items-center"><FaFacebook />Facebook</span>
          <span className="flex gap-2 items-center"><FaXTwitter />Twitter</span>
          <span className="flex gap-2 items-center"><FaInstagram />Instagram</span>
          <span className="flex gap-2 items-center"><FaLinkedin />LinkedIn</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;