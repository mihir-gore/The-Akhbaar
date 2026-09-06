import React from "react";
import { TrendingUp, MoveRight } from "lucide-react";
import useMarketNews from "../Hooks/useMarketNews";
import Newsitems from "./Newsitems"; // 1. Import Newsitems component

const MarketNews = ({ onGenerateSummary }) => {
  const { results, loading, error } = useMarketNews({size: 10,});

  if (loading) {
    return (
      <section className="w-full px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp size={20} className="text-blue-600" />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Market News
          </h2>
        </div>

        <div className="flex gap-5 overflow-hidden">
          {[1, 2, 3].map((item) => (
            <div key={item} className="min-w-[280px] sm:min-w-[320px] lg:min-w-[350px] h-[330px] rounded-2xl bg-slate-100 dark:bg-slate-800 animate-pulse" /> ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full px-4 sm:px-6 lg:px-8 py-10">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Market news is currently unavailable.
          </p>
        </div>
      </section>
    );
  }

  if (!results.length) {
    return null;
  }

  return (
   <section className="w-full px-4 sm:px-6 lg:px-8 py-2">
      <div className="mb-6 cursor-default select-none w-full">
        <div className="flex items-center justify-between w-full mb-2 px-5">
          <div className="flex items-center gap-2">
            <p className="uppercase tracking-[0.3em] text-base text-blue-600 font-semibold">
              Markets
            </p>
            <TrendingUp size={20} className="text-blue-600" />
          </div>

          <MoveRight size={20} className="text-blue-600 cursor-pointer" />
        </div>

        <h2 className="font-plus-jakarta text-2xl mt-1 font-semibold text-slate-900 dark:text-white ml-5">
          Market News
        </h2>

        <p className="mt-1 ml-5 text-sm sm:text-base text-slate-500 dark:text-slate-400">
          The latest developments shaping India's markets and economy.
        </p>
      </div>

      <div className="ml-5 mt-10 flex overflow-x-auto pb-4 gap-8 snap-x snap-mandatory scrollbar-none">
        {results.map((article, index) => (
          <div key={article.article_id || index} className="w-[300px] md:w-[335px] flex-shrink-0 snap-start" >
            <Newsitems
              article_id={article.article_id}
              title={article.title || "Market update"}
              description={
                article.description ||
                article.content ||
                "Latest developments from the financial and business markets."
              }
              imgurl={article.image_url || article.image}
              link={article.link}
              pubDate={article.pubDate || article.published_at}
              creator={article.creator || article.author || "Market Express"}
              source_name={
                article.source_name || article.source_id || "Market News"
              }
              category="Markets"
              onGenerateSummary={onGenerateSummary || (() => {})}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default MarketNews;
