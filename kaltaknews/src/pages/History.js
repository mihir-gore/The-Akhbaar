import useHistory from "../Hooks/useHistory";
import Newsitems from "../components/Newsitems";
import EmptyState from "../components/EmptyState";
import {FileClock } from "lucide-react";

const History = () => {

  const {history,clearHistory} = useHistory();
   
  if(history.length === 0){
        return(
            <div className="mt-9">
            <EmptyState title="No History Yet"
            description="You haven't viewed any articles yet. Start exploring and your viewing history will appear here!"
            buttonText="Explore News"
            buttonLink="/"
            icon={<FileClock  size={42}/>}
            />
            </div>
        )
    }
  return (
     <>
    <h1 className="text-3xl bg-white dark:bg-[#0F172A] text-gray-800 dark:text-gray-100  py-4 ml-9  flex justify-center align-middle ">
          History </h1>

    <div className="p-6">

        

      <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">

        { history.map(article => (

          <Newsitems

            key={ article.article_id }

            { ...article }

          />

        )) }

      </div>

       <button onClick={ clearHistory } className=" ml-9 mt-9  px-4   py-2   bg-red-500   text-white   rounded-lg hover:bg-red-600 transition-colors duration-300 ">
          Clear History

        </button>

    </div>
    </>
  );
  
};

export default History;