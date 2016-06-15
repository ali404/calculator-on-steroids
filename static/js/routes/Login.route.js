import React from 'react'
import LoggedOut from './_helpers/LoggedOut.route'

import LoginContainer from '../components/Login/LoginContainer.react'

export default class Login extends LoggedOut {
    constructor() {
        super()
    }

    render() {
        return (
            <div className="grid hero-form">
                <div className="grid-narrow">
                    <LoginContainer />
                </div>
            </div>
        )
    }
}
