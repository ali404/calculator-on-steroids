import React from "react"
import {Router, RouteHandler} from "react-router"
import Header from "./Header.react"
import UserStore from "../stores/UserStore"
import UserActions from "../actions/UserActions"
import BaseComponent from "./helpers/BaseComponent"

export default class App extends BaseComponent {

    constructor(props, context) {
        super(props, context)
    }

    render() {
        return (
            <div className="app">
                <Header />
                <main>
                    <RouteHandler />
                </main>
            </div>
        )
    }
}
