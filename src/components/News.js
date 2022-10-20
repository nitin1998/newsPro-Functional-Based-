import React, {useState, useEffect} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component"


const News = (props) => {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
   
    const updateNews = async (pageNo, flag) => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        flag ? props.setProgress(50) : console.log()
        let data = await fetch(url);
        let parsedData = await data.json();
        flag ? props.setProgress(75) : console.log()
        // flag true used for first time and false used for rest of the time
        if(flag === true)
        {
            setArticles(parsedData.articles);
            setTotalResults(parsedData.totalResults);
            setLoading(false);
            props.setProgress(100);
        }
        else{
            setArticles(articles.concat(parsedData.articles));
            setTotalResults(parsedData.totalResults);
            setPage(page + 1);
        }
    }

    useEffect(() => {
        props.setProgress(25);
        updateNews(page, true);
        setPage(page + 1);
        document.title = `${capitalizeFirstLetter(props.category)} - NewsPro`;
    },[])

    // const handlePreviousClick = async () => {
    //     setPage(page - 1);
    //     updateNews(page);
    // }

    // const handleNextClick = async () => {
    //     setPage(page + 1); 
    //     updateNews(page);
    // }

    const fetchMoreData = async () => {
        updateNews(page, false);
    }

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

        return (
            <>
                <h1 className="text-center" style={{margin : '35px 0px', marginTop : '90px'}}>NewsPro - Top Headlines - {capitalizeFirstLetter(props.category)}</h1>
                {loading && <Spinner/>}
                
                <InfiniteScroll 
                    dataLength={articles.length} 
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner/>} 
                >
                    
                <div className="container">
                    <div className="row row-cols-1 row-cols-md-2 g-4">
                        {articles.map( (element) => {
                            return (
                                <div className="col-md-4" key = { element.url } >
                                    <NewsItem
                                        key = { element.url }
                                        title = { element.title ? element.title : "" }
                                        description = { element.description ? element.description : "" }
                                        imageUrl = { element.urlToImage ? element.urlToImage : "https://c.ndtvimg.com/2022-10/fbns206_divya-gokulnath_650x400_12_October_22.jpg" }
                                        newsUrl = { element.url }
                                        newsDate = { element.publishedAt ? element.publishedAt : "" }
                                        newsAuthor = { element.author ? element.author : "Unknown" }
                                        newsSource = { element.source.name }
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
                
                </InfiniteScroll>

                {/* <div className="container d-flex justify-content-between my-3">
                    <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={handlePreviousClick} >&larr; Previous </button>
                    {!loading && <p className="btn-dark disabled">Page No : {page}</p>}
                    <button disabled={page + 1 > Math.ceil(totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={handleNextClick} >Next &rarr; </button>
                </div> */}
            </>
        );
}

News.defaultProps = {
    country : 'in',
    pageSize : 8,
    category: 'general'
}

News.propTypes = {
    country  : PropTypes.string,
    pageSize : PropTypes.number,
    category : PropTypes.string,
    apiKey : PropTypes.string
}

export default News;
