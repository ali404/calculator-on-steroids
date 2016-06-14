import React from "react"
import {Navigation} from "react-router"
import UserStore from "../stores/UserStore"
import UserActions from "../actions/UserActions"
import BaseComponent from "./_helpers/BaseComponent"

var getLoginState = function() {
    return {
        loginState: UserStore.getLoginState(),
        message: UserStore.getLoginMessage()
    }
}

export default class Login extends BaseComponent {

    constructor() {
        super()
        this._bind(
            "_onChange",
            '_onChangeInput',
            "_loginUser"
        )

        this.state = getLoginState()
    }

    willTransitionTo() {
        if(UserStore.isLoggedIn()) {

            this.context.router.transitionTo("profile")
        }
        console.log("fired from login: from willTransitionTo")
    }

    componentWillMount() {
        if(UserStore.isLoggedIn()) {
            this.context.router.transitionTo("profile")
        }
    }

    componentDidMount() {
        UserStore.addChangeListener(this._onChange)
    }

    componentWillUnmount() {
        UserStore.removeChangeListener(this._onChange)
    }

    _onChange() {
        this.setState(getLoginState())
        // if the login was successfull
        if("success" === this.state.loginState || UserStore.isLoggedIn()) {
            this.context.router.transitionTo("profile")
        }
    }

    render() {

        return (
            <div>
                <div className="hero-form--title">
                    <h1 className="h2">Login</h1>
                        <p className="h6">
                            {this.state.message}
                        </p>
                </div>
                <input
                    onChange={this._onChangeInput}
                    className="form-input h5"
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username..."
                />
                <input
                    onChange={this._onChangeInput}
                    className="form-input h5"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password..."
                />
                <div
                    onClick={this._loginUser}
                    value="Login"
                    className="form-submit h6">
                    Login
                </div>
            </div>
        )
    }

    _onChangeInput(e) {
        let state = {}
        state[e.target.name] = e.target.value
        this.setState(state)
    }

    _loginUser() {
        UserActions.login({
            username: this.state.username,
            password: this.state.password
        })
        UserActions.getUserDetails()
    }
}
