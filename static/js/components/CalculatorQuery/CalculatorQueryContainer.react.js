import React from 'react'
import Base from '../_helpers/BaseComponent'

import CalculatorQuery from './CalculatorQuery.react'
import CalculatorStore from '../../stores/CalculatorStore'
import CalculatorActions from '../../actions/CalculatorActions'

export default class CalculatorQueryContainer extends Base {
    constructor() {
        super()
        this._bind(
            '_onChange',
            '_getCalculatorQueryState',
            '_updateInput'
        )
        this.state = this._getCalculatorQueryState()
    }

    componentDidMount() {
        CalculatorStore.addChangeListener(this._onChange)
    }

    componentWillUnmount() {
        CalculatorStore.removeChangeListener(this._onChange)
    }

    _onChange() {
        this.setState(this._getCalculatorQueryState())
    }

    _getCalculatorQueryState() {
        return {
            queryText: CalculatorStore.getQueryText()
        }
    }

    render() {
        return (
            <CalculatorQuery
                queryText={this.state.queryText}
                onChange={this._updateInput}
            />
        )
    }

    _updateInput(queryText) {
        CalculatorActions.changeText(queryText)
    }
}
