import React from "react"
import {withToggler} from "./HOCs/withToggler"

function Menu(props) {
    return (
        <div>
            <button onClick={props.toggle}>{props.on ? "Hide" : "Show"} Menu </button>
            <nav style={{display: props.on ? "block" : "none"}}>
                <h6>Signed in as Coder123</h6>
                <a href="/#">Your Profile</a>
                <a href="/#">Your Repositories</a>
                <a href="/#">Your Stars</a>
                <a href="/#">Your Gists</a>
            </nav>
        </div>
    ) 
}

export default withToggler(Menu, {defaultOnValue: true})