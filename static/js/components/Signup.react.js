import React from "react"
import LoggedOutComponent from "./_helpers/LoggedOutComponent"
import UserStore from "../stores/UserStore"
import UserActions from "../actions/UserActions"

var getSignupState = function() {
    return {
        signupState: UserStore.getSignupState(),
        signupMessage: UserStore.getSignupMessage()
    }
}

export default class Signup extends LoggedOutComponent {

    constructor(props, context) {
        super(props, context)
        this._bind(
            "_onChange",
            "_signup",
            "_updateUsername",
            "_updatePassword"
        )
    }

    componentDidMount() {
        UserStore.addChangeListener(this._onChange)
    }

    componentWillUnmount() {
        UserStore.removeChangeListener(this._onChange)
    }

    _onChange() {
        this.setState(getSignupState())
        if("success" === this.state.signupState) {
            this.context.router.transitionTo("profile")
        }
    }

    render() {
        return (
            <div>
                <div className="hero-form--title">
                    <h1 className="h2">Signup</h1>
                </div>
                <input onChange={this._updateUsername} className="form-input h5" type="text" id="username" name="username" placeholder="Username..." />
                <input onChange={this._updatePassword} className="form-input h5" type="password" id="password" name="password" placeholder="Password..." />
                <div onClick={this._signup} className="form-submit h6">Signup</div>
            </div>
        )
    }

    _updateUsername(event) {
        this.setState({
            username: event.target.value
        })
    }

    _updatePassword(event) {
        this.setState({
            password: event.target.value
        })
    }

    _signup() {
        UserActions.signup({
            username: this.state.username,
            password: this.state.password
        })
    }
}

Signup.contextTypes = {
    router: function contextType() {
        return React.PropTypes.func.isRequired
    }
}
