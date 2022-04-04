// In this file we have some utility functions used in our game:

// This function takes the character's diceCount and fills an array with random numbers from 1 to 6:
function getDiceRollArray(diceCount) {
    return new Array(diceCount).fill(0).map(() =>
        Math.floor(Math.random() * 6) + 1
    )
}

// This function returns the health's percentage of a character:
const getPercentage = (remainingHealth, maximumHealth) => 
    (100 * remainingHealth) / maximumHealth

// This function grabs the character's diceCount and creates an array filled with Html to show empty squares on the beginning of the game. Note the .fill() .map() and .join() methods:
function getDicePlaceholderHtml(diceCount) {
    return new Array(diceCount).fill(0).map(() =>
        `<div class="placeholder-dice"></div>`
    ).join("")
}

// Let's export those functions:
export { getDiceRollArray, getDicePlaceholderHtml, getPercentage }