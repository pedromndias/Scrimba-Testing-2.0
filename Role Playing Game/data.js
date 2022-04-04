// This file has an array with the data of our characters

const characterData = {
    hero: {
        name: "Wizard",
        avatar: "images/wizard.png",
        health: 60,
        diceCount: 3,
        currentDiceScore: []
    },
    orc: {
        name: "Orc",
        avatar: "images/orc.png",
        health: 30,
        diceCount: 1,
        currentDiceScore: []
    },
    demon: {
        name: "Demon",
        avatar: "images/demon.png",
        health: 25,
        diceCount: 2,
        currentDiceScore: []
    },
    goblin: {
        name: "Goblin",
        avatar: "images/goblin.png",
        health: 20,
        diceCount: 3,
        currentDiceScore: []
    }
}

// We need to export the array. Note the word "default" as it is the only code being exported (and the only code in the file):
export default characterData