import React, { useState, useEffect, useRef } from 'react'

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

const Categorydropdown = ({ onSelect }) => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);


useEffect(() => {
    const handleOutsideClick = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
    }
}
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
    };
}, [])



const toggleDropdown = () => {
    setOpen(prev=>!prev);
}
const handleSelect = (cat) => {
    onSelect(cat);
    setOpen(false);
}




return (

    <div className="relative" ref={ menuRef }>
        <button className='text-gray-600 hover:text-blue-600 transition' onClick={ toggleDropdown }>
            Categories
        </button>
        {
            open && (
                <div className='absolute mt-2 w-48 bg-white rounded-lg shadow-lg z-50 w-48 max-h-100 overflow-y-auto  rounded-lg shadow-lg z-50 animate-fadeIn'>
                    <ul className='py-2'>
                        { categories.map((cat) => (
                            <li key={ cat }>
                                <button onClick={ () => handleSelect(cat) } className='block w-full text-left px-4 py-1 text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition'>
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
export default Categorydropdown;