// APP MAIN JS FILE:

// Let's import necessary code from other JS files:
import characterData from './data.js'
import Character from './Character.js'

// Let's create a monsters array so we can swtich from one another when the previous one dies:
let monstersArray = ["orc", "demon", "goblin"]

// Let's create a variable to use on the setTimeout's, when characters die or the game ends:
let isWaiting = false

// Let's create a function to get the monster data from data.js, refering to the 1st position on our monster array
function getNewMonster() {
    const nextMonsterData = characterData[monstersArray.shift()]
    // Let's check if there is still any monster data. If not (monsters array is empty), we return an empty object:
    return nextMonsterData ? new Character(nextMonsterData) : {}
}

// The next function is called when the button is clicked:
function attack() {
    // If the isWaiting is not true, we may proceed:
    if(!isWaiting){
        // First, we show each character's dices on our page's Html (after it generates random numbers with getDiceRollArray() ):
        wizard.setDiceHtml()
        monster.setDiceHtml()
        // Then we call takeDamage on each character using the total sum of the dices:
        wizard.takeDamage(monster.currentDiceScore)
        monster.takeDamage(wizard.currentDiceScore)
        // And we call render() which will show the Html for each character on our page:
        render()
        
        // If the wizard has 0 or less health, we call endGame():
        if(wizard.dead){
            endGame()
        }
        // Else if the monster is dead, we set isWaiting to true so we can have a small pause between "scenes" (change of mosnter or final end)
        else if(monster.dead){
            isWaiting = true
            // If there still any mosters on the array, we do a setTimeout of 1,5 until showing the next monster, calling getNewMonster after and seting its returnt value to the the variable "monster"
            if(monstersArray.length > 0){
                setTimeout(()=>{
                    monster = getNewMonster()
                    render()
                    isWaiting = false
                },1500)
            }
            // IF no more monster on the array, we call endGame():
            else{
                endGame()
            }
        }    
    }
}

// Let's define our endGame() function
function endGame() {
    // If the game ends, we will do a 1 second pause before showing the final message, so we set isWaiting to true
    isWaiting = true
    // If both characters die we show a different message then if the wizard or the monsters win:
    const endMessage = wizard.health === 0 && monster.health === 0 ?
        "No victors - all creatures are dead" :
        wizard.health > 0 ? "The Wizard Wins" :
            "The monsters are Victorious"

    // We will also render and emoji depending who has still health at the end of the game. Note the setTimeout before showing the Html:
    const endEmoji = wizard.health > 0 ? "🔮" : "☠️"
        setTimeout(()=>{
            document.body.innerHTML = `
                <div class="end-game">
                    <h2>Game Over</h2> 
                    <h3>${endMessage}</h3>
                    <p class="end-emoji">${endEmoji}</p>
                </div>
                `
        }, 1500)
}

// Let's create an event listener for when we click the Attack button:
document.getElementById("attack-button").addEventListener('click', attack)

// The render() function will call getCharacterHtml on each character and render its Html on our page:
function render() {
    document.getElementById('hero').innerHTML = wizard.getCharacterHtml()
    document.getElementById('monster').innerHTML = monster.getCharacterHtml()
}

// Let's save a new instance of the wizard in a variable:
const wizard = new Character(characterData.hero)
// And call getNewMonster() to get data on a variable "monster"
let monster = getNewMonster()
// We call render() when we access the page for the first time so it shows the beginning of the game:
render()