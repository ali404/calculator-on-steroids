import React from 'react'
import LoggedIn from './_helpers/LoggedIn.route'

import UserStore from '../stores/UserStore'
import UserActions from '../actions/UserActions'

export default class Profile extends LoggedIn {
    constructor() {
        super()
        this._bind(
            '_onChange'
        )

        this.state = this._getProfileState()
    }

    _getProfileState() {
        return UserStore.getUserDetails()
    }

    componentDidMount() {
        UserStore.addChangeListener(this._onChange)
    }

    componentWillUnmount() {
        UserStore.removeChangeListener(this._onChange)
    }

    _onChange() {
        this.setState(this._getProfileState())
    }

    render() {
        return (
            <div className="grid">
                <div className="h6">Hello {this.state.username}</div>
            </div>
        )
    }
}
