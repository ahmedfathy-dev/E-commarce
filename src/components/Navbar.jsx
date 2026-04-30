import React from "react";
import { Link } from "react-router-dom";
import { SiIlovepdf} from "react-icons/si";
import { IoLockClosedOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 w-full z-50 py-4 px-6 md:px-10 flex items-center justify-between shadow-sm ">
      
      {/* Logo */}
      <div  className="flex items-center gap-3">
      
        <Link to="/" className="font-bold text-4xl text-gray-100">
girls
        </Link>
      </div>



{/* Links */}
<div className="hidden md:flex gap-10 text-gray-500 text-xl ">
  <Link to="/contact" className="hover:text-amber-900 px-2 py-1 rounded ">
Home
  </Link>
  <Link to="/about" className="hover:text-amber-900">
   Shop
  </Link>

  <Link to="/services" className="hover:text-amber-900">
    Colthing
  </Link>
  <Link to="/services" className="hover:text-amber-900">
    Lookbook
  </Link>

  <Link
    to="/projects"
    className="  hover:text-amber-900"
  >
    Footwear
  </Link>
  <Link
    to="/"
    className="  hover:text-amber-700"
  >
   Sale
  </Link>
</div>
<div className=" gap-8 flex text-2xl">  <SiIlovepdf />
<IoLockClosedOutline />
<CiSearch />
</div>
  </div>
  );
}