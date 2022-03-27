const usernameInput = document.getElementById("searchInput")

usernameInput.addEventListener("keyup", function(event) {
    let searchQuery = event.target.value.toLowerCase()
    console.log(searchQuery)

    let allNamesDOMCollection = []
    allNamesDOMCollection = document.getElementsByClassName("name")
    
    for ( let counter = 0; counter < allNamesDOMCollection.length; counter++) {
        const currentName = allNamesDOMCollection[counter].textContent.toLowerCase()
        console.log(currentName)
        if (currentName.includes(searchQuery)) {
            allNamesDOMCollection[counter].style.display = "block"
        } else {
            allNamesDOMCollection[counter].style.display = "none"
        }
    }
})

