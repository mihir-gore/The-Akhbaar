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
        title: article.title, description: article.description

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
    <motion.div className="min-h-screen" initial={ { opacity: 0, y: 20 } } animate={ { opacity: 1, y: 0 } }
      exit={ { opacity: 0, y: -20 } } transition={ { duration: 0.35 } }>

      <div className="bg-white dark:bg-[#0F172A] text-gray-800 dark:text-gray-100">
        <h1 className="text-3xl bg-white dark:bg-[#0F172A] text-gray-800 dark:text-gray-100  py-4 ml-9  flex justify-center align-middle ">
          { keyword ? `Search Results for "${keyword}"` : `${category.charAt(0).toUpperCase() + category.slice(1)} News` }
        </h1>
      </div>

      <div className=" h-[2px] bg-blue-50 w-full "></div>

      { recommendArticles.length > 0 && (
        <>
          <h2 className="flex justify-center items-center text-2xl  m-4 mb-6 text-gray-800 dark:text-white">
            ⭐ Recommended For You
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">

            { recommendArticles.map(article => (

              <Newsitems
                key={ article.article_id }
                { ...article }
                onGenerateSummary={ generateSummary }
              />

            )) }

          </div>
          <h1 className="text-3xl bg-white dark:bg-[#0F172A] text-gray-800 dark:text-gray-100  py-4 ml-9  flex justify-center align-middle ">
              Latest News
            </h1>

            <div className=" h-[2px] bg-blue-50 w-full "></div>
            <AIChat articles={results} />
        </>
      ) }

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

            <motion.div initial="hidden" animate="visible" variants={ { hidden: {}, visible: { transition: { staggerChildren: 0.20 } } } } className="grid p-6 grid-cols-1 bg-[#F8FAFC] dark:bg-[#0F172A] sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">

              { results.map((element) => {
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
