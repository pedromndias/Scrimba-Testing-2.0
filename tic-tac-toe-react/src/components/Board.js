import React from "react"
import Square from "./Square"

const style = {
     border: "4px solid darkblue",
     borderRadius: "10px",
     width: "250px",
     height: "250px",
     margin: "0 auto",
     display: "grid",
     gridTemplate: "repeat(3, 1fr) / repeat(3, 1fr)"
}

// squares and onClick are the props from the Game component.
// We map the squares array(board) and render a square for each item, passing key, value and onClick to the Squares component. Note "i" as the index parameter
const Board = ({squares, onClick}) => (
    <div style={style}>
        {squares.map((square, i) => (
            <Square key={i} value={square} onClick={() => onClick(i)}/>
        ))}
    </div>
)

export default Board