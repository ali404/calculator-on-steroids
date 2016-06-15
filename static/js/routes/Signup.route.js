import React from 'react'
import LoggedOut from './_helpers/LoggedOut.route'

import SignupContainer from '../components/Signup/SignupContainer.react'

export default class Signup extends LoggedOut {
    constructor() {
        super()
    }

    render() {
        return (
            <div className="grid hero-form">
                <div className="grid-narrow">
                    <SignupContainer />
                </div>
            </div>
        )
    }
}
