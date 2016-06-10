import React from 'react'
import Base from '../components/_helpers/BaseComponent'

import CalculatorContainer
    from '../components/Calculator/CalculatorContainer.react'
import FunctionCreatorContainer
    from '../components/FunctionCreator/FunctionCreatorContainer.react'
import FunctionScriptContainer
    from '../components/FunctionScript/FunctionScriptContainer.react'

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
                    <FunctionScriptContainer />
                </div>
            </div>
        )
    }
}
