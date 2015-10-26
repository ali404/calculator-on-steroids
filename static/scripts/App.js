import React from "react"
import ReactDom from "react-dom"
import Router from "react-router"

var Route = Router.Route
var IndexRoute = Router.IndexRoute

import App from "./components/App.react"
import Login from "./components/Login.react"
import Signup from "./components/Signup.react"
import Profile from "./components/Profile.react"
import Logout from "./components/Logout.react"
import Functions from "./components/SharedFunctions.react"
import Calculator from "./components/Calculator.react"

var routes = (
    <Route name="app" handler={App}>
        <Route name="calculator" path="/" handler={Calculator} />
        <Route name="login" path="/login" handler={Login} />
        <Route name="signup" path="/signup" handler={Signup} />
        <Route name="profile" path="/user/:username" handler={Profile} />
        <Route name="logout" path="/logout" handler={Logout} />
        <Route name="functions" path="/functions" handler={Functions} />
    </Route>
)

Router.run(routes, function(Handler) {
    React.render(<Handler />, document.body)
})
