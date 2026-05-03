import React, { Component } from 'react'
import Navbar from './components/Navbar'
import Newsitems from './components/Newsitems'
import News from './components/News'
 


export class App extends Component {

  constructor(props){
    super(props);
      this.state={
        category:"top"
      }
    }
  
  setCategory=(category)=>{
    this.setState({ category });
  }
  render() {
    return (
      <>
       
       <Navbar setCategory={ this.setCategory } />
           
    <News category={ this.state.category } />

         
      </>
    )
  }
}

export default App