import React from "react"
import {Router, Navigation} from "react-router"
import BaseComponent from "./BaseComponent"
import UserStore from "../../stores/UserStore"

export default class AuthenticatedComponent extends BaseComponent {

    constructor(props, context) {
        super(props, context)
        this._bind(
            "_onChange",
            "_restrictAccess"
        )
        this._restrictAccess()
    }

    componentDidMount() {
        UserStore.addChangeListener(this._onChange)
    }

    componentWillUnmount() {
        UserStore.removeChangeListener(this._onChange)
    }

    _onChange() {
        this._restrictAccess()
    }

    _restrictAccess() {
        if(!UserStore.isLoggedIn()) {
            this.context.router.transitionTo("login")
        }
    }
}

AuthenticatedComponent.contextTypes = {
    router: function contextType() {
        return React.PropTypes.func.isRequired
    }
}
