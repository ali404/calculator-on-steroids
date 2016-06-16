import React from 'react'
import Base from '../_helpers/BaseComponent'

import classnames from 'classnames'

export default class Login extends Base {
    constructor() {
        super()
    }

    render() {
        let usernameClasses = classnames({
            'h5': true,
            'form-input': true,
            'color-input-red': this.props.validUsername === false
        })

        let passwordClasses = classnames({
            'h5': true,
            'form-input': true,
            'color-input-red': this.props.validPassword === false
        })

        let message = {
            true: 'You are now logged in!',
            false: 'Something went wrong, please try again'
        }[this.props.isLoginSuccessful]

        let messageClasses = classnames({
            'color-green': this.props.isLoginSuccessful === true,
            'color-red': this.props.isLoginSuccessful === false,
            'h6': true
        })

        let loginDisabled = this.props.loginDisabled ? 'disabled' : ''

        let buttonOptions = {
            'className': 'form-submit h6',
            'onClick': this.props.onLogin,
        }

        if(loginDisabled) {
            buttonOptions['disabled'] = 'disabled'
        }

        return (
            <div>
                <div className="hero-form--title">
                    <h1 className="h2">Login</h1>
                        <p className={messageClasses}>
                            {message}
                        </p>
                </div>
                <input
                    onChange={this.props.onChangeInput}
                    value={this.props.username}
                    className={usernameClasses}
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username..."
                />
                <input
                    onChange={this.props.onChangeInput}
                    value={this.props.password}
                    className={passwordClasses}
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password..."
                />
                <button {...buttonOptions}>
                    Login
                </button>
            </div>
        )
    }
}
