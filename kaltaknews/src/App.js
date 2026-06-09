import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
// import Newsitems from './components/Newsitems'
import News from './components/News'
import { useLocation, Routes, Route } from 'react-router-dom'
import{AnimatePresence} from "framer-motion";
import Bookmarks from './pages/Bookmarks';
import History from './pages/History';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
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
        <Route path="/bookmarks" element={<ProtectedRoute><Bookmarks /></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      </AnimatePresence>
    </div>
  )
 
}

export default App