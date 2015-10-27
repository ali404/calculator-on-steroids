import React from "react"
import {Router, RouteHandler} from "react-router"
import Header from "./Header.react"
import UserStore from "../stores/UserStore"
import UserActions from "../actions/UserActions"

var getAppState = function() {
    return {
        user: UserStore.getUserDetails()
    }
}

var App = React.createClass({

    _user: {},

    getInitialState: function() {
        return getAppState()
    },

    componentWillMount: function() {
        UserActions.updateUserDetails()
        this._user = UserStore.getUserDetails()
        console.log(this._user)
    },

    componentDidMount: function() {
        UserStore.addChangeListener(this._onChange)
    },

    componentWillUnmount: function() {
        UserStore.removeChangeListener(this._onChange)
    },

    _onChange: function() {
        this.setState(getAppState())
    },

    render: function() {
        console.log(this.state.user)
        return (
            <div className="app">
                <Header user={this.state.user}/>
                <main>
                    <RouteHandler user={this.state.user} />
                </main>
            </div>
        )
    }
})

module.exports = App
