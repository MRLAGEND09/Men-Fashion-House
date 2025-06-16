"use client";

import {
  FaPaypal,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcStripe,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 mt-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h2 className="text-xl font-bold mb-4">Company</h2>
          <p className="text-gray-400 mb-4">
            We are dedicated to bringing you the best shopping experience with a wide range of products and quality services.
          </p>
          <p className="text-gray-400">© 2024 YourCompany, All rights reserved.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-bold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li><p className="hover:underline text-gray-400 cursor-pointer">About Us</p></li>
            <li><p className="hover:underline text-gray-400 cursor-pointer">Contact Us</p></li>
            <li><p className="hover:underline text-gray-400 cursor-pointer">Privacy Policy</p></li>
            <li><p className="hover:underline text-gray-400 cursor-pointer">Terms & Conditions</p></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h2 className="text-xl font-bold mb-4">Customer Service</h2>
          <ul className="space-y-2">
            <li><p className="hover:underline text-gray-400 cursor-pointer">Shipping & Returns</p></li>
            <li><p className="hover:underline text-gray-400 cursor-pointer">Track Order</p></li>
            <li><p className="hover:underline text-gray-400 cursor-pointer">FAQs</p></li>
            <li><p className="hover:underline text-gray-400 cursor-pointer">Support Center</p></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h2 className="text-xl font-bold mb-4">Newsletter</h2>
          <p className="text-gray-400 mb-4">Subscribe to our newsletter for the latest updates and offers.</p>
          <form
            className="flex"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Subscribed!");
            }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 rounded-l-md focus:outline-none text-black"
              required
            />
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-md text-white">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Payment Icons */}
      <div className="container mx-auto mt-8">
        <h2 className="text-lg font-bold mb-4 text-center">We Accept Card</h2>
        <div className="flex justify-center items-center space-x-6 py-4">
          <FaPaypal size={50} className="hover:text-blue-500" />
          <FaCcVisa size={50} className="hover:text-blue-500" />
          <FaCcMastercard size={50} className="hover:text-blue-500" />
          <FaCcAmex size={50} className="hover:text-blue-500" />
          <FaCcStripe size={50} className="hover:text-blue-500" />
        </div>
      </div>

      {/* Social Media */}
      <div className="flex justify-center gap-5 mt-6">
        <a href="https://facebook.com/profile.php?id=61554214816293" target="_blank" rel="noopener noreferrer">
          <FaFacebookF className="text-xl text-gray-400 hover:text-blue-600" />
        </a>
        <a href="https://twitter.com/mrlagend09" target="_blank" rel="noopener noreferrer">
          <FaTwitter className="text-xl text-gray-400 hover:text-blue-400" />
        </a>
        <a href="https://instagram.com/saieem297/?hl=en" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="text-xl text-gray-400 hover:text-pink-500" />
        </a>
        <a href="https://linkedin.com/in/irfan-ahmed-416591307" target="_blank" rel="noopener noreferrer">
          <FaLinkedinIn className="text-xl text-gray-400 hover:text-blue-800" />
        </a>
        <a href="https://github.com/MRLAGEND09" target="_blank" rel="noopener noreferrer">
          <FaGithub className="text-xl text-gray-400 hover:text-white" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
