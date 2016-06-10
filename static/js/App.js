import React from "react"
import ReactDOM from "react-dom"

import {Router, Route, IndexRoute, browserHistory} from 'react-router'

import App from "./routes/App.route"
import Login from "./routes/Login.route"
import Signup from "./routes/Signup.route"
import Profile from "./components/Profile.react"
import Functions from "./components/SharedFunctions.react"
import Calculator from "./routes/Calculator.route"

var routes = (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Calculator} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/profile" component={Profile} />
            <Route path="/functions" component={Functions} />
        </Route>
    </Router>
)

ReactDOM.render(routes, document.getElementById('calculator-on-steroids'))
