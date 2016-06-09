import React from 'react'

import CalculatorContainer
    from '../../components/CalculatorContainer/CalculatorContainer.react'
import FunctionCreatorContainer
    from '../../components/FunctionCreator/FunctionCreatorContainer.react'

export default class Calculator extends Base {
    constructor() {
        super()
    }

    render() {
        return (
            <div className="pure-g calculator">
                <div className="pure-u-16-24">
                    <CalculatorContainer />
                </div>
                <div className="pure-u-1-24"></div>
                <div className="pure-u-7-24">
                    <FunctionCreatorContainer />
                </div>
            </div>
        )
    }
}
