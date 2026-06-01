import { useEffect,useState,createContext } from "react";


export const HistoryContext =createContext();

const HistoryProvider=({children})=>{
    const [history,setHistory]=useState(()=>{
      const savedHistory =  localStorage.getItem("kaltak-history");
          return savedHistory?JSON.parse(savedHistory) : [];   
    });

useEffect(()=>{
    localStorage.setItem("kaltak-history",JSON.stringify(history));
},[history]);

const addToHistory=(article)=>{
    setHistory(prev=>{
        const filteredHistory=prev.filter(item=>item.article_id!==article.article_id);
    return [article,...filteredHistory];
           
    })
}

const clearHistory=()=>{
    setHistory([]);
}

    return (
        <HistoryContext.Provider value={{history,addToHistory,clearHistory}}>
            {children}
        </HistoryContext.Provider>
)
}

export default HistoryProvider;
