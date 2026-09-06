import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const BookmarkContext = createContext();

const BookmarkProvider = ({ children }) => {
    const{user,loading}=useAuth();
    const [bookmarks, setBookmarks] = useState([]);

     useEffect(()=>{
         if(loading) return ;
            if(!user) return;
        
            const fetchBookmarks= async()=>{
            try{
                const response= await axios.get(`${API_URL}/api/bookmarks/${user.uid}`)
                setBookmarks(response.data)           
            }catch(error){
                console.error(error);
            }
        }
        fetchBookmarks();
     },[user,loading]);

    
      const addBookmark=async(article)=>{
    
            try{
                if(!user){
                    return;
                }
                const bookmarkData={
                            firebase_uid:user.uid,
                            article_id:article.article_id,
                            title:article.title,
                            image_url:article.imgurl,
                            article_url:article.link,
                            source_name:article.source_name,
                            category:article.category?.[1] || article.category?.[0]
                }
                const response=await axios.post(`${API_URL}/api/bookmarks`,bookmarkData)
           
                 setBookmarks(prev=>[response.data,...prev])
                   toast.success("Added to Bookmarks!")
                }catch (error) {
                  console.error(error);
                  toast.error("Failed to Add Bookmark.")
                 }
        }
    

    const removeBookmark =async (bookmarkId) => {
              try{

                await axios.delete(`${API_URL}/api/bookmarks/${bookmarkId}`)
                 
        setBookmarks(prev => prev.filter(bookmark => bookmark.id !== bookmarkId));
             toast.success("Removed from Bookmarks!")   
            }catch(error){
                console.error(error) 
                toast.error("Failed to Remove Bookmark.")   
            }
    }   

    const isBookmarked = (articleId) => {
        return bookmarks.some(article => article.article_id === articleId);
    }
    return (
        <BookmarkContext.Provider value={ { bookmarks, addBookmark, removeBookmark, isBookmarked } }>
            { children }
        </BookmarkContext.Provider>

    )
}

export default BookmarkProvider;