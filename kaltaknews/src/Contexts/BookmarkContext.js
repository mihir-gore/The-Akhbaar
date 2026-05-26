import { createContext, useContext, useEffect, useState } from "react";

export const BookmarkContext = createContext();

const BookmarkProvider = ({ children }) => {

    const [bookmarks, setBookmarks] =
        useState(() => {

            const savedBookmarks = localStorage.getItem("kaltak-bookmarks");

            return savedBookmarks ? (JSON.parse(savedBookmarks)) : [];

        });

    useEffect(() => {
        localStorage.setItem("kaltak-bookmarks", JSON.stringify(bookmarks));
    }, [bookmarks]);

    const addBookmark = (article) => {
        setBookmarks(prev => {
            const alreadyExists = prev.some(item => item.article_id === article.article_id);
            if (alreadyExists) {
                return prev;
            }
            return [...prev, article]
        });
    }

    const removeBookmark = (articleId) => {
        setBookmarks(prev => prev.filter(article => article.article_id !== articleId));
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