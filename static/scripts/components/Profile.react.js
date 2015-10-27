import React from "react"
import {Navigation} from "react-router"
import UserStore from "../stores/UserStore"
import UserActions from "../actions/UserActions"

var Profile = React.createClass({
    mixins: [Navigation],

    getInitialState: function() {
        return this.props.user
    },

    render: function() {
        return (
            <div>Hello {this.props.user.username}</div>
        )
    }
})

module.exports = Profile
