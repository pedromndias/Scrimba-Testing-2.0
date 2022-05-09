import React from "react"
import zaferesImg from "../images/katie-zaferes.png"
import starIcon from "../images/star.png"

export default function Card(props) {
    let badgeText
    if (props.openSpots === 0) {
        badgeText = "SOLD OUT"
    } else if (props.location === "Online") {
        badgeText = "ONLINE"
    }

    return(
        <div className="card">
            {/* If badgeText is truthy, display it: */}
            {badgeText && <div className="card--badge">{badgeText}</div>}
            <img className="card--img" src={zaferesImg}/>
            {/* src={`../images/${props.img}`} */}
            <div className="card--rating">
                <img src={starIcon} className="card--star" />
                <span>{props.stats.rating}</span>
                <span className="gray">({props.stats.reviewCount}) • </span>
                <span className="gray">{props.location}</span>
            </div>
            <p className="card--description">{props.title}</p>
            <p className="card--price"><span className="bold">From ${props.price}</span> / person</p>
        </div>
    )
}