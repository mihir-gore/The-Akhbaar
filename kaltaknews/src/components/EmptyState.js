import {Link} from "react-router-dom";
const EmptyState=({title,description,buttonLink,buttonText,icon})=>{

     return(
       <div className="flex flex-col items-center justify-center h-full text-center px-6">
           
           <div className=" w-28 h-28 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
           {icon}
           </div>

           <h2 className=" text-3xl font-bold text-gray-800dark:text-white">
            {title}
           </h2>

           <p className="text-gray-600 dark:text-gray-400 mt-4 mb-6">
            {description}
              </p>

              <Link to={buttonLink} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">{ buttonText}</Link>   

        </div>

     )
}
export default EmptyState;