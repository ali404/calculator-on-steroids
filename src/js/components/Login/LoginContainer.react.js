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
            '_onChange',
            '_validateField',
            '_validateUsername',
            '_validatePassword'
        )

        this.state = this._getLoginState()

        this.state.username = ''
        this.state.password = ''
        this.state.validUsername = undefined
        this.state.validPassword = undefined
    }

    _getLoginState() {
        return {
            isLoginSuccessful: UserStore.getLoginState()
        }
    }

    componentDidMount() {
        UserStore.addChangeListener(this._onChange)
    }

    componentWillUnmount() {
        UserStore.deleteLoginState()
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
        let loginDisabled = !this.state.validUsername
            || !this.state.validPassword
            || this.state.username == ''
            || this.state.password == ''

        return (
            <Login
                onChangeInput={this._onChangeInput}
                onLogin={this._onLogin}
                isLoginSuccessful={this.state.isLoginSuccessful}
                username={this.state.username}
                validUsername={this.state.validUsername}
                password={this.state.password}
                validPassword={this.state.validPassword}
                loginDisabled={loginDisabled}
            />
        )
    }

    _onChangeInput(e) {
        let state = {}
        state[e.target.name] = e.target.value

        // valid + U + sername
        // valid + P + assword
        state['valid'
            + e.target.name[0].toUpperCase()
            + e.target.name.slice(1)]
            = this._validateField(e.target.name, e.target.value)

        this.setState(state)
    }

    _onLogin(e) {
        UserActions.login({
            username: this.state.username,
            password: this.state.password
        })
    }

    _validateField(fieldName, fieldValue) {
        if(fieldName === 'username') {
            return this._validateUsername(fieldValue)
        }
        else if(fieldName === 'password') {
            return this._validatePassword(fieldValue)
        }
    }

    _validateUsername(username) {
        return UserStore.validateUsername(username)
    }

    _validatePassword(password) {
        return UserStore.validatePassword(password)
    }
}
