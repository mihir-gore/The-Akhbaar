import {Navigate,useLocation} from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';

const ProtectedRoute=({children})=>{
    const {user,loading}=useAuth();
    const location=useLocation();
    if(loading){
        return <div>Loading...</div>;
    }
    if(!user){
        return <Navigate to="/Login" replace state={{from: location}}/>;
    }
    return children;
}   
export default ProtectedRoute;