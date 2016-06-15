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
                <div className="pure-u-7-24 ">
                    <LoginContainer />
                </div>
            </div>
        )
    }
}
