import React from "react"
import {Navigation} from "react-router"
import UserStore from "../stores/UserStore"

var Profile = React.createClass({
    mixins: [Navigation],

    componentWillMount: function() {
        if(!UserStore.isLoggedIn()) {
            this.transitionTo("calculator")
        }
    },

    render: function() {
        return (
            <div>Hello Profile</div>
        )
    }
})

module.exports = Profile
