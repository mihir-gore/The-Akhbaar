import fallbackimg from '../images/image.png'
import React, { Component } from 'react'
import Newsitems from './Newsitems'

export class News extends Component {


    constructor() {
        super();
        this.state = {
            results: [],
            nextPage: null
        }
    }


    handlepreviousbtn = async () => {
        console.log("previous");

        let url = "https://newsdata.io/api/1/latest?apikey=pub_4041938c8db745e8bec79956556364da&country=in&language=en,hi";
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            results: parsedData.results || [],
            nextPage: parsedData.nextPage || null
        });
    }

    handlenextbtn = async () => {
        if(!this.state.nextPage) return;
        let url = `https://newsdata.io/api/1/latest?apikey=pub_4041938c8db745e8bec79956556364da&country=in&language=en,hi&page=${this.state.nextPage}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ nextPage: parsedData.nextPage, results: parsedData.results });
    }

    async componentDidMount() {
        let url = "https://newsdata.io/api/1/latest?apikey=pub_4041938c8db745e8bec79956556364da&country=in&language=en,hi";
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            results: parsedData.results || [],
            nextPage: parsedData.nextPage || null
        });
    }

    render() {
        return (
            <>
                <h1 className="text-3xlgit  m-4 ml-9 flex justify-center align-middle">Latest News</h1>
                <div className="grid p-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    { this.state.results.map((element) => { return <Newsitems key={ element.article_id } title={ element.title } description={ element.description } imgurl={ element.image_url && element.image_url.trim() !== "" ? element.image_url : fallbackimg } link={ element.link } />; }) }
                </div>
                <div className='flex justify-between m-5'>
                    <button className='bg-blue-500 text-black  px-4 py-2 hover:bg-blue-600 transition rounded-md ' onClick={ this.handlepreviousbtn }> &#8592; Previous </button>
                    <button disabled={!this.state.nextPage} className='bg-blue-500 text-black  px-4 py-2 hover:bg-blue-600 transition rounded-md' onClick={ this.handlenextbtn }>Next &#8594;</button>
                </div>
            </>
        )
    }
}

export default Newsgit 