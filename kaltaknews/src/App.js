import React, { Component } from 'react'
import Navbar from './components/Navbar'
import Newsitems from './components/Newsitems'
import News from './components/News'

export class App extends Component {
  render() {
    return (
      <>
      <Navbar/>
      <News/>
      </>
    )
  }
}

export default App