import React, { Component } from 'react'


export class Newsitems extends Component {
    
    
    render() {
        let { title, description, imgurl, link } = this.props;
        return (
           
                <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col ">
                    <img className='w-full h-48 object-cover' src={imgurl } alt="Card Image" />
                    <div className='p-5 flex flex-col flex-grow'>
                        <h2 className='text-xl font-semibold text-gray-800 mb-2'>{ title }</h2>
                        < p className="text-gray-600 text-sm mb-4 line-clamp-3">
                            { description }
                        </p>
                      <a className=" mt-auto" href={link} target="_blank" rel="noopener noreferrer">
                        <button className='mt-auto bg-blue-400 text-black  px-4 py-2 hover:bg-blue-500 transition rounded-md' > Read More</button>
                      </a>
                    </div>
                </div>

                 


        )
    }
}

export default Newsitems