import { useContext } from "react";
import { BookmarkContext } from "../Contexts/BookmarkContext";

const useBookmarks = () => {
     return useContext(BookmarkContext);
}

export default useBookmarks;