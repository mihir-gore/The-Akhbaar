import { useEffect, useState, createContext } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

export const HistoryContext = createContext();

const HistoryProvider = ({ children }) => {
     
    const [history, setHistory] = useState([]);
    const { user, loading } = useAuth();

    useEffect(() => {
        if (loading) return;
        if (!user) return;
        const fetchHistory = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/history/${user.uid}`)
                setHistory(response.data);
                console.log(response.data)
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
          const response= await axios.post("http://localhost:5000/api/history",
            historyData
            )
                 setHistory(prev=>[response.data,...prev])

        }
        catch(error){
            console.error(error)
        }
    } 

    const clearHistory = async () => {
        try {
        
            if (!user) return;
            await axios.delete(`http://localhost:5000/api/history/clear/${user.uid}`)
            setHistory([]);
        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <HistoryContext.Provider value={ { history, addtoHistory,setHistory, clearHistory } }>
            { children }
        </HistoryContext.Provider>
    )
}

export default HistoryProvider;
