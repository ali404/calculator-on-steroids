import React from "react"
import Base from "../_helpers/BaseComponent"

import AppStore from "../../stores/AppStore"

import App from './App.react'

export default class AppContainer extends Base {

    constructor() {
        super()
        this._bind(
            "_getAppState",
            "_onChange"
        )
        this.state = this._getAppState()
    }

    _getAppState() {
        return {
            isNavigationExpanded: AppStore.getNavigationState()
        }
    }

    componentDidMount() {
        AppStore.addChangeListener(this._onChange)
    }

    componentWillUnmount() {
        AppStore.removeChangeListener(this._onChange)
    }

    _onChange() {
        this.setState(this._getAppState())
    }

    render() {
        return (
            <App
                isNavigationExpanded={this.state.isNavigationExpanded}
                children={this.props.children}
            />
        )
    }
}
