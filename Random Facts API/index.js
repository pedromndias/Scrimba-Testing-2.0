const factP = document.getElementById("factParagraph")
const btn = document.getElementById("newFact")

btn.addEventListener("click", () => {
    fetch("https://uselessfacts.jsph.pl/random.json?language=en")
    .then(response => {
        if(!response.ok) {
            throw new Error(response.status);
        } else {
            return response.json()
        }
    })
    .then(data => {
        factP.innerHTML = `${data.text}`
    })
    .catch(error => console.log(error))
})
