import React from "react"
import Base from "./_helpers/BaseComponent"
import classnames from 'classnames'

import Header from "./Header.react"
import AppStore from "../stores/AppStore"

import UserActions from '../actions/UserActions'
import FunctionActions from '../actions/FunctionActions'

export default class App extends Base {

    constructor() {
        super()
        this._bind(
            "_getAppState",
            "_onChange"
        )

        UserActions.getUserDetails()
        FunctionActions.getFunctions()

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
        let appClasses = classnames({
            'app': true,
             'nav-expanded': this.state.isNavigationExpanded,
             'nav-collapsed': !this.state.isNavigationExpanded
        })

        return (
            <div className={appClasses}>
                <Header />
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}
