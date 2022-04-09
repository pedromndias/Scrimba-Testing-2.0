const btn = document.querySelector("button")

let colorScheme = document.getElementById("color-scheme")
let colorInput = document.getElementById("color-input")
let colorForm = document.getElementById("color-form")

let colorColumn1 = document.getElementById("color-column-1")
let colorColumn2 = document.getElementById("color-column-2")
let colorColumn3 = document.getElementById("color-column-3")
let colorColumn4 = document.getElementById("color-column-4")
let colorColumn5 = document.getElementById("color-column-5")

let hexColumn1 = document.getElementById("hex-column-1")
let hexColumn2 = document.getElementById("hex-column-2")
let hexColumn3 = document.getElementById("hex-column-3")
let hexColumn4 = document.getElementById("hex-column-4")
let hexColumn5 = document.getElementById("hex-column-5")

function renderColors(arr){
    hexColumn1.innerText = arr[0].hex.value
    hexColumn2.innerText = arr[1].hex.value
    hexColumn3.innerText = arr[2].hex.value
    hexColumn4.innerText = arr[3].hex.value
    hexColumn5.innerText = arr[4].hex.value

    colorColumn1.style.background = arr[0].hex.value
    colorColumn2.style.background = arr[1].hex.value
    colorColumn3.style.background = arr[2].hex.value
    colorColumn4.style.background = arr[3].hex.value
    colorColumn5.style.background = arr[4].hex.value
}

colorForm.addEventListener("submit", function(e) {
    e.preventDefault()
    console.log(colorScheme.value)
    let colorPicked = colorInput.value.substring(1, 7)
    console.log(colorPicked)

    fetch(`https://www.thecolorapi.com/scheme?hex=${colorPicked}&mode=${colorScheme.value}&count=6`)
        .then(res => res.json())
        .then(data => {
            renderColors(data.colors)
        })
})