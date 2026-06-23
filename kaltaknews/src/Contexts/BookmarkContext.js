import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

export const BookmarkContext = createContext();

const BookmarkProvider = ({ children }) => {
    const{user,loading}=useAuth();
    const [bookmarks, setBookmarks] = useState([]);

     useEffect(()=>{
         if(loading) return ;
            if(!user) return;
        
            const fetchBookmarks= async()=>{
            try{
                const response= await axios.get(`http://localhost:5000/api/bookmarks/${user.uid}`)
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
                            source_name:article.source_name
                }
                const response=await axios.post("http://localhost:5000/api/bookmarks",bookmarkData)
           
                 setBookmarks(prev=>[response.data,...prev])
            
                }catch (error) {
                  console.error(error);
                 }
        }
    

    const removeBookmark =async (bookmarkId) => {
              try{

                await axios.delete(`http://localhost:5000/api/bookmarks/${bookmarkId}`)
                 
        setBookmarks(prev => prev.filter(bookmark => bookmark.id !== bookmarkId));
                
            }catch(error){
                console.error(error)    
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