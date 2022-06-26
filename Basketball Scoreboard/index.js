const btnHome1 = document.getElementById("btn-home-1")
const btnHome2 = document.getElementById("btn-home-2")
const btnHome3 = document.getElementById("btn-home-3")
const btnGuest1 = document.getElementById("btn-guest-1")
const btnGuest2 = document.getElementById("btn-guest-2")
const btnGuest3 = document.getElementById("btn-guest-3")

const newGame = document.getElementById("new-game")

const homeText = document.getElementById("home-text")
const guestText = document.getElementById("guest-text")

const homeScoreDiv = document.getElementById("home-score")
const guestScoreDiv = document.getElementById("guest-score")

let homeScore = 0
let guestScore = 0
btnHome1.addEventListener("click", () => {
    homeScore ++
    homeScoreDiv.innerText = homeScore
    highLight()
})
btnHome2.addEventListener("click", () => {
    homeScore = homeScore + 2
    homeScoreDiv.innerText = homeScore
    highLight()
})
btnHome3.addEventListener("click", () => {
    homeScore = homeScore + 3
    homeScoreDiv.innerText = homeScore
    highLight()
})
btnGuest1.addEventListener("click", () => {
    guestScore ++
    guestScoreDiv.innerText = guestScore
    highLight()
})
btnGuest2.addEventListener("click", () => {
    guestScore = guestScore + 2
    guestScoreDiv.innerText = guestScore
    highLight()
})
btnGuest3.addEventListener("click", () => {
    guestScore = guestScore + 3
    guestScoreDiv.innerText = guestScore
    highLight()
})

newGame.addEventListener("click", () => {
    homeScore = 0
    guestScore = 0
    homeScoreDiv.innerText = homeScore
    guestScoreDiv.innerText = guestScore
    highLight()
})

function highLight() {
    if(homeScore > guestScore) {
        homeText.classList.add("high-light")
        guestText.classList.remove("high-light")
    } else if (homeScore < guestScore) {
        guestText.classList.add("high-light")
        homeText.classList.remove("high-light")
    } else {
        homeText.classList.remove("high-light")
        guestText.classList.remove("high-light")
    }
}
