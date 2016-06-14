import React from 'react'
import Base from '../_helpers/BaseComponent'
import {browserHistory} from 'react-router'

import Login from './Login.react'

import UserActions from '../../actions/UserActions'
import UserStore from '../../stores/UserStore'

export default class LoginContainer extends Base {
    constructor() {
        super()
        this._bind(
            '_getLoginState',
            '_onChangeInput',
            '_onLogin',
            '_onChange'
        )

        this.state = this._getLoginState()
        this.state.username = ''
        this.state.password = ''
    }

    _getLoginState() {
        return {
            loginState: UserStore.getLoginState(),
            message: UserStore.getLoginMessage()
        }
    }

    componentDidMount() {
        UserStore.addChangeListener(this._onChange)
    }

    componentWillUnmount() {
        UserStore.removeChangeListener(this._onChange)
    }

    _onChange() {
        this.setState(this._getLoginState())
        // if the login was successfull
        if("success" === this.state.loginState || UserStore.isLoggedIn()) {
            browserHistory.push("/profile")
        }
    }

    render() {
        return (
            <Login
                onChangeInput={this._onChangeInput}
                onLogin={this._onLogin}
                message={this.state.message}
                username={this.state.username}
                password={this.state.password}
            />
        )
    }

    _onChangeInput(e) {
        let state = {}
        state[e.target.name] = e.target.value
        this.setState(state)
    }

    _onLogin(e) {
        UserActions.login({
            username: this.state.username,
            password: this.state.password
        })
    }
}
