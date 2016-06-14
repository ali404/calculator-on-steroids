import React from 'react'
import Base from '../_helpers/BaseComponent'

export default class Signup extends Base {
    constructor() {
        super()
    }

    render() {
        return (
            <div>
                <div className="hero-form--title">
                    <h1 className="h2">Signup</h1>
                    <p className="h6">
                        {this.props.message}
                    </p>
                </div>
                <input
                    onChange={this.props.onChangeInput}
                    value={this.props.username}
                    className="form-input h5"
                    type="text" id="username"
                    name="username"
                    placeholder="Username..."
                />
                <input
                    onChange={this.props.onChangeInput}
                    value={this.props.password}
                    className="form-input h5"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password..." />
                <div
                    onClick={this.props.onSignup}
                    className="form-submit h6">
                    Signup
                </div>
            </div>
        )
    }
}
