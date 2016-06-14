import React from 'react'
import LoggedOut from './_helpers/LoggedOut.route'

import SignupContainer from '../components/Signup/SignupContainer.react'

export default class Signup extends LoggedOut {
    constructor() {
        super()
    }

    render() {
        return (
            <div className="pure-g hero-form">
                <div className="pure-u-7-24">
                    <SignupContainer />
                </div>
            </div>
        )
    }
}
