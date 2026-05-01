import React, { Component } from "react";
import Categorydropdown from "./Categorydropdown";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    
    };
  }
    

  toggleMenu = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  };
  

  handleCategorySelect=(category)=>{
      this.setState({isOpen:false})
      this.props.setCategory(category);
  }
  render() {
    const { isOpen } = this.state;

    return (
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">

            {/* Logo */ }
            <h1 className="text-xl font-bold text-blue-600">
              KalTakNews
            </h1>

            {/* Desktop Menu */ }
            <div className="hidden md:flex space-x-8 items-center">
              <a href="#" className="text-gray-700 hover:text-blue-600 transition">
                Home
              </a>

              <div className="flex items-center gap-4">
                <Categorydropdown onSelect={ this.handleCategorySelect } />
              </div>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition">
                About
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition">
                Services
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition">
                Contact
              </a>
            </div>

            {/* CTA */ }
            <div className="hidden md:block">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                Get Started
              </button>
            </div>

            {/* Mobile Button */ }
            <button
              className="md:hidden text-gray-700 text-2xl"
              onClick={ this.toggleMenu }
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
          <a href="#" className="block py-2 text-gray-700 hover:text-blue-600">
            Home
          </a>
           <Categorydropdown onSelect={this.handleCategorySelect} />
          <a href="#" className="block py-2 text-gray-700 hover:text-blue-600">
            About
          </a>
          <a href="#" className="block py-2 text-gray-700 hover:text-blue-600">
            Services
          </a>
          <a href="#" className="block py-2 text-gray-700 hover:text-blue-600">
            Contact
          </a>
        </div>
      </nav>
    );
  }
}