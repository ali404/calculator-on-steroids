import React from "react"
import Base from "./_helpers/BaseComponent"
import classnames from 'classnames'

import Header from "./Header.react"
import AppStore from "../stores/AppStore"

import UserActions from '../actions/UserActions'
import FunctionActions from '../actions/FunctionActions'

import EasyTransition from 'react-easy-transition'

export default class App extends Base {

    constructor() {
        super()
        this._bind(
            "_getAppState",
            "_onChange"
        )

        let ele = document.getElementById('init-loader')
        ele.className += ' exit'
        setTimeout(() => {
            ele.remove()
        }, 310)


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
                <Header location={this.props.location.pathname} />
                    <main>
                        <EasyTransition
                            path={this.props.location.pathname}
                            initialStyle={{opacity: 0}}
                            transition="opacity 0.2s ease-in"
                            finalStyle={{opacity: 1}}>
                            {this.props.children}
                        </EasyTransition>
                    </main>
            </div>
        )
    }
}
