import useBookmarks from "../Hooks/useBookmarks";
import Newsitems from "../components/Newsitems";

const Bookmarks = () => {
     const {bookmarks}= useBookmarks();

     return(
           <div className="grid p-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {bookmarks.map(article=>(
                <Newsitems key={article.article_id} 
                {...article}/>
            ))}
           </div>

     )
}
export default Bookmarks;