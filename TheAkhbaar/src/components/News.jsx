import fallbackimg from "../images/image.png";
import React, { use, useEffect, useState } from "react";
import Newsitems from "./Newsitems";
import InfiniteScroll from "react-infinite-scroll-component";
import { set } from "date-fns";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SkeletonCard from "./SkeletonCard";
import { motion, stagger } from "framer-motion";
import Sortdropdown from "./Sortdropdown";
import useNews from "../Hooks/useNews";
import axios from "axios";
import AISummary from "./AISummary";
import useRecommendations from "../Hooks/useRecommendations";
import { toast } from "sonner";
import AIChat from "./AIChat";
import HeroStory from "./HeroStory";


const News = ({ category: propCategory, sortBy }) => {

  const { category: routeCategory, keyword } = useParams();
  const category = routeCategory || propCategory || "top";
  const { results, error, nextPage, loading, loadingMore, loadMore } = useNews({ category, sortBy, keyword });

  const [summary, setSummary] = useState(null);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const { loadingRecommendations, recommendArticles } = useRecommendations(category === "top");


  const generateSummary = async (article) => {

    try {
      setLoadingSummary(true);
      setShowSummary(true);
      const response = await axios.post("http://localhost:5000/api/ai/summarize", {
         article_id: article.article_id,title: article.title, description: article.description

      })
      setSummary(response.data.summary)
      toast.success("AI Summary Generated!")
    } catch (error) {
      console.log(error)
      setSummary("Unable to Generate Summary")
    } finally {
      setLoadingSummary(false);

    }
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <h2 className="text-red-500 text-2xl font-bold">
          { error }
        </h2>
      </div>
    )
  } return (
    <motion.div className="min-h-screen bg-white dark:bg-[#0F172A]" initial={ { opacity: 0, y: 20 } } animate={ { opacity: 1, y: 0 } }
      exit={ { opacity: 0, y: -20 } } transition={ { duration: 0.35 } }>

      <div className="bg-white dark:bg-[#0F172A] text-gray-800 dark:text-gray-100">
        { !loading && results.length > 0 && (
          <div className="px-6 pt-2">
            <HeroStory articles={ results.slice(0, 5) } />
          </div>
        ) }
      </div>

      { recommendArticles.length > 0 && (
        <div className="mt-3  bg-white dark:bg-[#0F172A] text-gray-800 dark:text-gray-100 p-6 ">

          <div className=" h-px mb-6 flex bg-gradient-to-r from-slate-200 via-slate-100 to-transparent" />

          <div className="mb-8 px-6">
            
            <p className="uppercase tracking-[0.3em] ml-1 text-base text-blue-600 font-semibold">
              PERSONALIZED
            </p>

            <h2 className="font-plus-jakarta text-2xl mt-1 font-semibold text-slate-900 dark:text-white">
              Recommended for You
            </h2>

            <p className="text-slate-500 mb-1 ">
              Personalized stories selected from your interests,reading history, and trending topics.
            </p>

          </div>


          <div className=" bg-white ml-5 dark:bg-[#0F172A] text-gray-800 dark:text-gray-100 scrollbar-none flex overflow-x-auto snap-x snap-mandatory pb-4 gap-8 mt-14">

            { recommendArticles.map(article => (

              <div
                key={ article.article_id }
                className="w-[300px] md:w-[335px] flex-shrink-0 snap-start"
              >
                <Newsitems
                  { ...article }
                  onGenerateSummary={ generateSummary }
                />
              </div>

            )) }

          </div>

        </div>
      ) }

      <div className="px-6 mt-6 mb-6  bg-white dark:bg-[#0F172A] text-gray-800 dark:text-gray-100">

        <div className="mt-6 h-px mb-6 bg-gradient-to-r from-slate-200 via-slate-100 to-transparent" />


        <p className="uppercase tracking-[0.3em] ml-6 text-base text-blue-600 font-semibold">

          TODAY'S

        </p>

        <h2 className="font-plus-jakarta text-2xl mt-2 ml-6 font-semibold text-slate-900 dark:text-white">

          Latest Coverage

        </h2>

      </div>

      <AIChat articles={ results } />

      {
        loading ? (
          <div
            className=" bg-white dark:bg-[#0F172A] grid p-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8  "
          >
            { [...Array(6)].map((_, i) => (
              <SkeletonCard key={ i } />
            )) }
          </div>

        ) : (

          <InfiniteScroll
            dataLength={ results.length }
            next={ loadMore }
            hasMore={ !!nextPage }
            loader={
              <div
                className=" bg-white dark:bg-[#0F172A] grid p-6 grid-cols-1 sm:grid-cols-2   lg:grid-cols-3  gap-8 "
              >
                { [...Array(6)].map((_, i) => (
                  <SkeletonCard key={ i } />
                )) }
              </div>
            }
          >

            <motion.div initial="hidden" animate="visible" variants={ { hidden: {}, visible: { transition: { staggerChildren: 0.20 } } } } className="grid  p-6 grid-cols-1 bg-[#F8FAFC] dark:bg-[#0F172A] sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">

              { results.slice(6).map((element) => {
                return (

                  <Newsitems
                    key={ element.article_id }
                    title={ element.title }
                    description={
                      !element.description
                        ? "To learn more about this news, click the button below."
                        : element.description
                    }
                    imgurl={
                      element.image_url && element.image_url.trim() !== ""
                        ? element.image_url
                        : fallbackimg
                    }
                    link={ element.link }
                    pubDate={ element.pubDate || element.created_at }
                    creator={ !element.creator ? "Unknown" : element.creator }
                    source_name={ element.source_name }
                    article_id={ element.article_id }
                    onGenerateSummary={ generateSummary }
                    category={ element.category }
                  />

                );

              }) }
              { !loading && results.length === 0 && (
                <div className="text-center py-20">
                  <h2 className="col-span-full text-gray-700 dark:text-gray-100 text-2xl font-bold">
                    No News Found.
                  </h2>
                </div>
              ) }
            </motion.div>
            <AISummary isOpen={ showSummary } summary={ summary } loading={ loadingSummary } onClose={ () => setShowSummary(false) } />

          </InfiniteScroll>
        )
      }

    </motion.div >
  );
};

export default News;
