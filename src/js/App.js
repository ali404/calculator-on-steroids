import React from "react"
import ReactDOM from "react-dom"

import {Router, Route, IndexRoute, browserHistory} from 'react-router'

import App from "./components/App.react"
import Login from "./routes/Login.route"
import Signup from "./routes/Signup.route"
import Profile from "./routes/Profile.route"
import Calculator from "./routes/Calculator.route"

var routes = (
    <Router history={browserHistory}>
        <Route component={App}>
            <Route path="/" component={Calculator} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/profile" component={Profile} />
        </Route>
    </Router>
)

ReactDOM.render(routes, document.getElementById('calculator-on-steroids'))
