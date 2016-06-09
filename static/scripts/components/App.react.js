import React from "react"
import BaseComponent from "./helpers/BaseComponent"

import Header from "./Header.react"
import UserActions from "../actions/UserActions"
import AppStore from "../stores/AppStore"

export default class App extends BaseComponent {

    constructor() {
        super()
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
                    {this.props.children}
                </main>
            </div>
        )
    }
}
