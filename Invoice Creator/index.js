// Create the array of services (with objects)
let taskArray = [
    {
        service: "Wash Car",
        price: 10
    },
    {
        service: "Mow Lawn",
        price: 20
    },
    {
        service: "Pull Weed",
        price: 30
    }
]

// Get the buttons and elements from HTML
const carWashBtn = document.getElementById("car-wash-btn")
const mainLawnBtn = document.getElementById("main-lawn-btn")
const pullWeedBtn = document.getElementById("pull-weed-btn")

const sendInvoiceBtn = document.getElementById("send-invoice-btn")

let taskLine = document.getElementById("task-line")

let priceLine = document.getElementById("price-line")

let totalAmmount = document.getElementById("total-ammount")
let total = 0

// Set the task to false
let didWash = false
let didLawn = false
let didPull = false

// For the each service button, check if the task was not done yet.
// If not, then display the service and price of the service and
// update the total and display it in the ammount. Change didTASK to true
carWashBtn.addEventListener("click", function() {
    if (didWash === false) {
        taskLine.innerHTML += `<p>${taskArray[0].service}</p>`
        priceLine.innerHTML += `<p>$${taskArray[0].price}</p>`
        total += taskArray[0].price
        totalAmmount.textContent = `$${total}`
        didWash = true
    }
})
mainLawnBtn.addEventListener("click", function() {
    if (didLawn === false) {
        taskLine.innerHTML += `<p>${taskArray[1].service}</p>`
        priceLine.innerHTML += `<p>$${taskArray[1].price}</p>`
        total += taskArray[1].price
        totalAmmount.textContent = `$${total}`
        didLawn = true
    }
})
pullWeedBtn.addEventListener("click", function() {
    if (didPull === false) {
        taskLine.innerHTML += `<p>${taskArray[2].service}</p>`
        priceLine.innerHTML += `<p>$${taskArray[2].price}</p>`
        total += taskArray[2].price
        totalAmmount.textContent = `$${total}`
        didPull = true
    }
})

// The last button resets all the app, including the text content, total and didTASK to false
sendInvoiceBtn.addEventListener("click", function() {
    total = 0
    totalAmmount.textContent = ""
    taskLine.textContent = ""
    priceLine.textContent = ""
    didWash = false
    didLawn = false
    didPull = false
})

