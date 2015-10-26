import React from "react"
import UserStore from "../stores/UserStore"
import UserActions from "../actions/UserActions"

var Login = React.createClass({

    getInitialState: function() {
        return {
            username: "",
            password: ""
        }
    },

    render: function() {
        return (
            <div className="pure-g hero-form">
                <div className="pure-u-7-24 ">
                    <div className="hero-form--title">
                        <h1 className="h2">Login</h1>
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
