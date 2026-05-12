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

const News = ({ category: propCategory}) => {
  const [results, setResults] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { category: routeCategory } = useParams();
  const category = routeCategory || propCategory;
  const fetchInitialNews = async () => {
    setLoading(true);
    setResults([]);
    const url = `https://newsdata.io/api/1/latest?apikey=${APIKEY}&country=in&language=en,hi&category=${category}`;
    const res = await fetch(url);
    const data = await res.json();

    setResults(Array.isArray(data.results) ? data.results : []);
    setNextPage(data.nextPage || null);
    setLoading(false);
  };

  const loadMore = async () => {  
    let url = `https://newsdata.io/api/1/latest?apikey=${APIKEY}&country=in&language=en,hi&category=${category}&page=${nextPage}`;
    let res = await fetch(url);
    let data = await res.json();
    setResults((prevResults) => [
      ...prevResults,
      ...(Array.isArray(data.results) ? data.results : []),
    ]);
    setNextPage(data.nextPage || null);
    setLoading(false);
  };

  useEffect(() => {
    fetchInitialNews();
    document.title = `${category.toString().charAt(0).toUpperCase() + category.toString().toLowerCase().slice(1)} - KalTakNews`;
  }, [category]);

  return (
    <>
       <div className="bg-white dark:bg-[#0F172A] text-gray-800 dark:text-gray-100">
      <h1 className="text-3xl bg-white dark:bg-[#0F172A] text-gray-800 dark:text-gray-100  py-4 ml-9  flex justify-center align-middle ">
        {category.toString().charAt(0).toUpperCase() +
          category.toString().slice(1)}{" "}
        News
      </h1>
      </div>

      <div className=" h-[2px] bg-blue-50 w-full "></div>

      {loading ? (
        <div
          className=" bg-white dark:bg-[#0F172A] grid p-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8  "
        >
          {[...Array(6)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <InfiniteScroll
          dataLength={results.length}
          next={loadMore}
          hasMore={!!nextPage}
          loader={
            <div
              className=" bg-white dark:bg-[#0F172A] grid p-6 grid-cols-1 sm:grid-cols-2   lg:grid-cols-3  gap-8 "
            >
              {[...Array(6)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          }
        >
          <div className="grid p-6 grid-cols-1 bg-[#F8FAFC] dark:bg-[#0F172A] sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {results.map((element) => {
              return (
                <Newsitems
                  key={element.article_id}
                  title={element.title}
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
                  link={element.link}
                  pubDate={element.pubDate}
                  creator={!element.creator ? "Unknown" : element.creator}
                  source_name={element.source_name}
                />
              );
            })}
          </div>
        </InfiniteScroll>
      )}
    </>
  );
};

export default News;
