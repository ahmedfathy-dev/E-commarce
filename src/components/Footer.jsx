import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-500 text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Logo & Description */}
        <div>
          <h1 className="text-2xl font-bold mb-4">MyShop</h1>
          <p className="text-gray-400 text-sm leading-6">
            Modern ecommerce store built with love. We deliver the best products
            with high quality and fast shipping.
          </p>
        </div>

        {/* Links */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-gray-400">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Shop</li>
            <li className="hover:text-white cursor-pointer">Lookbook</li>
            <li className="hover:text-white cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Support</h2>
          <ul className="space-y-2 text-gray-400">
            <li className="hover:text-white cursor-pointer">FAQ</li>
            <li className="hover:text-white cursor-pointer">Shipping</li>
            <li className="hover:text-white cursor-pointer">Returns</li>
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
          <div className="flex space-x-4 text-xl">
            <FaFacebookF className="hover:text-blue-500 cursor-pointer" />
            <FaInstagram className="hover:text-pink-600 cursor-pointer" />
            <FaTwitter className="hover:text-sky-400 cursor-pointer" />
            <FaLinkedinIn className="hover:text-blue-400 cursor-pointer" />
          </div>

          <p className="text-gray-500 text-sm mt-4">
            Stay connected for updates & offers.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-300 text-center py-4 text-gray-500 text-sm">
        © {new Date().getFullYear()} MyShop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;