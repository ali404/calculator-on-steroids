import React from "react"
import {Navigation} from "react-router"
import UserStore from "../stores/UserStore"
import UserActions from "../actions/UserActions"
import AuthenticatedComponent from "./helpers/AuthenticatedComponent"

export default class Profile extends AuthenticatedComponent {

    constructor(props, context) {
        super(props, context)
        UserActions.getUserDetails()
        this.state = UserStore.getUserDetails()
    }

    render() {
        return (
            <div>Hello {this.state.username}</div>
        )
    }
}
