import React from 'react'
import Base from '../_helpers/BaseComponent'

import Calculator from './Calculator.react'

import CalculatorStore from '../../stores/CalculatorStore'

export default class CalculatorContainer extends Base {
    constructor() {
        super()
        this._bind(
            '_onChange',
            '_getCalculatorState'
        )

        this.state = this._getCalculatorState()
    }

    _getCalculatorState() {
        return {
            isCalculatorResized: CalculatorStore.getCalculatorResizedState()
        }
    }

    componentDidMount() {
        CalculatorStore.addChangeListener(this._onChange)
    }

    componentWillUnmount() {
        CalculatorStore.removeChangeListener(this._onChange)
    }

    _onChange() {
        this.setState(this._getCalculatorState())
    }

    render() {
        return (
            <Calculator
                isCalculatorResized={this.state.isCalculatorResized}
            />
        )
    }
}
