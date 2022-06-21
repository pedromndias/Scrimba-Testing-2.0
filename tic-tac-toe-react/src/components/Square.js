import React from "react"

const style = {
    background: 'lightblue',
    border: '2px solid darkblue',
    fontSize: '30px',
    fontWeight: '800',
    cursor: 'pointer',
    outline: 'none'
}

// Each square will receive onClick and value as props and will render a button (note that the onClick is being declared on the Game component)
const Square = ({ onClick, value }) => (
    <button style={style} onClick={onClick}>{value}</button>
)

export default Square