import React from 'react'
import LoggedIn from './_helpers/LoggedIn.route'

import UserStore from '../stores/UserStore'
import UserActions from '../actions/UserActions'

import FunctionsDisplayerContainer
    from '../components/FunctionsDisplayer/FunctionsDisplayerContainer.react'

import {Link} from 'react-router'

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
        let message = ''
        if(this.state.isLoggedIn) {
            message = (
                <div className="h4">Hello {this.state.username}</div>
            )
        }
        else {
            message = (
                <div>
                    <div className="h4 profile-title">Hello unknown user</div>
                    <Link to="/login" className="h6 color-blue profile-link">
                        You are not logged in. If you want your functions to be stored on cloud, you should log in
                    </Link>
                </div>
            )
        }

        return (
            <div className="grid">
                <div className="grid-narrow">
                    <div className="profile">
                        <i
                            className="material-icons color-blue profile-logo">
                            bubble_chart
                        </i>
                        {message}
                    </div>
                    <FunctionsDisplayerContainer />
                </div>
            </div>
        )
    }
}
