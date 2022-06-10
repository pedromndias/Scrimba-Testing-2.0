import React from "react"

function useWordGame(startingTime = 10) {
    
    const [text, setText] = React.useState("")
    const [timeRemaining, setTimeRemaining] = React.useState(startingTime)
    const [isTimeRunning, setIsTimeRunning] = React.useState(false)
    const [wordCount, setWordCount] = React.useState(0)
    const textBoxRef = React.useRef(null)
    
    function handleChange(e){
        setText(e.target.value)
    }
    
    function calculateWordCount(str) { 
        const wordsArr = str.trim().split(" ")
        const filteredWords = wordsArr.filter(word => word !== "")
        return filteredWords.length
    }
    
    function startGame() {
        setIsTimeRunning(true)
        setTimeRemaining(startingTime)
        setText("")
        textBoxRef.current.disabled = false
        textBoxRef.current.focus()
    }
    
    function endGame() {
        setIsTimeRunning(false)
        setWordCount(calculateWordCount(text))
    }
    
    React.useEffect(() => {
        if (isTimeRunning && timeRemaining > 0) {
            setTimeout(() => {
                setTimeRemaining(prevTime => prevTime -1)
            }, 1000)
        } else if (timeRemaining === 0) {
            endGame()
        }
    },[timeRemaining, isTimeRunning])

    return {textBoxRef, handleChange, text, isTimeRunning, timeRemaining, startGame, wordCount}
}

export default useWordGame