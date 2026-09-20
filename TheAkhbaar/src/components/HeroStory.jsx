import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useHistory from '../Hooks/useHistory';
import { Bookmark, BookmarkCheck } from "lucide-react";
import useBookmarks from '../Hooks/useBookmarks';
const HeroStory = ({ articles = [] }) => {
  const heroStories = articles.slice(0, 5);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const { addtoHistory } = useHistory();
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  const current = heroStories[currentIndex];
  const bookmarked = isBookmarked(current.article_id);
  
  useEffect(() => {
    if (paused || heroStories.length <= 1) return;

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(progressTimer);
  }, [paused, currentIndex, heroStories.length]);

  useEffect(() => {
    if (progress < 100) return;

    setProgress(0);

    setCurrentIndex((prev) =>
      prev === heroStories.length - 1 ? 0 : prev + 1
    );
  }, [progress, heroStories.length]);

  const selectStory = (index) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  if (!current) return null;

  const handleReadStory = () => {
    if (!current) return;
    addtoHistory({
      article_id: current.article_id,
      title: current.title,
      description: current.description,
      imgurl: current.image_url,
      link: current.link,
      source_name: current.source_name,
      pubDate: current.pubDate,
      category: current.category,
    });
  };
  
   const handleBookmark = () => {
    if (!current) return;

    if (bookmarked) {
      removeBookmark(current.article_id);
    } else {
      addBookmark({
        article_id: current.article_id,
        title: current.title,
        description: current.description,
        imgurl: current.image_url,
        link: current.link,
        source_name: current.source_name,
        pubDate: current.pubDate,
        category: current.category,
      });
    }
  };

  return (
    <section
      className="max-w mx-auto px-2 sm:px-4 md:px-6 pt-2 sm:pt-6 md:pt-8"
      onMouseEnter={ () => setPaused(true) }
      onMouseLeave={ () => setPaused(false) }
    >
      <div className="grid lg:grid-cols-[2fr_420px] gap-8 items-stretch">

        <div className="relative h-[480px] sm:h-[520px] md:h-[580px] lg:h-[650px] overflow-hidden rounded-[34px] sm:rounded-3xl md:rounded-[36px] shadow-[0_30px_80px_rgba(0,0,0,0.18)]">

          <AnimatePresence mode="wait">

            <motion.div
              key={ current.article_id }
              initial={ {
                opacity: 0,
                scale: 1.05,
                y: 30
              } }
              animate={ {
                opacity: 1,
                scale: 1,
                y: 0
              } }
              exit={ {
                opacity: 0,
                scale: 0.97,
                y: -20
              } }
              transition={ {
                duration: 0.55
              } }
              className="absolute inset-0"
            >

              <img src={ current.image_url } alt={ current.title } className="absolute inset-0 h-full w-full object-cover"/>

              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />

              <div className="absolute  bottom-6 left-5 right-5 sm:bottom-8 sm:left-8 sm:right-8 md:bottom-10 md:left-10 md:right-10 lg:bottom-14 lg:left-14 lg:right-auto max-w-3xl text-white">

                <span className="inline-flex rounded-full border border-white/30 bg-white/10 backdrop-blur-xl px-5 py-2 text-xs uppercase tracking-[0.3em]">
                  { current.category
                    ? current.category[0]
                    : "Top Story" }
                </span>

                <motion.h1
                  initial={ { opacity: 0, y: 20 } }
                  animate={ { opacity: 1, y: 0 } }
                  transition={ {
                    delay: 0.15
                  } }
                  className="mt-4 sm:mt-5 md:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight"
                >
                  { current.title }
                </motion.h1>

                <motion.p
                  initial={ { opacity: 0 } }
                  animate={ { opacity: 1 } }
                  transition={ {
                    delay: 0.3
                  } }
                  className="mt-4 sm:mt-5 md:mt-6 text-base sm:text-lg md:text-xl text-gray-200 leading-6 sm:leading-7 md:leading-9 line-clamp-2">

                  { current.description }
                </motion.p>

                <motion.div
                  initial={ { opacity: 0 } }
                  animate={ { opacity: 1 } }
                  transition={ {
                    delay: 0.45
                  } }
                  className="mt-10 flex flex-wrap items-center gap-8"
                >

                  <span className="text-gray-300">
                    { current.source_name }
                  </span>

                  <span className="text-gray-400">
                    { current.pubDate }
                  </span>

                   <button title="Bookmark" onClick={handleBookmark} className="p-2 rounded-full transition-colors duration-300 hover:bg-gray-900 dark:text-gray-300 dark:hover:bg-blue-400 " >
                    { bookmarked ? <BookmarkCheck size={ 20 } /> : <Bookmark size={ 20 } /> }
                </button>

                  <a onClick={ handleReadStory } href={ current.link } target="_blank" rel="noreferrer" className="ml-auto rounded-full hover:bg-gray-900 hover:text-white bg-white px-4 py-2 font-semibold text-black transition-colors duration-300 focus:ring-1 border border-gray-300 hover:scale-105" >
                    Read Story →
                  </a>

                </motion.div>

              </div>

            </motion.div>

          </AnimatePresence>


          <div className="absolute bottom-0 left-0 h-1 w-full bg-white/20">

            <motion.div
              animate={ {
                width: `${progress}%`
              } }
              transition={ {
                ease: "linear"
              } }
              className="h-full bg-white"
            />

          </div>

        </div>

        <div className="flex  flex-col justify-between sm:h-[520px] md:h-[580px] lg:h-[650px] rounded-[34px] border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-700 dark:bg-[#111827] h-[480px]">

          <div>

            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-600">
              Today's Headlines
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
              Top Stories
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
              The Five biggest stories right now. Click any headline to instantly
              switch the featured story.
            </p>

          </div>

          <div className="mt-6 scrollbar-none flex flex-col gap-4 h-relative overflow-y-auto pr-2">

            { heroStories.map((story, index) => (

              <motion.button
                key={ story.article_id }
                whileHover={ { x: 6 } }
                whileTap={ { scale: 0.98 } }
                onClick={ () => selectStory(index) }
                className={ `group rounded-2xl mb-2 border p-3 text-left transition-all duration-300 ${currentIndex === index
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-slate-200 bg-slate-50 hover:border-blue-300 hover:bg-white dark:border-slate-700 dark:bg-slate-800"
                  }` }
              >

                <div className="flex gap-4">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white dark:bg-white dark:text-black">
                    { String(index + 1).padStart(2, "0") }
                  </div>

                  <div className="flex-1">

                    <p className="line-clamp-2 text-base font-semibold text-slate-900 dark:text-white">
                      { story.title }
                    </p>

                    <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">

                      <span>{ story.source_name }</span>

                      <span>•</span>

                      <span>{ story.pubDate }</span>

                    </div>

                  </div>

                </div>

              </motion.button>

            )) }

          </div>

          <div className="flex items-center justify-between mt-4 sm:mt-5 md:mt-8">

            <div>
              <p className="text-[9px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-slate-400">
                Viewing
              </p>


              <p className="mt-0.5 sm:mt-1 text-sm sm:text-base md:text-lg font-semibold text-slate-900 dark:text-white">
                { String(currentIndex + 1).padStart(2, "0") } /{ " " }
                { String(heroStories.length).padStart(2, "0") }
              </p>


            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">


              { heroStories.map((_, i) => (

                <button
                  key={ i }
                  onClick={ () => selectStory(i) }
                  aria-label={ `View story ${i + 1}` }
                  className={ `h-1.5 sm:h-2 rounded-full transition-all duration-300 ${currentIndex === i
                      ? "w-6 sm:w-10 bg-blue-600"
                      : "w-1.5 sm:w-2 bg-slate-300 dark:bg-slate-600"
                    }` }
                />

              )) }


            </div>

          </div>


        </div>

      </div>
    </section>
  );
};

export default HeroStory;