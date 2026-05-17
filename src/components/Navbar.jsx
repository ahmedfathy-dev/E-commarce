import React, { useState } from "react";
import { Link } from "react-router-dom";

import { SiIlovepdf } from "react-icons/si";
import { IoLockClosedOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";

import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

export default function Navbar({ filterByCategory }) {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 w-full z-50 py-4 px-6 md:px-10 flex items-center justify-between shadow-sm bg-white/30 backdrop-blur-md">

      {/* Logo */}
      <div className="flex items-center gap-3">

        <Link to="/" className="font-bold text-4xl text-gray-300">
          MANS
        </Link>

      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-10 text-gray-500 text-xl items-center">

        <Link to="/" className="hover:text-amber-900 px-2 py-1 rounded">
          Home
        </Link>

        <Link to="/shop" className="hover:text-amber-900">
          Shop
        </Link>

        <Link to="/collection" className="hover:text-amber-900">
          Clothing
        </Link>

        <Link to="/Book" className="hover:text-amber-900">
          Lookbook
        </Link>

        <Link to="/Footer" className="hover:text-amber-900">
          Footwear
        </Link>

        <Link to="/sale" className="hover:text-amber-700">
          Sale
        </Link>

        {/* Dropdown */}
        <select
          onChange={(e) => filterByCategory(e.target.value)}
          className="bg-transparent outline-none hover:text-amber-900 cursor-pointer"
        >
          <option value="all">Category</option>

          <option value="1">wenter</option>

          <option value="2">summer</option>

        </select>

      </div>

      {/* Desktop Icons + Auth */}
      <div className="hidden md:flex items-center gap-6">

        <button className="text-gray-600 hover:text-amber-900 transition text-lg">
          Login
        </button>

        <button className="bg-black text-white px-5 py-2 rounded-full hover:bg-amber-900 transition">
          Logout
        </button>

        <div className="flex gap-6 text-2xl">
          <SiIlovepdf />
          <CiSearch />
        </div>

      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden text-3xl text-gray-600 cursor-pointer">

        {menuOpen ? (

          <IoClose onClick={() => setMenuOpen(false)} />

        ) : (

          <HiMenuAlt3 onClick={() => setMenuOpen(true)} />

        )}

      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute top-[90px] left-0 w-full bg-white/95 backdrop-blur-lg shadow-lg transition-all duration-300 overflow-hidden md:hidden ${
          menuOpen ? "max-h-[700px] py-6" : "max-h-0"
        }`}
      >

        <div className="flex flex-col items-center gap-6 text-gray-700 text-lg">

          <Link
            to="/"
            onClick={() => {
              filterByCategory("all");
              setMenuOpen(false);
            }}
          >
            Home
          </Link>

          <Link
            to="/shop"
            onClick={() => {
              filterByCategory("all");
              setMenuOpen(false);
            }}
          >
            Shop
          </Link>

          <Link
            to="/collection"
            onClick={() => {
              setMenuOpen(false);
            }}
          >
            Clothing
          </Link>

          <Link
            to="/Book"
            onClick={() => setMenuOpen(false)}
          >
            Lookbook
          </Link>

          <Link
            to="/Footer"
            onClick={() => {
              setMenuOpen(false);
            }}
          >
            Footwear
          </Link>

          <Link
            to="/sale"
            onClick={() => {
              setMenuOpen(false);
            }}
          >
            Sale
          </Link>

          {/* Mobile Category */}
          <select
            onChange={(e) => {
              filterByCategory(e.target.value);
              setMenuOpen(false);
            }}
            className="bg-transparent outline-none border border-gray-300 px-4 py-2 rounded-lg"
          >
            <option value="all">Category</option>

            <option value="1">wenter</option>

            <option value="2">summer</option>

          </select>

          {/* Mobile Auth Buttons */}
          <div className="flex flex-col gap-4 w-full px-6">

            <button className="w-full border border-gray-300 py-2 rounded-full hover:bg-gray-100 transition">
              Login
            </button>

            <button className="w-full bg-black text-white py-2 rounded-full hover:bg-amber-900 transition">
              Logout
            </button>

          </div>

          {/* Mobile Icons */}
          <div className="flex gap-6 text-2xl pt-2">
            <SiIlovepdf />
            <CiSearch />
          </div>

        </div>

      </div>

    </div>
  );
}