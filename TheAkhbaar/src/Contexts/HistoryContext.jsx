import { useEffect, useState, createContext } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const HistoryContext = createContext();

const HistoryProvider = ({ children }) => {
     
    const [history, setHistory] = useState([]);
    const { user, loading } = useAuth();

    useEffect(() => {
        if (loading) return;
        if (!user) return;
        const fetchHistory = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/history/${user.uid}`)
                setHistory(response.data);
            
            }
            catch (error) {
                console.log(error);
            }

        }

        fetchHistory();

    }, [user,loading]);

      const addtoHistory=async(article)=>{
        try{
        
            if(!user) return;
             const historyData={
                            firebase_uid:user.uid,
                            article_id:article.article_id,
                            title:article.title,
                            image_url:article.imgurl,
                            article_url:article.link,
                            source_name:article.source_name,
                            category:article.category?.[1] || article.category?.[0]

                        
                }
          const response= await axios.post(`${API_URL}/api/history`,historyData )
                 setHistory(prev=>[response.data,...prev])

        }
        catch(error){
            console.error(error)
        }
    } 

    const clearHistory = async () => {
        try {
        
            if (!user) return;
            await axios.delete(`${API_URL}/api/history/clear/${user.uid}`)
            setHistory([]);
            toast.success("Reading History Cleared!")
        }
        catch (error) {
            console.log(error)
        toast.error("Failed to Clear History.")
        }
    }
    return (
        <HistoryContext.Provider value={ { history, addtoHistory,setHistory, clearHistory } }>
            { children }
        </HistoryContext.Provider>
    )
}

export default HistoryProvider;
