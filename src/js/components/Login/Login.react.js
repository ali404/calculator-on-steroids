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
                        <p className={this.props.messageClass + " h6"}>
                            {this.props.message}
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
                <div {...buttonOptions}>
                    Login
                </div>
            </div>
        )
    }
}
