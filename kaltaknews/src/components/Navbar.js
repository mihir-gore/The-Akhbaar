import React, { use, useState } from "react";
import Categorydropdown from "./Categorydropdown";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { set } from "date-fns";



const Navbar = ({ darkMode, setDarkMode }) => {

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const {keyword}=useParams();
  const location = useLocation();
  const[search,setSearch]=useState(keyword || "");
  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };


  const handleCategorySelect = (category) => {
    setIsOpen(false);
    navigate(`/category/${category.toLowerCase()}`);
  }
   
  useEffect(() => {
    if(location.pathname.includes("/search/")){
      setSearch(keyword || "");
    }else{
      setSearch("");
    }
  }, [location.pathname,keyword]);

  return (
    <nav className="bg-white dark:bg-[#0F172A] shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16 ">

          {/* Logo */ }
          <div>
          <h1 className="text-xl font-bold text-blue-600 cursor-pointer hover:shadow-2xl transition-all duration-300 ease-out hover:scale-110  " onClick={ () => navigate("/") }>
            KalTakNews 
          </h1>
          </div>

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
            <input type="text" placeholder="Search News.." value={search} onChange={(e)=> {setSearch(e.target.value)}} onKeyDown={(e)=>{if(e.key==="Enter"){ navigate(`/search/${search}`)}}} className="px-4 py-2 text-gray-700 bg-white dark:bg-[#0F172A] rounded-lg border border-gray-500 outline-none focus:ring-1 focus:ring-blue-500 hover:scale-105 transition-all duration-300 ease-out hover:border-blue-400 h-9 w-40"/>
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