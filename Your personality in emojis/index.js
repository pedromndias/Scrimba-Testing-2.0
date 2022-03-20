// Create starting array
const myEmojis = ["👨‍💻", "⛷", "🍲"]

// Get all the elements and buttons from HTML:
const emojiContainer = document.getElementById("emoji-container")
const emojiInput = document.getElementById("emoji-input")
const pushBtn = document.getElementById("push-btn")
const unshiftBtn = document.getElementById("unshift-btn")
const popBtn = document.getElementById("pop-btn")
const shiftBtn = document.getElementById("shift-btn")

// Create function to render the images on the array as spans on the container
function renderEmojis() {
    emojiContainer.innerHTML = ""
    for (let i = 0; i < myEmojis.length; i++) {
        const emoji = document.createElement("span")
        emoji.textContent = myEmojis[i]
        emojiContainer.append(emoji)
    }
}
// Call renderEmojis() function
renderEmojis()

// Create event listener for the push button
pushBtn.addEventListener("click", function() {
    // Only push emoji if there is anything on the input:
    if(emojiInput.value) {
        myEmojis.push(emojiInput.value)
        // Clear the input field:
        emojiInput.value = ""
        // Call the renderEmoji() function:
        renderEmojis()
    }
})

// Create event listener for the unshift button
unshiftBtn.addEventListener("click", function() {
    if(emojiInput.value) {
        myEmojis.unshift(emojiInput.value)
        emojiInput.value = ""
        renderEmojis()
    }
})

// Create event listener for the pop button
popBtn.addEventListener("click", function() {
    myEmojis.pop()
    renderEmojis()
})

// Create event listener for the shift button
shiftBtn.addEventListener("click", function() {
    myEmojis.shift()
    renderEmojis()
})