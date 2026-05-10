import fallbackimg from '../images/image.png'
import React,{useEffect, useState} from 'react'
import Newsitems from './Newsitems'
import InfiniteScroll from 'react-infinite-scroll-component';
import { set } from 'date-fns';


const News=(props)=>{

   const [results, setResults] = useState([]);
   const [nextPage, setNextPage] = useState(null);
    const [loading, setLoading] = useState(false);
    const fetchInitialNews = async () => {
        setLoading(true );
        const url = `https://newsdata.io/api/1/latest?apikey=pub_4041938c8db745e8bec79956556364da&country=in&language=en,hi&category=${props.category}`;
        const res = await fetch(url);
        const data = await res.json();

        setResults(Array.isArray(data.results)?data.results:[]);
        setNextPage(data.nextPage || null);
        setLoading(false);
    }

    const loadMore = async () => {
        if (!nextPage) return;
        let url = `https://newsdata.io/api/1/latest?apikey=pub_4041938c8db745e8bec79956556364da&country=in&language=en,hi&category=${props.category}&page=${nextPage}`;
        let res = await fetch(url);
        let data = await res.json();
        setResults(prevResults => [...prevResults, ...(Array.isArray(data.results) ? data.results : [])]);
        setNextPage(data.nextPage || null);
        setLoading(false);
    }
    
    useEffect(()=>{
        fetchInitialNews();
        document.title = `${props.category.toString().charAt(0).toUpperCase() + props.category.toString().toLowerCase().slice(1)} - KalTakNews`

    }, [props.category]);


        return (
            <>

                <h1 className="text-3xl  m-4 ml-9  flex justify-center align-middle">{props.category.toString().charAt(0).toUpperCase() + props.category.toString().slice(1) } News</h1>

                <div className=" h-[2px] bg-blue-50 mt-2 w-full " ></div>


              { loading && results.length === 0 ? (
                    <div className="flex justify-center items-center h-[60vh]">
                        <div className="w-10 h-10 border-4 border-[#4F7C82] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <InfiniteScroll dataLength={ results.length }
                        next={ loadMore } hasMore={ !!nextPage } loader={
                            <span className="flex justify-center items-center gap-1 mb-2">
                                { [...Array(3)].map((_, i) => (
                                    <span
                                        key={ i }
                                        className="w-1.5 h-1.5 bg-[#4F7C82] rounded-full animate-pulse"
                                        style={ { animationDelay: `${i * 0.2}s` } }
                                    ></span>
                                )) }
                            </span>
                        } >
                    
                        <div className="grid p-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                            { results.map((element) => { return <Newsitems key={ element.article_id } title={ element.title } description={ !element.description ? "To learn more about this news, click the button below." : element.description } imgurl={ element.image_url && element.image_url.trim() !== "" ? element.image_url : fallbackimg } link={ element.link } pubDate={ element.pubDate } creator={ !element.creator ? "Unknown" : element.creator } source_name={ element.source_name } />; }) }
                        </div>
                         </InfiniteScroll>
                          ) }
 
            </>
        )
    
}

export default News 