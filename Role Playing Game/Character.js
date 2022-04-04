// In this file we create the Character class for our characters

// Will import a few methods from utils.js:
import { getDiceRollArray, getDicePlaceholderHtml, getPercentage } from './utils.js'

class Character {
    // The class constructor with its properties. It takes data as an argument:
    constructor(data) {
        // With Object.assign(target, source) we can copy the properties from data to the new object created:
        Object.assign(this, data)
        // Each character's maxHealth it's equals to its original health:
        this.maxHealth = this.health
        // The diceHtml property calls a function to return the number of dices (diceCount) in the page's Html:
        this.diceHtml = getDicePlaceholderHtml(this.diceCount)
    }

    // Now we create the class's methods:

    // This method saves the return of getDiceRollArray() and creates a property with it to render Html:
    setDiceHtml() {
        this.currentDiceScore = getDiceRollArray(this.diceCount)
        this.diceHtml = this.currentDiceScore.map((num) =>
            `<div class="dice">${num}</div>`).join("")
    }

    // The next method takes the currentDiceScore array from the previous method and saves the sum of the dice values in a variable. Note the reduce() method:
    takeDamage(attackScoreArray) {
        const totalAttackScore = attackScoreArray.reduce((total, num) => total + num)
        // Then we subtract that to the character's health:
        this.health -= totalAttackScore
        // And chack if the character is dead (health <=0)
        if (this.health <= 0) {
            this.dead = true
            this.health = 0
        }
    }

    // This method saves the getPercentage retuen in a variable and makes the Html health bar width decrease depending on that percentage:
    getHealthBarHtml() {
        const percent = getPercentage(this.health, this.maxHealth)
        return `<div class="health-bar-outer">
                    <div class="health-bar-inner ${percent < 26 ? "danger" : ""}" 
                            style="width:${percent}%;">
                    </div>
                </div>`
    }

    // The next method gets the data from the character's array in data.js file:
    getCharacterHtml() {
        // Let's destructure the data and save it in ".this" which will be the instance created:
        const { elementId, name, avatar, health, diceCount, diceHtml } = this
        // We the call getHealthBarHtml and save it in a variable:
        const healthBar = this.getHealthBarHtml()
        // And render it and the other properties as Html on our page:
        return `
            <div class="character-card">
                <h4 class="name"> ${name} </h4>
                <img class="avatar" src="${avatar}" />
                <div class="health">health: <b> ${health} </b></div>
                ${healthBar}
                <div class="dice-container">
                    ${diceHtml}
                </div>
            </div>`
    }
}

// Finally, we needto export our class:
export default Character