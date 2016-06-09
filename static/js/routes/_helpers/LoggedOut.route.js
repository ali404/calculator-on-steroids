import React from 'react'
import Base from '../../components/_helpers/BaseComponent'
import UserStore from '../../stores/UserStore'
import {browserHistory} from 'react-router'

export default class LoggedOut extends Base {
    constructor() {
        super()
    }

    componentWillMount() {
        if(UserStore.isLoggedIn()) {
            browserHistory.push('/login')
        }
    }
}
