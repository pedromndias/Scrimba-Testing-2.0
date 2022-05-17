import React from "react";
import {nanoid} from "nanoid";
import Die from "./Die.js";



export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [numRolls, setNumRolls] = React.useState(0)
    
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if ( allHeld && allSameValue) {
            setTenzies(true)
            console.log("You won!")
            console.log(`You've rolled ${numRolls} times`)
        }
    }, [dice])
   

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }

    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        
        return newDice
    }

    function rollDice() {
        if(!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld? 
                    die:
                    generateNewDie()
            }))
            setNumRolls(roll => roll + 1)
        } else {
            setDice(allNewDice())
            setTenzies(false)
            setNumRolls(0)
        }
        
    }

    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ?
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }
    

    const diceElements = dice.map(die => (
            <Die 
                key={die.id}
                value={die.value}
                isHeld={die.isHeld}
                holdDice={() => holdDice(die.id)}
            />
        ))

    return (
        <main>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="container">
                {diceElements}
            </div>
            <button
                className="roll-dice"
                onClick={rollDice}>
                {tenzies ? "New Game" : "Roll"}
            </button>

        </main>
    )
}