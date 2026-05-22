import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Dropdown = ({ label, items, onSelect, width = "w-48", }) => {
    const [open, setOpen] = useState(false);

    const menuRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleOutsideClick
            );
        };
    }, []);

    const toggleDropdown = () => {
        setOpen((prev) => !prev);
    };

    const handleSelect = (item) => {

        if (typeof onSelect === "function") {
            onSelect(item);
        }

        setOpen(false);
    };

    return (
        <div className="relative " ref={ menuRef }>
            <button
                onClick={ toggleDropdown }
                className=" text-gray-700 dark:text-gray-100 hover:text-blue-600 transition cursor-pointer flex justify-between"
            >
                { label }
            </button>

            <AnimatePresence>
                { open && (
                    <motion.div initial={ { opacity: 0, y: -10, scale: 0.95, } } animate={ { opacity: 1, y: 0, scale: 1, } } exit={ { opacity: 0, y: -10, scale: 0.95, } } transition={ { duration: 0.25 } } className={ `   absolute   left-0   top-full   mt-2   ${width}   bg-white   dark:bg-gray-800   rounded-lg   shadow-lg   z-50   max-h-72   overflow-y-auto   border   border-gray-200   dark:border-gray-700 ` }> 
                        <ul className="py-2">
                            { items.map((item) => (
                                <li key={ item }>
                                    <button onClick={ () => handleSelect(item) } className="block w-full text-left px-4 py-2  text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 transition cursor-pointer"
                                    >
                                        { item }
                                    </button>
                                </li>
                            )) }
                        </ul>
                    </motion.div>
                ) }
            </AnimatePresence>
        </div>
    );
};

export default Dropdown;