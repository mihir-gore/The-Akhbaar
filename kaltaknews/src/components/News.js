import fallbackimg from "../images/image.png";
import React, { useEffect, useState } from "react";
import Newsitems from "./Newsitems";
import InfiniteScroll from "react-infinite-scroll-component";
import { set } from "date-fns";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SkeletonCard from "./SkeletonCard";
import { APIKEY } from "../config";

const News = ({ category: propCategory }) => {
  const [results, setResults] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { category: routeCategory } = useParams();
  const category = routeCategory || propCategory;


  const fetchInitialNews = async () => {
    try {
      setError(null);
      setLoading(true);
      setResults([]);
      const url = `https://newsdata.io/api/1/latest?apikey=${APIKEY}&country=in&language=en,hi&category=${category}`;
      const res = await fetch(url);
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
  }

  const loadMore = async () => {
    if (loading || !nextPage) return;
    setLoading(true);
    try {
      let url = `https://newsdata.io/api/1/latest?apikey=${APIKEY}&country=in&language=en,hi&category=${category}&page=${nextPage}`;
      let res = await fetch(url);
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
        const uniqueArticles = [
          ...new Map(
            combined.map(article => [
              article.article_id,
              article
            ])
          ).values()
        ];

        return uniqueArticles;
      });

      setNextPage(data.nextPage || null);
    } catch (error) {
      setError(error.message || "An error occurred while fetching news.");
    } finally {
      setLoading(false);
    };
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    document.title = `${category.charAt(0).toUpperCase() + category.toString().toLowerCase().slice(1)} - KalTakNews`;
    fetchInitialNews();
  }, [category]);

  if (error) {
    return (
      <div className="text-center py-20">
        <h2 className="text-red-500 text-2xl font-bold">
          { error }
        </h2>
      </div>
    )
  } return (
    <>
      <div className="bg-white dark:bg-[#0F172A] text-gray-800 dark:text-gray-100">
        <h1 className="text-3xl bg-white dark:bg-[#0F172A] text-gray-800 dark:text-gray-100  py-4 ml-9  flex justify-center align-middle ">
          { category.toString().charAt(0).toUpperCase() +
            category.toString().slice(1) }{ " " }
          News
        </h1>
      </div>

      <div className=" h-[2px] bg-blue-50 w-full "></div>

      { loading ? (
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
          <div className="grid p-6 grid-cols-1 bg-[#F8FAFC] dark:bg-[#0F172A] sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
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
                  pubDate={ element.pubDate }
                  creator={ !element.creator ? "Unknown" : element.creator }
                  source_name={ element.source_name }
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
          </div>
        </InfiniteScroll>
      ) }
    </>
  );
};

export default News;
