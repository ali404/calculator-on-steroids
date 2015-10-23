import React from "react"
import ReactDom from "react-dom"
import Router from "react-router"
import { DefaultRoute, Route } from "react-router"

import App from "./components/App.react"
import Login from "./components/Login.react"
import Signup from "./components/Signup.react"
import Profile from "./components/Profile.react"
import Logout from "./components/Logout.react"
import Functions from "./components/Functions.react"

var routes = (
    <Route name="app" path="/" handler={App}>
        <Route name="login" path="/login" handler={Login}></Route>
        <Route name="signup" path="/signup" handler={Signup}></Route>
        <Route name="profile" path="/profile" handler={Profile}></Route>
        <Route name="logout" path="/logout" handler={Logout}></Route>
        <Route name="functions" path="/functions" handler={Functions}></Route>
    </Route>
)

Router.run(routes, function(Handler) {
    React.render(<Handler />, document.body)
})
