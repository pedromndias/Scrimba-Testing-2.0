// Let's import the data from our data.js file. It's important to update the HTML with <script src="index.js" type="module"></script> and use Live Server on VSCode.
import { catsData } from "./data.js";

// Now we grab all the variables we will use from the HTML file.

const emotionRadios = document.getElementById("emotion-radios")
const getImageBtn = document.getElementById("get-image-btn")
const gifsOnlyOption = document.getElementById("gifs-only-option")
const memeModalInner = document.getElementById("meme-modal-inner")
const memeModal = document.getElementById("meme-modal")
const memeModalCloseBtn = document.getElementById("meme-modal-close-btn")

// Let's set up the event listeners:
emotionRadios.addEventListener("change", highlightCheckedOption)

memeModalCloseBtn.addEventListener("click", closeModal)

getImageBtn.addEventListener("click", renderCat)


// The bext function get all the radio inputs and only highlight the one we select:
function highlightCheckedOption(e){
    const radios = document.getElementsByClassName("radio")
    for (let radio of radios) {
        radio.classList.remove("highlight")
    }
    document.getElementById(e.target.id).parentElement.classList.add("highlight")
}

// This function will close (hide) the modal:
function closeModal(){
    memeModal.style.display = "none"
}

// The next function will render the HTML to show the final cat as a meme:
function renderCat() {
    // It will get the return of the getSingleObject() function:
    const catObject = getSingleObject()
    memeModalInner.innerHTML = `
        <img 
        class="cat-img" 
        src="./images/${catObject.image}"
        alt="${catObject.alt}"
        >
    `
    memeModal.style.display = "flex"
}

// This function will return a single object from the total generated by getMatchingCatsArray() function:
function getSingleObject() {
    const catsArray = getMatchingCatsArray()

    if(catsArray.length === 1) {
        return catsArray[0]
    } else {
        const randomNumber = Math.floor(Math.random() * catsArray.length)
        return catsArray[randomNumber]
    }
}

// This next function filters the cats array with the selected emotion and isGif option:
function getMatchingCatsArray(){
    if(document.querySelector("input[type='radio']:checked")){
        const selectedEmotion = document.querySelector("input[type='radio']:checked").value
        const isGif = gifsOnlyOption.checked

        const matchingCatsArray = catsData.filter(function(cat){
            if(isGif){
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif
            } else {
                return cat.emotionTags.includes(selectedEmotion)
            }
        })
        return matchingCatsArray
    }
}

// The next function will get the emotions from the cats array:
function getEmotionsArray(cats) {
    const emotionsArray = []
    for (let cat of cats){
        for (let emotion of cat.emotionTags){
            if (!emotionsArray.includes(emotion)){
                emotionsArray.push(emotion)
            }
        }
    }
    return emotionsArray
}

// This final function will render all the emotions on the page:
function renderEmotionsRadios(cats) {
    let radioItems = ``
    const emotions = getEmotionsArray(cats)
    for (let emotion of emotions){
        radioItems += `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input
            type="radio"
            id="${emotion}"
            value="${emotion}"
            name="emotions"
            >
        </div>`
    }
    emotionRadios.innerHTML = radioItems
}

// Finally, we call the renderEmotionRadios with our catsData as an argument:
renderEmotionsRadios(catsData)