// --------- Constructor, State, Infinite Scroll Component, Local Environment Variable, Looping through state in JSX and ComponentDidMount ----------

import React, { Component } from "react";
import Newsitem from './Newsitem.js';
import Loader from "./Loader.js";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {

    constructor() {
        super(); // calling super class construtor is must

        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalArticles: 1,
            hasMoreNews : true
        }
    }

    // fetching api key from local environment variable
    apiKey = process.env.REACT_APP_APIKEY;

    async componentDidMount() {
        this.props.setProgress(30)
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=${this.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        this.props.setProgress(60)
        let data = await fetch(url);
        let parsedData = await data.json();
        this.props.setProgress(90)
        this.setState({ articles: parsedData.articles, totalArticles: parsedData.totalResults, loading: false })
        this.props.setProgress(100)
    }

    fetchMoreData = async () =>{
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=${this.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
                page: this.state.page + 1,
                articles: this.state.articles.concat(parsedData.articles),
            })
            if(this.state.articles.length === this.state.totalArticles || parsedData.articles.length === 0){
                this.setState({hasMoreNews : false})
            }
    }

    render() {
        return (
            <div className="container">
                <h2 className="text-center" style={{marginTop: "80px", marginBottom: "20px"}}>News Monkey - Top {this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} Headlines</h2>

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.hasMoreNews}
                    loader={<Loader />}
                >
                    <div className="row container">
                        {!this.state.loading && this.state.articles.map((element) => {
                            if (element.description && element.title && element.urlToImage) {
                                return <div className="col-md-4" key={element.url}>
                                    <Newsitem title={element.title} description={element.description.length > 90 ? element.description.slice(0, 90) + "..." : element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author ? element.author : "Anonymous"} dateTime={new Date(element.publishedAt).toGMTString()} />
                                </div>
                            }

                        })}
                    </div>
                </InfiniteScroll>
            </div>
        )
    }
}