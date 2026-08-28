import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../Contexts/AuthContext";

const useRecommendations =(enabled)=>{
const {user,loading}=useAuth();
const [recommendArticles, setRecommendArticles]=useState([]);
const [loadingRecommendations,setLoadingRecommendations]=useState(false);

const fetchRecommendations=async()=>{
        try{
            if(!enabled) return;
            if(loading) return;
            if(!user) return;
            setLoadingRecommendations(true);
            const recommendation= await axios.get(`http://localhost:5000/api/recommendations/${user.uid}`)
            const category=recommendation.data.category;
              const  response= await axios.get(
                `http://localhost:5000/api/news?$
                {
                    params: {
                        apikey: APIKEY,
                        country: "in",
                        language: "en,hi",
                        size: 6,
                        category
                    }
                }`
            );
           setRecommendArticles(response.data.results || [])
        }catch(error){
            console.error(error)
        }finally{
            setLoadingRecommendations(false);
        }
}

useEffect(()=>{
fetchRecommendations();
},[user,loading])

return {
    recommendArticles,loadingRecommendations
}

}



export default useRecommendations;