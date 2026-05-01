import React, { Component } from 'react'

const categories = [
    "Breaking",

    "Business",

    "Crime",

    "Domestic",

    "Education",

    "Entertainment",

    "Environment",

    "Food",

    "Health",

    "Lifestyle",

    "Politics",

    "Science",

    "Sports",

    "Technology",

    "Top",

    "Tourism",

    "World",

    "Other"
]

export default class Categorydropdown extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
        }
        this.menuRef = React.createRef()
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleOutsideClick);
    }
    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleOutsideClick);
    }
    handleOutsideClick = (e) => {
        if (this.menuRef.current && !this.menuRef.current.contains(e.target)) {
            this.setState({ open: false });
        }
    }
    toggleDropdown = () => {
        this.setState((prevState) => ({ open: !prevState.open }))
    }
    handleSelect = (cat) => {
        this.props.onSelect(cat);
        this.setState({ open: false });
    }

    render() {
        const { open } = this.state;

        return (

            <div className="relative" ref={this.menuRef}>
                <button className='text-gray-600 hover:text-blue-600 transition' onClick={ this.toggleDropdown }>
                    Categories
                </button>
                {
                    open && (
                        <div className='absolute mt-2 w-48 bg-white rounded-lg shadow-lg z-50'>
                            <ul className='py-2'>
                                { categories.map((cat) => (
                                    <li key={ cat }>
                                        <button onClick={ () => this.handleSelect(cat) } className='block w-full text-left px-4 py-1 text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition'>
                                            { cat }
                                        </button>
                                    </li>
                                )) }
                            </ul>
                        </div>
                    )
                }
            </div>

        )
    }
}