import fallbackimg from '../images/image.png'
import React, { Component } from 'react'
import Newsitems from './Newsitems'

export class News extends Component {


    constructor() {
        super();
        this.state = {
            results: [],
            nextPage: null,
            pagestack: [],
            loading: false
        }
    }


    handlepreviousbtn = async () => {
        console.log("previous");
        const  {pagestack}=this.state;
        if  (pagestack.length===0) return;
        const prevPage=pagestack[pagestack.length-1];
        this.setState({ loading: true });
        let url = prevPage ?`https://newsdata.io/api/1/latest?apikey=pub_4041938c8db745e8bec79956556364da&country=in&language=en,hi&page=${prevPage}` : "https://newsdata.io/api/1/latest?apikey=pub_4041938c8db745e8bec79956556364da&country=in&language=en,hi";
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            results: parsedData.results || [],
            pagestack:pagestack.slice(0,-1),
            nextPage: parsedData.nextPage || null,
            loading: false
        });
    }

    handlenextbtn = async () => {
        
        if(!this.state.nextPage) return;
        const {nextPage,pagestack}=this.state;
        this.setState({ loading: true });
        let url = `https://newsdata.io/api/1/latest?apikey=pub_4041938c8db745e8bec79956556364da&country=in&language=en,hi&page=${nextPage}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({  results: parsedData.results, pagestack:[...pagestack,nextPage],nextPage: parsedData.nextPage,loading: false });
    }

    async componentDidMount() {
        this.setState({ loading: true });
        let url = "https://newsdata.io/api/1/latest?apikey=pub_4041938c8db745e8bec79956556364da&country=in&language=en,hi";
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            results: parsedData.results || [],
            nextPage: parsedData.nextPage || null,
            loading: false
        });
    }

    render() {
        return (
            <>
                <h1 className="text-3xlgit  m-4 ml-9 flex justify-center align-middle">Latest News</h1>
                {this.state.loading && (
                     <div className="relative flex flex-col items-center gap-6 px-10 py-8 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-2xl shadow-2xl">

                    <div className='flex justify-center items-center py-10'>
                        <div className='w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin '></div>
                    </div>
                    </div>
                )}
                <div className="grid p-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                    { this.state.results.map((element) => { return <Newsitems key={ element.article_id } title={ element.title } description={ !element.description ? "To learn more about this news, click the button below.": element.description } imgurl={ element.image_url && element.image_url.trim() !== "" ? element.image_url : fallbackimg } link={ element.link } />; }) }
                </div>
                <div className='flex justify-between m-5'>
                    <button disabled={this.state.pagestack.length===0} className='bg-blue-500 text-black  px-4 py-2 hover:bg-blue-600 transition rounded-md ' onClick={ this.handlepreviousbtn }> &#8592; Previous </button>
                    <button disabled={!this.state.nextPage} className='bg-blue-500 text-black  px-4 py-2 hover:bg-blue-600 transition rounded-md' onClick={ this.handlenextbtn }>Next &#8594;</button>
                </div>
            </>
        )
    }
}

export default News 