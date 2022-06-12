import React, {useState} from "react"
import {Link, Switch, Route, Redirect} from "react-router-dom"

function App () {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const privatePage =
        <div>
            <h1>Protected page, must be logged in to be here</h1>
            <button onClick={() => setIsLoggedIn(false)}>Log out</button>
        </div>


    return (
        <div>
            <Link to="/">Home</Link>
            <Link to="/private">Private</Link>

            <Switch>
                <Route exact path="/">
                    <h1>Home page, anyone is allowed here</h1>
                </Route>
                <Route path="/private">
                    {
                        isLoggedIn ?
                        privatePage :
                        <Redirect to="/login" />
                    }
                </Route>
                <Route path="/login">
                    <button onClick={() => setIsLoggedIn(true)}>Log in</button>
                </Route>
            </Switch>
        </div>
    )
}

export default App