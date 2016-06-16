import React from 'react'
import Base from '../_helpers/BaseComponent'

import classnames from 'classnames'

import CalculatorButtonsContainer
    from "../CalculatorButtons/CalculatorButtonsContainer.react"
import CalculatorQueryContainer
    from '../CalculatorQuery/CalculatorQueryContainer.react'
import CalculatorResultContainer
    from '../CalculatorResult/CalculatorResultContainer.react'
import CalculatorControlButtonsContainer
    from '../CalculatorControlButtons/CalculatorControlButtonsContainer.react'

export default class Calculator extends Base {
    constructor() {
        super()
    }

    render() {
        let heroCalculatorClasses = classnames({
            'hero-calculator': true,
            'large': this.props.isCalculatorResized,
            'small': !this.props.isCalculatorResized
        })

        return (
            <div className={heroCalculatorClasses}>
                <div className="hero-calculator--input">
                    <CalculatorControlButtonsContainer />
                    <CalculatorResultContainer />
                    <CalculatorQueryContainer />
                </div>
                <CalculatorButtonsContainer />
            </div>
        )
    }
}
