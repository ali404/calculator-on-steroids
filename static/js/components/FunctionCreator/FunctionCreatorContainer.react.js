import React from "react"
import Base from "../_helpers/BaseComponent"

import FunctionCreator from './FunctionCreator.react'

import FunctionStore from '../../stores/FunctionStore'
import FunctionActions from '../../actions/FunctionActions'

import UserStore from "../../stores/UserStore"
import UserActions from "../../actions/UserActions"

var getFunctionInputState = function() {
    return {
        functionName: '',
        functionBody: ''
    }
}

export default class FunctionCreatorContainer extends Base {

    constructor() {
        super()
        this._bind(
            '_onChange',
            '_onChangeInput',
            '_onSave'
        )

        this.state = getFunctionInputState()
    }

    componentDidMount() {
        FunctionStore.addChangeListener(this._onChange)
    }

    componentWillUnmount() {
        FunctionStore.removeChangeListener(this._onChange)
    }

    _onChange() {
        this.setState(getFunctionInputState())
    }

    render() {
        return (
            <FunctionCreator
                onChangeInput={this._onChangeInput}
                onSave={this._onSave}
                functionName={this.state.functionName}
                functionBody={this.state.functionBody}
            />
        )
    }

    _onChangeInput(e) {
        let state = {}
        state[e.target.name] = e.target.value
        this.setState(state)
    }

    _onSave(e) {
        var functionName = this.state.functionName
        var functionBody = this.state.functionBody

        FunctionActions.addFunction({
            functionName: functionName,
            functionBody: functionBody
        })

        this.setState({
            functionName: "",
            functionBody: ""
        })
    }
}
