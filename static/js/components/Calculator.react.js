import React from "react"
import BaseComponent from "./_helpers/BaseComponent"

import FunctionCreatorContainer
    from "./FunctionCreator/FunctionCreatorContainer.react"
import FunctionScriptContainer
    from './FunctionScript/FunctionScriptContainer.react'

import CalculatorStore from "../stores/CalculatorStore"
import FunctionStore from '../stores/FunctionStore'

import CalculatorButtonsContainer
    from "./CalculatorButtons/CalculatorButtonsContainer.react"
import CalculatorQueryContainer
    from './CalculatorQuery/CalculatorQueryContainer.react'
import CalculatorResultContainer
    from './CalculatorResult/CalculatorResultContainer.react'
import CalculatorControlButtonsContainer
    from './CalculatorControlButtons/CalculatorControlButtonsContainer.react'



var getCalculatorState = function() {
    return {
        calculatorResizedState: CalculatorStore.getCalculatorResizedState()
    }
}

export default class Calculator extends BaseComponent {

    constructor(props, context) {
        super(props, context)
        this._bind(
            "_onChange"
        )
        this.state = getCalculatorState()
    }

    componentDidMount() {
        CalculatorStore.addChangeListener(this._onChange)
        FunctionStore.addChangeListener(this._onChange)
    }

    componentWillUnmount() {
        CalculatorStore.removeChangeListener(this._onChange)
        FunctionStore.removeChangeListener(this._onChange)
    }

    _onChange() {
        this.setState(getCalculatorState())
    }

    render() {
        return (
            <div className="pure-g calculator">
                <div className="pure-u-16-24">
                    <div className={"hero-calculator " + this.state.calculatorResizedState}>
                        <div className="hero-calculator--input">
                            <CalculatorControlButtonsContainer />
                            <CalculatorResultContainer />
                            <CalculatorQueryContainer />
                        </div>
                        <div className="hero-calculator--buttons">
                            <CalculatorButtonsContainer />
                        </div>
                    </div>
                </div>
                <div className="pure-u-1-24">
                    <br/>
                </div>
                <div className="pure-u-7-24">
                    <FunctionCreatorContainer />
                    <FunctionScriptContainer />
                </div>
            </div>
        )
    }
}
