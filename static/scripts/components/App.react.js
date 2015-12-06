import React from "react"
import {Router, RouteHandler} from "react-router"
import Header from "./Header.react"
import UserActions from "../actions/UserActions"
import BaseComponent from "./helpers/BaseComponent"
import AppStore from "../stores/AppStore"

export default class App extends BaseComponent {

    constructor(props, context) {
        super(props, context)
        this._bind(
            "_getAppState",
            "_onChange"
        )
        this.state = this._getAppState()
    }

    _getAppState() {
        return AppStore.getAppState()
    }

    componentDidMount() {
        AppStore.addChangeListener(this._onChange)
    }

    componentWillUnmount() {
        AppStore.removeChangeListener(this._onChange)
    }

    _onChange() {
        this.setState(this._getAppState)
    }

    render() {
        return (
            <div className={"app " + this.state.navClass}>
                <Header />
                <main>
                    <RouteHandler />
                </main>
            </div>
        )
    }
}
