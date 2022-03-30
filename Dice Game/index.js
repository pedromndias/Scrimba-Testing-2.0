// Define variables for players turn and each player's score
let player1Turn = true
let player1Score = 0
let player2Score = 0

// Get the elements and buttons from HTML
const message = document.getElementById("message")
const player1Dice = document.getElementById("player1Dice")
const player2Dice = document.getElementById("player2Dice")
const player1Scoreboard = document.getElementById("player1Scoreboard")
const player2Scoreboard = document.getElementById("player2Scoreboard")
const rollBtn = document.getElementById("rollBtn")
const resetBtn = document.getElementById("resetBtn")
const drawBtn = document.getElementById("drawPlayer")

// Define a function for the end of the game, hiding rollBtn and showing resetBtn
// and displaying a wining message
function endOfGame(player) {
    message.textContent = `Player ${player} has won!`
    rollBtn.style.display = "none"
    resetBtn.style.display = "block"
}

// Define a reset function, where all the elements and variables return to their initial values
function reset() {
    player1Turn = true
    player1Dice.textContent = "-"
    player2Dice.textContent = "-"
    player1Score = 0
    player2Score = 0
    player1Scoreboard.textContent = player1Score
    player2Scoreboard.textContent = player2Score
    player2Dice.classList.remove("active")
    player1Dice.classList.remove("active")
    message.textContent = "First Player to start?"
    resetBtn.style.display = "none"
    drawBtn.style.display = "block"
}

// Create an event listener for the rollBtn
// Check which player's turn it is and if the score is over 20 call endOfGame()
// At the end, change player's turn
rollBtn.addEventListener("click", function() {
    const randomNumber = Math.floor(Math.random() * 6) +1
    if(player1Turn) {
        player1Dice.textContent = randomNumber
        player1Score += randomNumber
        player1Scoreboard.textContent = player1Score
        message.textContent = "Player 2 Turn"
        player1Dice.classList.remove("active")
        player2Dice.classList.add("active")
    } else {
        player2Dice.textContent = randomNumber
        player2Score += randomNumber
        player2Scoreboard.textContent = player2Score
        message.textContent = "Player 1 Turn"
        player2Dice.classList.remove("active")
        player1Dice.classList.add("active")
    }

    if(player1Score >= 20) {
        endOfGame(1)
    } else if(player2Score >= 20) {
        endOfGame(2)
    }
    
    player1Turn = !player1Turn
})

// When resetBtn is shown, it can call reset() with an event listener
resetBtn.addEventListener("click", reset)

// Create an event listener for the drawBtn
// It randomly chooses a player to start and then displays rollBtn and
// updates the message accordingly. drawBtn is hidden
drawBtn.addEventListener("click", function() {
    let playerToStart = Math.round(Math.random())
    if(playerToStart === 1) {
        message.textContent = "Player 1 Turn"
        player1Dice.classList.add("active")
        player1Turn = true
    } else {
        message.textContent = "Player 2 Turn"
        player2Dice.classList.add("active")
        player1Turn = false
    }
    drawBtn.style.display = "none"
    rollBtn.style.display = "block"
})