import { useState } from "react";
import Categorydropdown from "./Categorydropdown";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Sortdropdown from "./Sortdropdown";
import logo192 from "../images/logo192.png";
import { useAuth } from "../Contexts/AuthContext";
import UserDropdown from "./UserDropdown";


const Navbar = ({ darkMode, setDarkMode, sortBy, setSortBy }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { keyword } = useParams();
  const location = useLocation();
  const [search, setSearch] = useState(keyword || "");
  const [debouncedSearch, setDebouncedSearch] = useState(keyword || "");
  const { user } = useAuth();

  const displayName = user?.displayName || user?.email?.split("@")[0] || "User";

  const initials = displayName
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  useEffect(() => {
    if (!debouncedSearch.trim()) return;
    navigate(`/search/${debouncedSearch}`);
  }, [debouncedSearch, navigate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleCategorySelect = (category) => {
    setIsOpen(false);
    navigate(`/category/${category.toLowerCase()}`);
  };

  useEffect(() => {
    if (location.pathname.includes("/search/")) {
      setSearch(keyword || "");
    } else {
      setSearch("");
    }
  }, [location.pathname, keyword]);

  return (
    <nav className="w-full max-w-full overflow-x-clip sticky top-0 z-[100] backdrop-blur-xl bg-white/80 dark:bg-[#0F172A]/90 border-b border-gray-200/70 dark:border-slate-700 ">
      <div className="w-full mx-auto px-3 sm:px-4 lg:px-6">
        <div className="min-h-[54px] w-full max-w-full overflow-visible  mx-auto h-[62px] px-1  sm:px-4 lg:px-6 flex items-center justify-between ">
          <button
            className="md:hidden lg:hidden text-gray-700 dark:text-gray-100 px-1 text-2xl"
            onClick={toggleMenu}
          >
            ☰
          </button>

          {/* Logo */}
          <div className="flex-shrink-0 min-w-0 justify-between items-center cursor-default select-none">
            <a
              className="group relative flex items-center justify-between gap-1.5 sm:gap-2.5 md:gap-3 rounded-xl px-1.5 sm:px-2.5 py-1 sm:py-1.5 transition-all duration-300 ease-out active:scale-95"
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
            >
              <div className="absolute inset-0 rounded-xl bg-blue-500/0 transition-all duration-500 group-hover:bg-blue-600/[0.04] dark:group-hover:bg-blue-400/[0.06] group-hover:shadow-[0_0_25px_rgba(37,99,235,0.12)] pointer-events-none" />

              <div className="relative flex items-center justify-center overflow-hidden rounded-lg p-0.5">
                <img
                  src={logo192}
                  alt="Logo"
                  className="h-8 w-8 sm:h-10 sm:w-10 lg:h-11 lg:w-11 object-contain transition-transform duration-500 ease-out group-hover:scale-105"
                />

                <span className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 -translate-y-6 group-hover:opacity-100 group-hover:translate-y-6 transition-all duration-700 ease-in-out pointer-events-none" />
              </div>

              <div className="relative flex flex-col justify-center">
                <h1 className="font-[Manrope] text-xl sm:text-2xl md:text-3xl font-extrabold tracking-[-0.03em] text-slate-900 dark:text-blue-700 whitespace-nowrap cursor-pointer transition-all duration-300">
                  <span className="inline-block transition-transform duration-300 group-hover:-translate-y-[1px]">
                    The
                  </span>
                  <span className="text-blue-700 dark:text-white ml-0.5 sm:ml-1 inline-block transition-all duration-300 group-hover:tracking-normal group-hover:text-blue-600 dark:group-hover:text-blue-300">
                    Akhbaar
                  </span>
                </h1>

                <span className="absolute -bottom-0.5 sm:-bottom-1 left-0 h-[1.5px] sm:h-[2px] w-0 bg-blue-600 dark:bg-blue-400 transition-all duration-500 ease-out group-hover:w-full rounded-full" />
              </div>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-4 items-center cursor-default select-none">
            <Link
              to="/"
              className="text-[15px] font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 transition-all duration-200"
            >
              Home
            </Link>

            <Link
              to="/category/crime"
              className="text-[15px] font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 transition-all duration-200"
              onClick={() => handleCategorySelect("crime")}
            >
              Crime
            </Link>

            <Link
              to="/category/sports"
              className="text-[15px] font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 transition-all duration-200"
              onClick={() => handleCategorySelect("sports")}
            >
              Sports
            </Link>
            <Link
              to="/category/business"
              className="text-[15px] font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 transition-all duration-200"
              onClick={() => handleCategorySelect("business")}
            >
              Business
            </Link>
            <Link
              to="/category/technology"
              className="text-[15px] font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 transition-all duration-200"
              onClick={() => handleCategorySelect("technology")}
            >
              Technology
            </Link>

            <div className="flex items-center gap-4 cursor-pointer text-gray-700 dark:text-gray-100 text-[15px] font-medium ">
              <Categorydropdown onSelect={handleCategorySelect} />
            </div>

            <span className=" text-[15px] font-medium text-slate-700 dark:text-slate-200 transition-all duration-200 cursor-none">
              {" "}
              |{" "}
            </span>

            <div className="flex items-center justify-between space-x-1 text-[15px] font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600">
              <svg
                xmlns="http://w3.org"
                className="cursor-none "
                viewBox="0 0 24 24"
                width="24"
                height="21"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 6h12M4 12h8M4 18h8M19 10v10m0 0l-3-3m3 3l3-3" />
              </svg>

              <Sortdropdown sortBy={sortBy} setSortBy={setSortBy} />
            </div>

            <Link
              to="/bookmarks"
              className="text-[15px] font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 transition-all duration-200"
            >
              Bookmarks{" "}
            </Link>

            <Link
              to="/history"
              className="text-[15px] font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 transition-all duration-200"
            >
              History{" "}
            </Link>
            <input
              type="text"
              placeholder="Search News.."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  navigate(`/search/${search}`);
                }
              }}
              className="px-4 py-2 text-gray-700 dark:text-white bg-white dark:bg-[#0F172A] rounded-lg border border-gray-700 outline-none focus:ring-1 focus:ring-blue-500 hover:scale-105 transition-all duration-300 ease-out hover:border-blue-400 h-9 w-40"
            />
          </div>

          {/* CTA */}
          <div className=" flex items-center flex-shrink-0 min-w-0">
            {!user ? (
              <>
                <Link
                  to="/Login"
                  className="sm:text-[15px] text-[14px] ml-2 text-gray-700 dark:text-gray-100 bg-gradient-to-t px-2 py-1 rounded-lg hover:bg-gradient-to-b from-blue-400 to-transparent hover: transition-all duration-300 "
                >
                  Login
                </Link>

                <Link
                  to="/Signup"
                  className="ml-2 sm:ml-2 sm:text-[15px] text-[14px] text-gray-700 dark:text-gray-100 bg-gradient-to-t  px-2 py-1 rounded-lg hover:bg-gradient-to-b from-blue-400 to-transparent hover: transition-all duration-300 "
                >
                  Signup
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-2 text-black">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 border border-white shadow-sm flex items-center justify-center">
                  <span className="text-sm font-semibold text-white">
                    {initials}
                  </span>
                </div>
                <UserDropdown />
              </div>
            )}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className=" ml-2 mr-0 sm:m-4 px-2 sm:px-4 py-1 sm:py-2 rounded-lg sm:ml-4 bg-gray-800  dark:bg-gray-700 dark:text-white transition-all"
            >
              {" "}
              {darkMode ? "☀️" : "🌙"}
            </button>
          </div>

          {/* Mobile Button */}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden px-4 pb-4 transition-all duration-300 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="border-t border-slate-200 dark:border-slate-700 pt-3">
          <input
            type="text"
            placeholder="Search News.."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && search.trim()) {
                navigate(`/search/${search}`);
                setIsOpen(false);
              }
            }}
            className="w-full mb-3 px-4 py-2 text-sm text-gray-700 bg-white dark:bg-[#0F172A] dark:text-gray-100 rounded-lg border border-gray-300 dark:border-gray-600 outline-none focus:ring-1 focus:ring-blue-500"
          />

          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block py-1 text-gray-700 dark:text-gray-100 hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            to="/bookmarks"
            onClick={() => setIsOpen(false)}
            className="block py-1 text-gray-700 dark:text-gray-100 hover:text-blue-600"
          >
            Bookmarks
          </Link>

          <Link
            to="/history"
            onClick={() => setIsOpen(false)}
            className="block py-1 text-gray-700 dark:text-gray-100 hover:text-blue-600"
          >
            History
          </Link>

          <Link
            to="/about"
            onClick={() => setIsOpen(false)}
            className="block py-1 text-gray-700 dark:text-gray-100 hover:text-blue-600"
          >
            About
          </Link>

          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="block py-1 text-gray-700 dark:text-gray-100 hover:text-blue-600"
          >
            Contact
          </Link>

          <span className="flex items-center gap-1 cursor-pointer text-gray-700 hover:text-blue-600 dark:text-gray-100 text-[15px] font-medium transition-all duration-200  ">
            <Categorydropdown onSelect={handleCategorySelect} />
            Categories
          </span>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
