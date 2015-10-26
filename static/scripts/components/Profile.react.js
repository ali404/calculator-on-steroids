import React from "react"
import {Navigation} from "react-router"
import UserStore from "../stores/UserStore"
import UserActions from "../actions/UserActions"

var Profile = React.createClass({
    mixins: [Navigation],

    componentWillMount: function() {
        UserActions.getUserDetails()
        if(!UserStore.isLoggedIn()) {
            this.transitionTo("calculator")
        }
    },

    render: function() {
        var {username} = this.props.params
        console.log(username)
        return (
            <div>Hello Profile</div>
        )
    }
})

module.exports = Profile
