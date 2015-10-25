import React from "react"
import Router from "react-router"

import Header from "./Header.react"

var RouteHandler = Router.RouteHandler

var App = React.createClass({
    render: function() {
        return (
            <div className="app">
                <Header />
                <main>
                    <RouteHandler />
                </main>
            </div>
        )
    }
})

module.exports = App
