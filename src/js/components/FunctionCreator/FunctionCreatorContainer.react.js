import React from "react"
import Base from "../_helpers/BaseComponent"

import FunctionCreator from './FunctionCreator.react'

import FunctionStore from '../../stores/FunctionStore'
import FunctionActions from '../../actions/FunctionActions'

import UserStore from "../../stores/UserStore"
import UserActions from "../../actions/UserActions"

export default class FunctionCreatorContainer extends Base {

    constructor() {
        super()
        this._bind(
            '_onChange',
            '_onChangeInput',
            '_onSave',
            '_getFunctionInputState',
            '_isValid',
            '_isFunctionNameValid',
            '_isFunctionBodyValid'
        )

        this.state = this._getFunctionInputState()

        this.state.isCreationSuccessful = undefined
    }

    _getFunctionInputState() {
        return {
            functionName: '',
            functionBody: '',
            isFunctionNameValid: FunctionStore.getFunctionNameState(),
            isFunctionBodyValid: FunctionStore.getFunctionBodyState(),
            isCreationSuccessful: FunctionStore.getFunctionCreationState()
        }
    }

    componentDidMount() {
        FunctionStore.addChangeListener(this._onChange)
    }

    componentWillUnmount() {
        FunctionStore.removeChangeListener(this._onChange)
    }

    _onChange() {
        this.setState(this._getFunctionInputState())
    }

    render() {
        return (
            <FunctionCreator
                onChangeInput={this._onChangeInput}
                onSave={this._onSave}
                functionName={this.state.functionName}
                isFunctionNameValid={this.state.isFunctionNameValid}
                functionBody={this.state.functionBody}
                isFunctionBodyValid={this.state.isFunctionBodyValid}
                shouldMessageShow={this.state.shouldMessageShow}
                isCreationSuccessful={this.state.isCreationSuccessful}
            />
        )
    }

    _onChangeInput(e) {
        let state = {}
        state[e.target.name] = e.target.value

        state['shouldMessageShow'] = false
        state['isCreationSuccessful'] = undefined
        state['is'
            + e.target.name[0].toUpperCase()
            + e.target.name.slice(1)
            + 'Valid'] = this._isValid(e.target.name, e.target.value)

        this.setState(state)
    }

    _onSave(e) {
        let functionName = this.state.functionName
        let functionBody = this.state.functionBody

        FunctionActions.addFunction({
            functionName: functionName,
            functionBody: functionBody
        })

        this.setState({
            'shouldMessageShow': true
        })
    }

    _isValid(what, value) {
        return {
            'functionName': this._isFunctionNameValid,
            'functionBody': this._isFunctionBodyValid
        }[what](value)
    }

    _isFunctionNameValid(functionName) {
        return FunctionStore.isFunctionNameValid(functionName)
    }

    _isFunctionBodyValid(functionBody) {
        return FunctionStore.isFunctionBodyValid(functionBody)
    }
}
