import React from "react"
import ReactDOM from "react-dom"

import {Router, Route, IndexRoute, browserHistory, withRouter} from 'react-router'

import App from "./components/App.react"
import Login from "./routes/Login.route"
import Signup from "./routes/Signup.route"
import Profile from "./routes/Profile.route"
import Calculator from "./routes/Calculator.route"

import UserStore from './stores/UserStore'

function requireLogin(nextState, replace) {
    if(!UserStore.isLoggedIn()) {
        replace({
            pathname: '/login',
            state: {
                nextPathname: nextState.location.pathname
            }
        })
    }
}

function requireLogout(nextState, replace) {
    if(UserStore.isLoggedIn()) {
        replace({
            pathname: '/profile',
            state: {
                nextPathname: nextState.location.pathname
            }
        })
    }
}

var routes = (
    <Router history={browserHistory}>
        <Route component={withRouter(App)}>
            <Route path="/" component={Calculator} />
            <Route
                path="/login"
                component={Login}
                onEnter={requireLogout} />
            <Route
                path="/signup"
                component={Signup}
                onEnter={requireLogout} />
            <Route
                path="/profile"
                component={Profile}
                onEnter={requireLogin} />
        </Route>
    </Router>
)

ReactDOM.render(routes, document.getElementById('calculator-on-steroids'))
