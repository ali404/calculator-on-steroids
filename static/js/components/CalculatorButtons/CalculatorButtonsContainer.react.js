import React from 'react'
import Base from '../_helpers/BaseComponent'

import CalculatorButtons from './CalculatorButtons.react'

import FunctionStore from '../../stores/FunctionStore'

export default class CalculatorButtonsContainer extends Base {
    constructor() {
        super()
        this._bind(
            '_onChange',
            '_getCalculatorButtonsState'
        )

        this.state = this._getCalculatorButtonsState()
    }

    _getCalculatorButtonsState() {
        return {
            functions: FunctionStore.getFunctions()
        }
    }

    componentDidMount() {
        FunctionStore.addChangeListener(this._onChange)
    }

    componentWillUnmount() {
        FunctionStore.removeChangeListener(this._onChange)
    }

    _onChange() {
        this.setState(this._getCalculatorButtonsState())
    }

    render() {
        return (
            <CalculatorButtons
                functions={this.state.functions}
            />
        )
    }
}
