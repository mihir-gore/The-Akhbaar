import React, { use, useEffect, useState } from "react";

const useNews = ({ category, sortBy, keyword }) => {

 const [loading, setLoading] = useState(false);
 const [results, setResults] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [error, setError] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const buildURL=(page=null)=>{
      const params= new URLSearchParams();
      params.set("sort",sortBy || "pubdateasc");
      if(keyword){
        params.set("q",keyword);
      }else{
        params.set("category",category || "top");
      }
      if(page){
        params.set("page",page)
      }

      return `${API_URL}/api/news?${params.toString()}`
  }

  const fetchInitialNews = async () => {
    try {
      setError(null);
      setLoading(true);
      setResults([]);
      const res = await fetch(buildURL());
      if (!res.ok) {
        throw new Error("Failed to fetch news! Network response was not ok.");
      }
      const data = await res.json();
      if (data.status === "error") {
        throw new Error(data.message || "An error occurred while fetching news.");
      }
      setResults(Array.isArray(data.results) ? data.results : []);
      setNextPage(data.nextPage || null);
    } catch (error) {
      setError(error.message || "An error occurred while fetching news.");
    } finally {
      setLoading(false);
    };
  };



const loadMore = async () => {
    if (loading || !nextPage) return;
    try {
      setLoadingMore(true);

      const res = await fetch(buildURL(nextPage));
      if (!res.ok) {
        throw new Error("Failed to load more news");
      }
      let data = await res.json();

      if (data.status === "error") {
        throw new Error(data.message);
      }
      setResults(prevResults => {
        const combined = [
          ...prevResults,
          ...(Array.isArray(data.results)
            ? data.results
            : [])
        ];
      return [
          ...new Map(
            combined.map(article => [
              article.article_id,
              article
            ])
          ).values()
        ];

        
      });

      setNextPage(data.nextPage || null);
    } catch (error) {
      setError(error.message || "An error occurred while fetching news.");
    } finally {
      setLoadingMore(false);
    };
  };

   useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    document.title = keyword ? `${keyword} News - The Akhbaar` : `${category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()} - The Akhbaar`;
    fetchInitialNews();
  }, [category, keyword, sortBy]);

  return {
    results,
    error,
    nextPage,
    loading,
    loadingMore,
    loadMore
  };  
};  

  export default useNews;