import React from 'react'
import Base from '../../components/_helpers/BaseComponent'

import UserStore from '../../stores/UserStore'

import {browserHistory} from 'react-router'

export default class LoggedIn extends Base {
    constructor() {
        super()
        this._bind(
            '_onChange'
        )
    }

    componentWillMount() {
        this._onChange()
    }

    componentDidMount() {
        UserStore.addChangeListener(this._onChange)
    }

    componentWillUnmount() {
        UserStore.removeChangeListener(this._onChange)
    }

    _onChange() {
        if(!UserStore.isLoggedIn()) {
            browserHistory.push('/login')
        }
    }
}
