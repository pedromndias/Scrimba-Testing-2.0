let rectangle95 = document.getElementById("rectangle95")
let rectangle96 = document.getElementById("rectangle96")
let rectangle97 = document.getElementById("rectangle97")
let rectangle98 = document.getElementById("rectangle98")

let randomChars = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "c", "v", "b", "n", "m", "Q", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M", "!", "@", "#", "$", "%", "&"]

for (let i = 0; i < 10; i++) {
    randomChars.push(i)
}

function generateRandom95() {
    let randomChar = Math.floor(Math.random() * randomChars.length)
    rectangle95.textContent += randomChars[randomChar]
}
function generateRandom96() {
    let randomChar = Math.floor(Math.random() * randomChars.length)
    rectangle96.textContent += randomChars[randomChar]
}
function generateRandom97() {
    let randomChar = Math.floor(Math.random() * randomChars.length)
    rectangle97.textContent += randomChars[randomChar]
}
function generateRandom98() {
    let randomChar = Math.floor(Math.random() * randomChars.length)
    rectangle98.textContent += randomChars[randomChar]
}

function generatePass() {
    rectangle95.textContent = ""
    rectangle96.textContent = ""
    rectangle97.textContent = ""
    rectangle98.textContent = ""
    for (let i = 0; i <= 10; i++) {
        generateRandom95()
        generateRandom96()
        generateRandom97()
        generateRandom98()
    }
}

