
// Let's define some variables, one to  store the deck id from the API and two other to initialize the scores
let deckId
let computerScore = 0
let playerScore = 0

// Let's create variables to store our HTML elements
const cardsContainer = document.getElementById("cards")
const newDeckBtn = document.getElementById("new-deck")
const drawCardBtn = document.getElementById("draw-cards")

const remainingCards = document.getElementById("remaining-cards")

const messageDisplay = document.getElementById("message")

const computerSum = document.getElementById("computer-sum")
const playerSum = document.getElementById("player-sum")

// Let's create an asynchronous function that will run when we click the newDeckBtn
async function handleClick() {
    // It will await the fetch to the API so we can get the deckId and use it on the event listener for the drawCardBtn:
    const res = await fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    const data = await res.json()
    deckId = data.deck_id
    // It will also show a initial message indicating that all the deck is still to be drawn (52)
    remainingCards.innerText = `Remaining Cards: ${data.remaining}`

    // When we draw a new deck, all the app values should be reset
    messageDisplay.innerText = `Game of War`
    computerScore = 0
    playerScore = 0
    computerSum.innerText = `Computer score: 0`
    playerSum.innerText = `My score: 0`
    cardsContainer.children[0].innerHTML = ""
    cardsContainer.children[1].innerHTML = ""

}

// Event listener for the newDeckBtn (will call handleClick())
newDeckBtn.addEventListener("click", handleClick)

// Event listener for the drawCardBtn. This will call an asynchronous function that will await for a fetch to the API, this time including the deckId we got fro the previous fetch.
drawCardBtn.addEventListener("click", async () => {
    const res = await fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    const data = await res.json()
    console.log(data)
    // As handleClick(), it will show a message with the remaining cards in the deck
    remainingCards.innerText = `Remaining Cards: ${data.remaining}`

    // We will get the image of the 2 cards that were drawn and add it as HTML to each children of the cardContainer. Note the class="card" that will make sure the cards are shown inside those children div's (check CSS file)
    cardsContainer.children[0].innerHTML = `
        <img src=${data.cards[0].image} class="card">
    `
    cardsContainer.children[1].innerHTML = `
        <img src=${data.cards[1].image} class="card">    
    `

    // Let's show the top message depending on who had the highest card, by calling getHighestCard function
    let message = getHighestCard(data.cards[0], data.cards[1])
    messageDisplay.innerText = message

    // There has to be some action when the game is over (no more cards in the deck)
    if (data.remaining === 0) {
        // if the remaining cards are zero, we should disable the drawCardBtn button and update the top message depending on who has the highest total score (value returned from getHighestCard function)
        drawCardBtn.disabled = true
        if (computerScore > playerScore) {
            messageDisplay.innerText = "Computer is the ultimate winner!"
        } else if (computerScore < playerScore) {
            messageDisplay.innerText = "You are the ultimate winner!"
        } else {
            messageDisplay.innerText = "This game is a tie!"
        }
    }
})

// This next function takes the 2 cards from the API's returned data and will return who has the highest
function getHighestCard(card1, card2) {
    // Let's create an array with the asceding order of the cards, so we can then compare with the parameters' cards
    const cardsArray = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"]
    // Now we save the indexOf those cards in variables so we can then compare them
    const card1ValueIndex = cardsArray.indexOf(card1.value)
    const card2ValueIndex = cardsArray.indexOf(card2.value)

    // Let's compare those variables and return who has the highest card. We should also increment the correspondant score and update the score's message on each player
    if(card1ValueIndex > card2ValueIndex) {
        computerScore++
        computerSum.innerText = `Computer score: ${computerScore}`
        return "Card 1 wins"

    } else if (card1ValueIndex < card2ValueIndex) {
        playerScore++
        playerSum.innerText = `My score: ${playerScore}`
        return "Card 2 wins"
    } else {
        return "War!"
    }
}
