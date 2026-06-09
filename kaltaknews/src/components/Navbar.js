import React, { useState } from "react";
import Categorydropdown from "./Categorydropdown";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Sortdropdown from "./Sortdropdown";
import logo512 from "../images/logo512.png";
import { useAuth } from "../Contexts/AuthContext";
import UserDropdown from "./UserDropdown";
import { UserRound } from 'lucide-react';


const Navbar = ({ darkMode, setDarkMode, sortBy, setSortBy }) => {

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { keyword } = useParams();
  const location = useLocation();
  const [search, setSearch] = useState(keyword || "");
  const [debouncedSearch, setDebouncedSearch] = useState(keyword || "");
  const { user, logout } = useAuth();

  useEffect(() => {
    if (!debouncedSearch.trim())
      return;
    navigate(`/search/${debouncedSearch}`);

  }, [debouncedSearch]);


  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 2000);
    return () => {
      clearTimeout(timer);
    }
  }, [search])


  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  const handleCategorySelect = (category) => {
    setIsOpen(false);
    navigate(`/category/${category.toLowerCase()}`);
  }

  useEffect(() => {
    if (location.pathname.includes("/search/")) {
      setSearch(keyword || "");
    } else {
      setSearch("");
    }
  }, [location.pathname, keyword]);

  return (
    <nav className="bg-white w-full dark:bg-[#0F172A] shadow-md sticky top-0 z-50">
      <div className="max-w-full mx-auto px-4">
        <div className="flex justify-between items-center h-16 ">

          {/* Logo */ }
          <div className="flex justify-between items-center dark:bg-[#0F172A]">
            <a className="flex items-center justify-between hover:shadow-2xl transition-all duration-300 ease-out hover:scale-105" href="/" onClick={ () => navigate("/") }>
              <img src={ logo512 } alt="Logo" className="  ml-1  rounded mt-1 h-10 w-10" />

              <h1 className="text-xl font-bold dark:text-white cursor-pointer hover:shadow-2xl transition-all duration-300 ease-out hover:scale-110 ml-1  " >
                KalTak<span className="text-blue-700 dark:text-white-100 dark:bg-[#0F172A]">News</span>
              </h1>
            </a>
          </div>

          {/* Desktop Menu */ }
          <div className="hidden md:flex space-x-4 items-center">

            <Link to="/" className="text-gray-700 dark:text-gray-100 hover:text-blue-600 transition">
              Home
            </Link>

            <Link to="/category/crime" className="text-gray-700 dark:text-gray-100 hover:text-blue-600 transition" onClick={ () => handleCategorySelect("crime") }>
              Crime
            </Link>

            <Link to="/category/sports" className="text-gray-700 dark:text-gray-100 hover:text-blue-600 transition" onClick={ () => handleCategorySelect("sports") }>
              Sports
            </Link>
            <Link to="/category/business" className="text-gray-700 dark:text-gray-100 hover:text-blue-600 transition" onClick={ () => handleCategorySelect("business") }>
              Business
            </Link>
            <Link to="/category/technology" className="text-gray-700 dark:text-gray-100 hover:text-blue-600 transition" onClick={ () => handleCategorySelect("technology") }>
              Technology
            </Link>

            <div className="flex items-center gap-4 cursor-pointer text-gray-700 dark:text-gray-100 ">
              <Categorydropdown onSelect={ handleCategorySelect } />
            </div>

            <span className=" text-gray-500 dark:text-gray-100 hover:text-blue-600 transition cursor-pointer"> | </span>

            <div className="flex items-center justify-between space-x-1  text-gray-700 dark:text-gray-100">

              <svg xmlns="http://w3.org" className="cursor-none " viewBox="0 0 24 24" width="24" height="21" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 6h12M4 12h8M4 18h8M19 10v10m0 0l-3-3m3 3l3-3" />
              </svg>

              <Sortdropdown sortBy={ sortBy } setSortBy={ setSortBy } />

            </div>



            <Link to="/bookmarks" className="text-gray-700 dark:text-gray-100 hover:text-blue-600 transition">Bookmarks </Link>

            <Link to="/history" className="text-gray-700 dark:text-gray-100 hover:text-blue-600 transition">History </Link>
            <input type="text" placeholder="Search News.." value={ search } onChange={ (e) => { setSearch(e.target.value) } } onKeyDown={ (e) => { if (e.key === "Enter") { navigate(`/search/${search}`) } } } className="px-4 py-2 text-gray-700 bg-white dark:bg-[#0F172A] rounded-lg border border-gray-500 outline-none focus:ring-1 focus:ring-blue-500 hover:scale-105 transition-all duration-300 ease-out hover:border-blue-400 h-9 w-40" />

          </div>



          {/* CTA */ }
          <div className=" flex items-center">
            { !user ? (
              <>
                <Link to="/Login" className="text-gray-700 dark:text-gray-100 bg-gradient-to-t from-blue-400 to-transparent px-2 py-1 rounded-lg hover:bg-gradient-to-b from-blue-400 to-transparent hover: transition-all duration-300 ">
                  Login
                </Link>

                <Link to="/Signup" className="ml-2 text-gray-700 dark:text-gray-100 bg-gradient-to-t from-blue-400 to-transparent px-2 py-1 rounded-lg hover:bg-gradient-to-b from-blue-400 to-transparent hover: transition-all duration-300 ">
                  Signup
                </Link>
              </>
            ) : (

              <div className="flex items-center gap-1 text-black">
                <UserRound />
                <UserDropdown />
              </div>

            ) }
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