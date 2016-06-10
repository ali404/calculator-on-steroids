import React from 'react'
import Base from '../_helpers/BaseComponent'

import CalculatorResult from './CalculatorResult.react'

import CalculatorStore from '../../stores/CalculatorStore'

export default class CalculatorResultContainer extends Base {
    constructor() {
        super()
        this._bind(
            '_onChange',
            '_getCalculatorResultState'
        )

        this.state = this._getCalculatorResultState()
    }

    componentDidMount() {
        CalculatorStore.addChangeListener(this._onChange)
    }

    componentWillUnmount() {
        CalculatorStore.removeChangeListener(this._onChange)
    }

    _onChange() {
        this.setState(this._getCalculatorResultState())
    }

    _getCalculatorResultState() {
        return {
            queryResult: CalculatorStore.getQueryResult()
        }
    }

    render() {
        return (
            <CalculatorResult
                queryResult={this.state.queryResult}
            />
        )
    }
}
