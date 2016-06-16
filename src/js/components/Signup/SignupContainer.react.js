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
            '_getSignupState',
            '_validateField',
            '_validateUsername',
            '_validatePassword'
        )

        this.state = this._getSignupState()

        this.state.username = ''
        this.state.password = ''
        this.state.repeatPassword = ''

        this.state.validUsername = undefined
        this.state.validPassword = undefined
        this.state.validRepeatPassword = undefined

        this.state.shouldMessageShow = false
    }

    _getSignupState() {
        return {
            isSignupSuccessful: UserStore.getSignupState()
        }
    }

    componentDidMount() {
        UserStore.addChangeListener(this._onChange)
    }

    componentWillUnmount() {
        UserStore.deleteSignupState()
        UserStore.removeChangeListener(this._onChange)
    }

    _onChange() {
        this.setState(this._getSignupState())

        if(this.state.isSignupSuccessful) {
            this.setState({
                'username': '',
                'password': '',
                'repeatPassword': '',
                'validUsername': undefined,
                'validPassword': undefined,
                'validRepeatPassword': undefined
            })
        }
    }

    render() {
        let signupDisabled = !this.state.validUsername
            || !this.state.validPassword
            || !this.state.validRepeatPassword
            || this.state.username == ''
            || this.state.password == ''
            || this.state.repeatPassword == ''
            || this.state.password !== this.state.repeatPassword

        return (
            <Signup
                onChangeInput={this._onChangeInput}
                onSignup={this._onSignup}
                isSignupSuccessful={this.state.isSignupSuccessful}
                shouldMessageShow={this.state.shouldMessageShow}
                username={this.state.username}
                validUsername={this.state.validUsername}
                password={this.state.password}
                validPassword={this.state.validPassword}
                repeatPassword={this.state.repeatPassword}
                validRepeatPassword={this.state.validRepeatPassword}
                signupDisabled={signupDisabled}
            />
        )
    }

    _onChangeInput(e) {
        let state = {}
        state[e.target.name] = e.target.value

        // valid + U + sername
        state['valid'
            + e.target.name[0].toUpperCase()
            + e.target.name.slice(1)]
            = this._validateField(e.target.name, e.target.value)
        
        state['shouldMessageShow'] = false

        // see /components/Login/Login.react.js
        // the same issue
        state['isSignupSuccessful'] = undefined


        this.setState(state)
    }

    _onSignup() {
        UserActions.signup({
            username: this.state.username,
            password: this.state.password
        })

        this.setState({
            'shouldMessageShow': true
        })
    }

    _validateField(fieldName, fieldValue) {
        if(fieldName === 'username') {
            return this._validateUsername(fieldValue)
        }
        else if(fieldName === 'password'
                || fieldName === 'repeatPassword') {
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
