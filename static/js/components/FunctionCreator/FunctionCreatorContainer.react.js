import React from "react"
import Base from "../_helpers/BaseComponent"

import FunctionCreator from './FunctionCreator.react'

import CalculatorActions from "../../actions/CalculatorActions"
import CalculatorStore from "../../stores/CalculatorStore"
import UserStore from "../../stores/UserStore"
import UserActions from "../../actions/UserActions"

var getFunctionInputState = function() {
    return {
        funcName: "",
        funcBody: ""
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
        CalculatorStore.addChangeListener(this._onChange)
    }

    componentWillUnmount() {
        CalculatorStore.removeChangeListener(this._onChange)
    }

    _onChange() {
        this.setState(getFunctionInputState())
    }

    render() {
        return (
            <FunctionCreator
                onChangeInput={this._onChangeInput}
                onSave={this._onSave}
                funcName={this.state.funcName}
                funcBody={this.state.funcBody}
            />
        )
    }

    _onChangeInput(e) {
        let state = {}
        state[e.target.name] = e.target.value
        this.setState(state)
    }

    _onSave(e) {
        var funcName = this.state.funcName
        var funcBody = this.state.funcBody

        if(UserStore.isLoggedIn()) {
            UserActions.addFunction({
                funcName: funcName,
                funcBody: funcBody
            })
        }

        CalculatorActions.addFunction({
            funcName: funcName,
            funcBody: funcBody
        })
    }
}
