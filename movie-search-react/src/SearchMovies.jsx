import React, {useState} from "react"
import MovieCard from "./MovieCard"

export default function SearchMovies() {

    const [query, setQuery] = useState("")
    const [movies, setMovies] = useState([])

    const searchMovies = async (e) => {
        e.preventDefault()

        const url = `https://api.themoviedb.org/3/search/movie?api_key=08e97adcae4f03592fad9d24120b3ebd&language=en-US&query=${query}&page=1&include_adult=false`;

        try {
            const res = await fetch(url)
            const data = await res.json()
            setMovies(data.results)
        } catch(err) {
            console.error(err)
        }

    }

    return (
        <>
            <form className="form" onSubmit={searchMovies}>
                <label htmlFor="query" className="label">Search Movies</label>
                <input className="input" type="text" name="query" placeholder="Search Here"
                value={query} onChange={(e) => setQuery(e.target.value)}/>
                <button className="button" type="submit">Submit</button>
            </form>
            <div className="card-list">
                {movies.filter(movie => movie.poster_path).map(movie => (
                    <MovieCard movie={movie} key={movie.id}/>
                ))}
            </div>
        </>
    )
}