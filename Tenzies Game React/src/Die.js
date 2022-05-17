import React from "react";

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    return(
        <div className="die-item" style={styles} onClick={props.holdDice}>
            {props.value}
        </div>
    )
}