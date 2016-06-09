import React from "react"
import ReactDOM from "react-dom"

import {Router, Route, IndexRoute, browserHistory} from 'react-router'

import App from "./components/App.react"
import Login from "./components/Login.react"
import Signup from "./components/Signup.react"
import Profile from "./components/Profile.react"
import Functions from "./components/SharedFunctions.react"
import Calculator from "./components/Calculator.react"

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
