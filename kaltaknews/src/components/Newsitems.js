import React,{useState} from 'react'
import {formatDistanceToNowStrict} from 'date-fns'
    

const Newsitems = (props) => {  
    

    const time=formatDistanceToNowStrict(new Date(props.pubDate),{addSuffix:true})


        let { title, description, imgurl, link, pubDate, creator, source_name } = props;
        return (
            <div className=" group max-w-sm mx-auto  relative rounded-xl shadow-md bg-white dark:bg-[#1E293B] overflow-hidden hover:shadow-2xl transition-all duration-300 ease-out hover:-translate-y-2 hover:border-[#4F7C82] h-full flex flex-col ">
                <div className='relative overflow-hidden'>
                    <img className='w-full h-48 object-cover transition-all duration-500 ease-out group-hover:scale-110 group-hover:brightness-90' src={ imgurl } alt="Card Image" />
                    
                </div>
                <div className=' flex justify-between items-center transition-all duration-300 '>
                        <span className='bg-gradient-to-t from-blue-500/70 to-transparent  text-black/80 text-xs px-2 py-1 transition '>{ source_name }</span>
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
            </div>




        )
    
}

export default Newsitems