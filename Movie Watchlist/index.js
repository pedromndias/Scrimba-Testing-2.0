// omdbapi.com key: 5fa41c8e
// NOTE: There is a bug.. when rendering the movies on the index page the order is a bit random, so the id's created will not match the movies added to the Watchlist. To be fixed..

// Let's grab the elements from our HTML
const movieForm = document.getElementById("movie-form")
const inputField = document.getElementById("input-field")

const addToWatchlistBtn = document.getElementsByClassName("add-to-watchlist-btn")

const movieContainer = document.getElementById("movie-container")


const moviePoster = document.getElementById("movie-poster")

const searchingFor = document.getElementById("searching-for")

// Let's create an array to populate with the movie's search results
let movieArray = []
// We will also create an updated array with all the parameters:
let ultimateMoviesArray = []

// Let's create a function to show the content of the moviesArray on the HTML of our page
async function renderMovies() {
    searchingFor.textContent = await `${inputField.value}`
    for (let movie of movieArray) {
         
         fetch(`http://www.omdbapi.com/?apikey=5fa41c8e&i=${movie.imdbID}`)
            .then(res => res.json())
            .then(data => {
                
            
         movieContainer.innerHTML += `
         <div class="container-each-movie">
                    <div class="div-for-image">
                        <img id="movie-poster" src="${movie.Poster}" alt="">
                    </div>
                    <div class="div-for-content">
                        <div class="content-header">
                            <h2>${movie.Title}</h2>
                            <p>⭐${data.Ratings[0].Value}</p>
                        </div>
                        <div class="content-subheader">
                            <p class="time">${data.Runtime}</p>
                            <p class="genre">${data.Genre}</p>
                            <div class="add-to-watchlist">
                                <button class="add-to-watchlist-btn" id=${movieArray.indexOf(movie)} onclick="addToLocalStorage(this.id)">+</button>
                                <p>Watchlist</p>
                            </div>
                        </div>
                        <div class="description">
                            <p class="description-text">${data.Plot}</p>
                        </div>
                    </div>
                </div>
         `
         ultimateMoviesArray.push({
             id: movieArray.indexOf(movie),
             image: movie.Poster,
             title: movie.Title,
             rating: data.Ratings[0].Value,
             runtime: data.Runtime,
             genre: data.Genre,
             plot: data.Plot
         })
        })
        
    }
    console.log(ultimateMoviesArray)
}

// Let's create a function to save the data into local storage, when the buttons are clicked
function addToLocalStorage(id) {
    localStorage.setItem(ultimateMoviesArray[id].id, JSON.stringify(ultimateMoviesArray[id]))
}


// Let's create an event listener for our form:
movieForm.addEventListener("submit", function(e) {
    e.preventDefault()
    console.log(inputField.value)
    // Let's create our fetch with the value we get from the inputField
    fetch(`http://www.omdbapi.com/?apikey=5fa41c8e&s=${inputField.value}`)
    .then(res => res.json())
    .then(data => {
        
        // Now that we have the data from the fetch, we add it to our div's in our HTML. We should show the movie's details. We should also delete the dummy data.
        movieContainer.style.display = "block"
        movieContainer.innerHTML = ""

        // Let's save the search results in our movieArray and call our renderMovies function
        movieArray = data.Search
        renderMovies()
        // We should also clear the input value
        inputField.value = ""

    
    })
})

