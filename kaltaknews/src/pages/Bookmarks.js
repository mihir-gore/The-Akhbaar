import useBookmarks from "../Hooks/useBookmarks";
import Newsitems from "../components/Newsitems";
import EmptyState from "../components/EmptyState";
import {BookmarkX} from "lucide-react";


const Bookmarks = () => {
     const {bookmarks}= useBookmarks();
    if(bookmarks.length === 0){
        return(
            <div className="mt-9">
            <EmptyState title="No Bookmarks Yet"
            description="You haven't bookmarked any articles yet. Start exploring and save your favorite news for later!"
            buttonText="Explore News"
            buttonLink="/"
            icon={<BookmarkX size={42}/>}
            />
            </div>
        )
    }
     return(
        <>
           <h1 className="text-3xl bg-white dark:bg-[#0F172A] text-gray-800 dark:text-gray-100  py-4 ml-9  flex justify-center align-middle ">
            Bookmarked Articles </h1>
           <div className="grid p-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              
                {bookmarks.map(article=>(
                    <Newsitems key={article.article_id} 
                    {...article}/>
                ))}
            </div>
            </>


     )
}
export default Bookmarks;