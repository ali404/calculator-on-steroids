import React from "react"
import {Navigation} from "react-router"
import UserStore from "../stores/UserStore"
import UserActions from "../actions/UserActions"

var Profile = React.createClass({
    mixins: [Navigation],

    willTransitionTo: function() {
        if(!UserStore.isLoggedIn()) {
            this.transitionTo("calculator")
        }
    },

    getInitialState: function() {
        return this.props.user
    },

    componentWillMount: function() {
        if(!UserStore.isLoggedIn()) {
            this.transitionTo("calculator")
        }
    },

    componentDidMount: function() {
        UserStore.addChangeListener(this._onChange)
    },

    componentWillUnmount: function() {
        UserStore.removeChangeListener(this._onChange)
    },

    _onChange: function() {
        if(!UserStore.isLoggedIn()) {
            this.transitionTo("calculator")
        }
    },

    render: function() {
        return (
            <div>Hello {UserStore.getUserDetails().username}</div>
        )
    }
})

module.exports = Profile
