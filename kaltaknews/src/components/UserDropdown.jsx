import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';
import Dropdown from './Dropdown';
const useritems = [
    "Profile",
    "Bookmarks",
    "History",
    "Logout"
]



const UserDropdown = ({ onSelect }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleselectUser = (item) => {
    
    switch(item){
        case "Profile": 
        navigate("/profile");
        break;
        case "Bookmarks": 
        navigate("/bookmarks");     
        break;
        case "History": 
        navigate("/history");
        break;
        case "Logout": 
        logout();
        break;
        default:
            break;
    }

}
    return (
        <Dropdown
            label={ user.email.split("@")[0] }
            items={ useritems }
            onSelect={ handleselectUser }
            width="w-32"
        />
    )
}
export default UserDropdown;