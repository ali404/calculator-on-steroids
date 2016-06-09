import import React from 'react'
import Base from '../../components/_helpers/BaseComponent'
import UserStore from '../../store/UserStore'
import {browserHistory} from 'react-router'

export default class LoggedIn extends Base {
    constructor() {
        super()
        if(!UserStore.isLoggedIn()) {
            browserHistory.push('/login')
        }
    }
}
