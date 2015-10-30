import React from "react"
import {Navigation} from "react-router"
import UserStore from "../stores/UserStore"
import UserActions from "../actions/UserActions"
import BaseComponent from "./helpers/BaseComponent"

var getLoginState = function() {
    return {
        loginState: UserStore.getLoginState(),
        message: UserStore.getLoginMessage()
    }
}

export default class Login extends BaseComponent {

    constructor(props, context) {
        super(props, context)
        this._bind(
            "_onChange",
            "_updateUsername",
            "_updatePassword",
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
        var message = this.state.message
        return (
            <div className="pure-g hero-form">
                <div className="pure-u-7-24 ">
                    <div className="hero-form--title">
                        <h1 className="h2">Login</h1>
                        <p className="h6">{message}</p>
                    </div>
                    <div className="">
                        <div className="">
                            <div className="">
                                <input onChange={this._updateUsername} value={this.state.username} className="form-input h5" type="text" id="username" name="username" placeholder="Username..." />
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="">
                            <div className="">
                                <input onChange={this._updatePassword} value={this.state.password} className="form-input h5" type="password" id="password" name="password" placeholder="Password..." />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div onClick={this._loginUser} value="Login" className="form-submit h6">Login</div>
                    </div>
                </div>
            </div>
        )
    }

    _updateUsername(event) {
        this.setState({username: event.target.value})
    }

    _updatePassword(event) {
        this.setState({password: event.target.value})
    }

    _loginUser() {
        UserActions.login({
            username: this.state.username,
            password: this.state.password
        })
        UserActions.getUserDetails()
    }
}

Login.contextTypes = {
    router: function contextType() {
        return React.PropTypes.func.isRequired
    }
}
