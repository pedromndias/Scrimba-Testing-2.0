import React, {useState} from "react"
import {calculateWinner} from "../helpers"
import Board from "./Board"

const styles = {
    width: "200px",
    margin: "20px auto"
}

const Game = () => {
    // First we create an empty array of 9 null's:
    const [board, setBoard] = useState(Array(9).fill(null))
    // We will create state to determine which is the player's turn
    const [xIsNext, setXisNext] = useState(true)
    // The winner is determined by passing thge board to the calculateWinner function (on the helpers.js file)
    const winner = calculateWinner(board)

    // This functions handles the click on each square (note the "i" parameter):
    const handleClick = (i) => {
        // We duplicate state:
        const boardCopy = [...board]
        // If user click an occupied square or if game is won, return
        if(winner || boardCopy[i]) return
        // Put an X or an O in the clicked square
        boardCopy[i] = xIsNext ? "X" : "O"
        setBoard(boardCopy)
        setXisNext(!xIsNext)
    }

    // This function renders a button that resets the game (create empty board)
    const renderMoves = () => (
        <button onClick={() => setBoard(Array(9).fill(null))}>
            Start Game
        </button>
    )

    // We pass squares and onClick as props to the Board component.
    // There's also a <p> that will show who's turn it is.
    // At the bottom we call renderMoves
    return (
        <>
            <Board squares={board} onClick={handleClick} />
            <div style={styles}>
                <p>{winner ? 'Winner: ' + winner : 'Next Player: ' + (xIsNext ? 'X' : 'O')}</p>
                {renderMoves()}
            </div>
        </>
    )
}

export default Game