// run:  npx create-react-app . +  install react-router-dom@5

import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router} from "react-router-dom"
import './index.css';

import { ContextProvider } from "./Context";
import App from "./App"

ReactDOM.render(
    <ContextProvider>
        <Router>
            <App />
        </Router>
    </ContextProvider>,
    document.getElementById("root")
)