import React from "react"
import {Navigation} from "react-router"
import UserStore from "../stores/UserStore"
import UserActions from "../actions/UserActions"

var getLoginState = function() {
    return {
        loginState: UserStore.getLoginState(),
        message: UserStore.getLoginMessage()
    }
}

var Login = React.createClass({
    mixins: [Navigation],

    getInitialState: function() {
        return {
            username: "",
            password: "",
            loginState: "",
            message: "",
        }
    },

    componentWillMount: function() {
        if(UserStore.isLoggedIn()) {
            this.transitionTo("profile")
        }
    },

    componentDidMount: function() {
        UserStore.addChangeListener(this._onChange)
    },

    componentWillUnmount: function() {
        UserStore.removeChangeListener(this._onChange)
    },

    _onChange: function() {
        this.setState(getLoginState())
        if("success" === this.state.loginState) {
            this.transitionTo("profile")
        }
    },

    render: function() {
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
    },

    _updateUsername: function(event) {
        this.setState({username: event.target.value})
    },

    _updatePassword: function(event) {
        this.setState({password: event.target.value})
    },

    _loginUser: function() {
        UserActions.login({
            username: this.state.username,
            password: this.state.password
        })
    }
})

module.exports = Login
