import React from "react";

const NewsItem = (props) => {

    let {
        title,
        description,
        imageUrl,
        newsUrl,
        newsDate,
        newsAuthor,
        newsSource,
    } = props;

    return (
        <>
            <div className="card h-100 card border-secondary mb-3">
                <div style={{ display: "flex", justifyContent: "flex-end", right: "0", position: "absolute" }} >
                    <span className="badge rounded-pill bg-danger" style={{ left: "91%", zIndex: "1" }} > 
                        {newsSource}
                    </span>
                </div>
            
                <img src={imageUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                
                    <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-primary btn-dark">
                        Read More...
                    </a>
                </div>
                <div className="card-footer">
                    <small className="text-muted">
                            By {newsAuthor} on {new Date(newsDate).toUTCString()}
                        </small>
                </div>
            </div>
        </>
    );
}

export default NewsItem;