import React from 'react'
import LoggedOut from './_helpers/LoggedOut.route'

import SignupInputContainer from '../components/Signup.react'

export default class Signup extends LoggedOut {
    constructor() {
        super()
    }

    render() {
        return (
            <div className="pure-g hero-form">
                <div className="pure-u-7-24">
                    <SignupInputContainer />
                </div>
            </div>
        )
    }
}
