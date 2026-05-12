import React, { useState } from 'react'
import Navbar from './components/Navbar'
// import Newsitems from './components/Newsitems'
import News from './components/News'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
 
const [darkMode, setDarkMode] = useState(false);
   
  return (
    <div className={ darkMode ? "dark" : "" }>
    <BrowserRouter>
      <Navbar  darkMode={ darkMode } setDarkMode={ setDarkMode } />
      <Routes>
        <Route path="/" element={ <News category="top" /> } />
        <Route path="/category/:category" element={ <News  /> } />
        <Route path="/search/:keyword" element={<News />} />
      </Routes>

    </BrowserRouter>
    </div>
  )
 
}

export default App