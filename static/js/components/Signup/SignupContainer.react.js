import React from 'react'
import Base from '../_helpers/BaseComponent'
import {browserHistory} from 'react-router'

import UserStore from '../../stores/UserStore'
import UserActions from '../../actions/UserActions'

import Signup from './Signup.react'

export default class SignupContainer extends Base {
    constructor() {
        super()
        this._bind(
            '_onChange',
            '_onChangeInput',
            '_onSignup',
            '_getSignupState'
        )

        this.state = this._getSignupState()
        this.state.username = ''
        this.state.password = ''
    }

    _getSignupState() {
        return {
            signupState: UserStore.getSignupState(),
            message: UserStore.getSignupMessage()
        }
    }

    componentDidMount() {
        UserStore.addChangeListener(this._onChange)
    }

    componentWillUnmount() {
        UserStore.removeChangeListener(this._onChange)
    }

    _onChange() {
        this.setState(this._getSignupState())
    }

    render() {
        return (
            <Signup
                onChangeInput={this._onChangeInput}
                onSignup={this._onSignup}
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

    _onSignup() {
        UserActions.signup({
            username: this.state.username,
            password: this.state.password
        })
    }
}
