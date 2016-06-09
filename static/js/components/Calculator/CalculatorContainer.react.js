import React from 'react'
import Base from '../_helpers/BaseComponent'

import Calculator from './Calculator.react'

export default class CalculatorContainer extends Base {
    constructor() {
        super()
    }

    render() {
        return (
            <Calculator />
        )
    }
}
