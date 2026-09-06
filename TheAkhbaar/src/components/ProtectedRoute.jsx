import {Navigate,useLocation} from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';
import SkeletonCard from './SkeletonCard';

const ProtectedRoute=({children})=>{
    const {user,loading}=useAuth();
    const location=useLocation();
    if(loading){
        return (
         <div
            className=" bg-white dark:bg-[#0F172A] grid p-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8  "
          >
            { [...Array(6)].map((_, i) => (
              <SkeletonCard key={ i } />
            )) }
          </div>
        );
    }
    if(!user){
        return <Navigate to="/Login" replace state={{from: location}}/>;
    }
    return children;
}   
export default ProtectedRoute;