import React from 'react'
import Base from '../../components/_helpers/BaseComponent'

import UserStore from '../../stores/UserStore'

import {browserHistory} from 'react-router'

export default class LoggedIn extends Base {
    constructor() {
        super()
    }

    static willTransitionTo() {
        console.log(1)
        if(!UserStore.isLoggedIn()) {
            browserHistory.push('/login')
        }
    }
}
