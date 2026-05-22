import React, { useState } from 'react'
import { formatDistanceToNowStrict } from 'date-fns'
import fallbackimg from "../images/image.png";
import { motion } from "framer-motion";

const Newsitems = (props) => {

    const time = formatDistanceToNowStrict(new Date(props.pubDate), { addSuffix: true })
    let { title, description, imgurl, link, pubDate, creator, source_name } = props;

    const shareArticle = async () => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: title,
                    text: `${title} - Read more on KalTakNews`,
                    url: link
                })
            } else {
                await navigator.clipboard.writeText(link);
                alert("Link Copied To Clipboard");
            }
        } catch (error) {
            console.log("Sharing Failed", error)
        }
    }

      const cardVariants = {
      hidden: { opacity: 0, y: 40 },
      visible: { opacity: 1, y: 0 },
      transition: { duration: 0.5 }
    };

    return (    
        <motion.div variants={cardVariants} whileHover={{ scale: 1.03, y: -5 }} whileTap={{ scale: 0.90 }}transition={{type: "spring", stiffness: 300, damping: 20,  mass: 0.5},{ duration: 0.6, ease: "easeOut" } } initial={ { opacity: 0, y: 40 } } animate={ { opacity: 1, y: 0 } }  whileHover={{y:-10,scale: 1.02}} className=" group max-w-sm mx-auto  relative rounded-xl shadow-md bg-white dark:bg-[#1E293B] overflow-hidden hover:shadow-2xl transition-all duration-300 ease-out hover:-translate-y-2 hover:border-[#4F7C82] h-full flex flex-col ">
            <div className='relative overflow-hidden'>
                <motion.img whileHover={{scale: 1.05}} transition={ {duration: 0.5} } className='w-full h-48 object-cover transition-all duration-500 ease-out group-hover:scale-110 group-hover:brightness-90' loading="lazy" src={ imgurl } onError={ (e) => { e.target.src = fallbackimg; } } alt="Card Image" />

            </div>
            <div className=' flex justify-between items-center transition-all duration-300 '>
                <span className='bg-gradient-to-t from-blue-500/70 to-transparent  text-black/80 text-xs px-2 py-1 transition '>{ source_name }</span>
                <svg class="w-6 h-5 mr-1 text-gray-400 dark:text-white hover:scale-125 hover:text-blue-400 transition" onClick={ shareArticle } aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.248 19C3.22 15.77 5.275 8.232 12.466 8.232V6.079a1.025 1.025 0 0 1 1.644-.862l5.479 4.307a1.108 1.108 0 0 1 0 1.723l-5.48 4.307a1.026 1.026 0 0 1-1.643-.861v-2.154C5.275 13.616 4.248 19 4.248 19Z" />
                </svg>


            </div>
            <div className='p-5 flex flex-col flex-grow'>
                <h2 className='text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2 line-clamp-2'>{ title }</h2>
                < p className="text-gray-600 dark:text-gray-100  text-sm mb-4 line-clamp-3">
                    { description }
                </p>
                <div className='flex justify-between mt-auto bg'>

                    <p className='text-gray-700 dark:text-gray-100 text-xs '>~{ creator } <br /> { time }</p>
                    <a className=" mt-auto " href={ link } target="_blank" rel="noopener noreferrer">
                        <button className='mt-auto bg-gradient-to-t from-blue-300 to-transparent text-black test-xs px-2 py-1 hover:bg-blue-200 transition rounded-md inset-0 bg-blue-400/70 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100' > Read More</button>
                    </a>
                </div>
            </div>
        </motion.div>




    )

}

export default Newsitems