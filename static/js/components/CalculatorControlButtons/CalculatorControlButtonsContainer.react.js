import React from 'react'
import Base from '../_helpers/BaseComponent'

import CalculatorControlButtons from './CalculatorControlButtons.react'

import CalculatorActions from '../../actions/CalculatorActions'

export default class CalculatorControlButtonsContainer extends Base {
    constructor() {
        super()
        this._bind(
            '_onClick'
        )
    }

    render() {
        let onClickFunctions = [null, null, this._onClick]

        return (
            <CalculatorControlButtons
                onClickFunctions={onClickFunctions}
            />
        )
    }

    _onClick() {
        CalculatorActions.resizeCalculator()
    }
}
