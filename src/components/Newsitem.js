// ---------- Props ----------

import React, { Component } from 'react'

export default class Newsitem extends Component {
    render() {

        // destructuring the props
        let {title, description, imageUrl, newsUrl, author, dateTime} = this.props;

        return (
            <div style={{display: "flex", justifyContent: "center"}}>
                <div className="card my-3" style={{width: "18rem"}}>
                    <img src={imageUrl} className="card-img-top" alt="News"/>
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{description}</p>
                            <p className="card-text"><small className="text-body-secondary">By {author} on {dateTime}</small></p>
                            <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read More</a>
                        </div>
                </div>
            </div>
        )
    }
}
