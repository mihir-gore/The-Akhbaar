import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
// import Newsitems from './components/Newsitems'
import News from './components/News'
import { useLocation, Routes, Route } from 'react-router-dom'
import{AnimatePresence} from "framer-motion";
import { set } from 'date-fns';
import Bookmarks from './pages/Bookmarks';

const App = () => {
 
const [darkMode, setDarkMode] = useState(false);
const location = useLocation(); 
const [sortBy, setSortBy] = useState("pubdatedesc");

useEffect(() => {
  setSortBy("pubdatedesc");
}, [location.pathname]);  

  return (
    <div className={ darkMode ? "dark" : "" }>
      <Navbar  darkMode={ darkMode } setDarkMode={ setDarkMode }  sortBy={sortBy} setSortBy={setSortBy} />
        <AnimatePresence mode='wait' >
        <Routes location={location} key={location.pathname}>
        <Route path="/" element={ <News category="top" sortBy={sortBy} /> } />
        <Route path="/category/:category" element={ <News sortBy={sortBy}  /> } />
        <Route path="/search/:keyword" element={<News sortBy={sortBy} />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
      </Routes>
      </AnimatePresence>
    </div>
  )
 
}

export default App