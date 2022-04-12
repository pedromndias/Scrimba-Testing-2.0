// NOTE: The page should update when removing the movies from the watchlist but we have to manually update it. To be fixed..

const movieContainer = document.getElementById("movie-container")

const startExploring = document.getElementById("start-exploring")

function renderFromLocalstorage() {
    startExploring.style.display = "none"
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        console.log(`${key}: ${localStorage.getItem(key)}`);
        const localData = JSON.parse(localStorage.getItem(key))

        movieContainer.innerHTML += `
        <div class="container-each-movie">
                    <div class="div-for-image">
                        <img id="movie-poster" src="${localData.image}" alt="">
                    </div>
                    <div class="div-for-content">
                        <div class="content-header">
                            <h2>${localData.title}</h2>
                            <p>⭐${localData.rating}</p>
                        </div>
                        <div class="content-subheader">
                            <p class="time">${localData.runtime}</p>
                            <p class="genre">${localData.genre}</p>
                            <div class="add-to-watchlist">
                                <button class="add-to-watchlist-btn" id=${localData.id} onclick="removeFromLocalStorage(this.id)">-</button>
                                <p>Watchlist</p>
                            </div>
                        </div>
                        <div class="description">
                            <p class="description-text">${localData.plot}</p>
                        </div>
                    </div>
                </div>`
    }
    // 
}

function removeFromLocalStorage(id) {
    localStorage.removeItem(id)
    renderFromLocalstorage()
}

renderFromLocalstorage()