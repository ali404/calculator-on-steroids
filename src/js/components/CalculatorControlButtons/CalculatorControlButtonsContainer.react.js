import React from 'react'
import Base from '../_helpers/BaseComponent'

import CalculatorControlButtons from './CalculatorControlButtons.react'

import CalculatorActions from '../../actions/CalculatorActions'
import CalculatorStore from '../../stores/CalculatorStore'

export default class CalculatorControlButtonsContainer extends Base {
    constructor() {
        super()
        this._bind(
            '_onClick',
            '_getCalculatorControlState',
            '_onChange'
        )

        this.state = this._getCalculatorControlState()
    }

    _getCalculatorControlState() {
        return {
            'isCalculatorResized': CalculatorStore.getCalculatorResizedState()
        }
    }

    componentDidMount() {
        CalculatorStore.addChangeListener(this._onChange)
    }

    componentWillUnmount() {
        CalculatorStore.removeChangeListener(this._onChange)
    }

    _onChange() {
        this.setState(this._getCalculatorControlState())
    }

    render() {

        return (
            <CalculatorControlButtons
                isCalculatorResized={this.state.isCalculatorResized}
                onClick={this._onClick}
            />
        )
    }

    _onClick() {
        CalculatorActions.resizeCalculator()
    }
}
