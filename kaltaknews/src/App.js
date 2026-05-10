import React, {useState} from 'react'
import Navbar from './components/Navbar'
import Newsitems from './components/Newsitems'
import News from './components/News'
 


const  App=()=> {


  const [category, setCategory] = useState("top")


    return (
      <>
       
       <Navbar setCategory={ setCategory } />
           
      <News category={category } />

         
      </>
    )
  
}

export default App