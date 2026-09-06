import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../Contexts/AuthContext";
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const useRecommendations =(enabled)=>{
const {user,loading}=useAuth();
const [recommendArticles, setRecommendArticles]=useState([]);
const [loadingRecommendations,setLoadingRecommendations]=useState(false);
useEffect(()=>{
const fetchRecommendations=async()=>{
        try{
            if(!enabled) return;
            if(loading) return;
            if(!user) return;
            setLoadingRecommendations(true);
            const recommendation= await axios.get(`${API_URL}/api/recommendations/${user.uid}`)
            const category=recommendation.data.category;
            const response = await axios.get(`${API_URL}/api/news`, {
                params: {
                    category,
                    size: 6,
                },
            });
           setRecommendArticles(response.data.results || [])
        }catch(error){
            console.error(error)
        }finally{
            setLoadingRecommendations(false);
        }
}
fetchRecommendations();
},[enabled, loading, user])

return {
    recommendArticles,loadingRecommendations
}

}



export default useRecommendations;