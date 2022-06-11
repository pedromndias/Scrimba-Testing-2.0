import React from "react";
import {Switch, Route, Link} from "react-router-dom"
import About from "./About";
import Services from "./Services";
import ServiceDetail from "./ServiceDetail";
import Home from "./Home";

function App() {
    return(
        <div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/services">Services</Link>
            </nav>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/about">
                    <About />
                </Route>
                <Route exact path="/services/">
                    <Services />
                </Route>
                <Route path="/services/:serviceId">
                    <ServiceDetail />
                </Route>
            </Switch>


        </div>
    )
}

export default App