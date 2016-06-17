import React from 'react'
import Base from '../_helpers/BaseComponent'

import classnames from 'classnames'

import {Link} from 'react-router'

export default class Signup extends Base {
    constructor() {
        super()
    }

    render() {
        // check if password matched
        let passwordMatched =
            this.props.password === this.props.repeatPassword

        // initialise classes
        let usernameClasses = classnames({
            'h5': true,
            'form-input': true,
            'color-input-red': this.props.validUsername === false
        })
        let passwordClasses = classnames({
            'h5': true,
            'form-input': true,
            'color-input-red': this.props.validPassword === false
                || !passwordMatched
        })
        let repeatPasswordClasses = classnames({
            'h5': true,
            'form-input': true,
            'color-input-red': this.props.validRepeatPassword === false
                || !passwordMatched
        })

        // initialise message and messageClass
        let message = ''
        let messageClasses = ''

        if(this.props.shouldMessageShow) {
            let messageTrue = (
                <Link to="/login">Account created, click here to login</Link>
            )

            message = {
                true: messageTrue,
                false: 'Something went wrong, please try again'
            }[this.props.isSignupSuccessful]

            messageClasses = classnames({
                'color-green': this.props.isSignupSuccessful === true,
                'color-red': this.props.isSignupSuccessful === false,
                'h6': true
            })
        }

        // initialise button classes and disabled state
        let signupDisabled = this.props.signupDisabled ? 'disabled' : ''

        let buttonOptions = {
            'className': 'form-submit h6',
            'onClick': this.props.onSignup
        }

        if(signupDisabled) {
            buttonOptions['disabled'] = 'disabled'
        }


        return (
            <div>
                <div className="hero-form--title">
                    <h1 className="h2">Signup</h1>
                    <p className={messageClasses}>
                        {message}
                    </p>
                </div>
                <input
                    onChange={this.props.onChangeInput}
                    value={this.props.username}
                    className={usernameClasses}
                    type="text" id="username"
                    name="username"
                    placeholder="Username..."
                />
                <input
                    onChange={this.props.onChangeInput}
                    value={this.props.password}
                    className={passwordClasses}
                    type="password"
                    name="password"
                    placeholder="Password..." />
                <input
                    onChange={this.props.onChangeInput}
                    value={this.props.repeatPassword}
                    className={repeatPasswordClasses}
                    type="password"
                    name="repeatPassword"
                    placeholder="Repeat password..." />
                <button
                    {...buttonOptions}>
                    Signup
                </button>
            </div>
        )
    }
}
