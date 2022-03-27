const openBtn = document.getElementById("open-modal")
const overlay = document.getElementById("overlay")

openBtn.addEventListener("click", function() {
    overlay.style.display = "block"
})

const closeBtn = document.getElementById("close-modal")

closeBtn.addEventListener("click", function() {
    overlay.style.display = "none"
})