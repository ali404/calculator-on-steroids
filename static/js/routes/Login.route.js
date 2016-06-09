import React from 'react'
import LoggedOut from './_helpers/LoggedOut.route'

import LoginInputContainer from '../components/Login.react'

export default class Login extends LoggedOut {
    constructor() {
        super()
    }

    render() {
        return (
            <div className="pure-g hero-form">
                <div className="pure-u-7-24 ">
                    <LoginInputContainer />
                </div>
            </div>
        )
    }
}
