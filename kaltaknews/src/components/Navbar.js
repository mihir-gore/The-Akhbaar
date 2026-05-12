import React, { use, useState } from "react";
import Categorydropdown from "./Categorydropdown";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";


const Navbar = ({ darkMode, setDarkMode }) => {

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };


  const handleCategorySelect = (category) => {
    setIsOpen(false);
    navigate(`/category/${category.toLowerCase()}`);
  }

  return (
    <nav className="bg-white dark:bg-[#0F172A] shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16 ">

          {/* Logo */ }
          <h1 className="text-xl font-bold text-blue-600 cursor-pointer hover:shadow-2xl transition-all duration-300 ease-out hover:scale-110  " onClick={ () => navigate("/category/top") }>
            KalTakNews
          </h1>

          {/* Desktop Menu */ }
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="text-gray-700 dark:text-gray-100 hover:text-blue-600 transition">
              Home
            </Link>

            <div className="flex items-center gap-4 cursor-pointer text-gray-700 dark:text-gray-100 ">
              <Categorydropdown onSelect={ handleCategorySelect } />
            </div>


            <Link to="/about" className="text-gray-700 dark:text-gray-100 hover:text-blue-600 transition">
              About
            </Link>
            <Link to="/services " className="text-gray-700 dark:text-gray-100 hover:text-blue-600 transition">
              Services
            </Link>
            <Link to="/contact" className="text-gray-700 dark:text-gray-100 hover:text-blue-600 transition">
              Contact
            </Link>

          </div>

          {/* CTA */ }
          <div className="hidden md:block">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              Get Started
            </button>
            <button onClick={ () => setDarkMode(!darkMode) } className=" m-4 px-4 py-2 rounded-lg  bg-gray-800  dark:bg-gray-700 dark:text-white transition-all"> { darkMode ? "☀️" : "🌙" }
          </button>
          </div>
    
          


          {/* Mobile Button */ }
          <button
            className="md:hidden text-gray-700 text-2xl"
            onClick={ toggleMenu }
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */ }
      <div
        className={ `md:hidden px-4 pb-4 transition-all duration-300 ${isOpen ? "block" : "hidden"
          }` }
      >
        <Link to="/" className="block py-2 text-gray-700 hover:text-blue-600">
          Home
        </Link>
        <Categorydropdown onSelect={ handleCategorySelect } />
        <Link to="/about" className="block py-2 text-gray-700 dark:text-gray-100 hover:text-blue-600">
          About
        </Link>
        <Link to="/services" className="block py-2 text-gray-700 dark:text-gray-100 hover:text-blue-600">
          Services
        </Link>
        <Link to="/contact" className="block py-2 text-gray-700 dark:text-gray-100 hover:text-blue-600">
          Contact
        </Link>
      </div>
    </nav>
  );

}
export default Navbar;