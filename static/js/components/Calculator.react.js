import React from "react"
import BaseComponent from "./_helpers/BaseComponent"

import CalculatorButton from "./CalculatorButton.react"
import FunctionCreatorContainer
    from "./FunctionCreator/FunctionCreatorContainer.react"

import CalculatorStore from "../stores/CalculatorStore"
import FunctionStore from '../stores/FunctionStore'
import CalculatorActions from "../actions/CalculatorActions"
import UserStore from "../stores/UserStore"

import CalculatorQueryContainer
    from './CalculatorQuery/CalculatorQueryContainer.react'


var getCalculatorState = function() {
    return {
        queryResult: CalculatorStore.getQueryResult(),
        calculatorResizedState: CalculatorStore.getCalculatorResizedState(),
        functions: UserStore.isLoggedIn() ? UserStore.getFunctions() : FunctionStore.getFunctions()
    }
}

export default class Calculator extends BaseComponent {

    constructor(props, context) {
        super(props, context)
        this._bind(
            "_onChange",
            "_updateInput",
            "_resizeCalculator"
        )
        this.state = getCalculatorState()
    }

    componentDidMount() {
        CalculatorStore.addChangeListener(this._onChange)
        UserStore.addChangeListener(this._onChange)
    }

    componentWillUnmount() {
        CalculatorStore.removeChangeListener(this._onChange)
        UserStore.removeChangeListener(this._onChange)
    }

    _onChange() {
        this.setState(getCalculatorState())
    }

    render() {
        var functions = []
        var scripts = []

        this.state.functions.forEach(function(func) {
            if(!!func) {
                functions.push(<CalculatorButton key={func.id} type="withBrackets" text={func.functionName} class="sec-btn double"/>)
                scripts.push(<script id={func.functionName} key={func.id}>{func.fullBody}</script>)
            }
        })

        return (
            <div className="pure-g calculator">
                <div className="pure-u-16-24">
                    <div className={"hero-calculator " + this.state.calculatorResizedState}>
                        <div className="hero-calculator--input">
                            <div className="apple-buttons">
                                <div className="apple-buttons--red"></div>
                                <div className="apple-buttons--yellow"></div>
                                <div onClick={this._resizeCalculator} className="apple-buttons--green"></div>
                            </div>
                            <div className="hero-calculator--input__result" id="input-rez">42 {this.state.queryResult}</div>
                            <CalculatorQueryContainer />
                        </div>
                        <div className="hero-calculator--buttons">
                            <div className="hero-calculator--buttons__main">
                                <div className="hero-calculator--buttons__column">
                                    <CalculatorButton type="delete" text="ac" class="main-btn color-blue h4" />
                                    <CalculatorButton type="withoutBrackets" text="(" class="sec-btn normal color-blue h4" />
                                    <CalculatorButton type="withoutBrackets" text=")" class="sec-btn normal color-blue h4" />
                                    <CalculatorButton type="withoutBrackets" text="&#247;" class="main-btn normal color-blue h4" />
                                </div>
                                <div className="hero-calculator--buttons__column">
                                    <CalculatorButton type="withoutBrackets" text="1" class="main-btn normal" />
                                    <CalculatorButton type="withoutBrackets" text="2" class="main-btn normal" />
                                    <CalculatorButton type="withoutBrackets" text="3" class="main-btn normal" />
                                    <CalculatorButton type="withoutBrackets" text="&#215;" class="main-btn normal color-blue h4" />
                                </div>
                                <div className="hero-calculator--buttons__column">
                                    <CalculatorButton type="withoutBrackets" text="4" class="main-btn normal" />
                                    <CalculatorButton type="withoutBrackets" text="5" class="main-btn normal" />
                                    <CalculatorButton type="withoutBrackets" text="6" class="main-btn normal" />
                                    <CalculatorButton type="withoutBrackets" text="&#8722;" class="main-btn normal color-blue h4" />
                                </div>
                                <div className="hero-calculator--buttons__column">
                                    <CalculatorButton type="withoutBrackets" text="7" class="main-btn normal" />
                                    <CalculatorButton type="withoutBrackets" text="8" class="main-btn normal" />
                                    <CalculatorButton type="withoutBrackets" text="9" class="main-btn normal" />
                                    <CalculatorButton type="withoutBrackets" text="+" class="main-btn normal color-blue h4" />
                                </div>
                                <div className="hero-calculator--buttons__column">
                                    <CalculatorButton type="withoutBrackets" text="." class="main-btn normal" />
                                    <CalculatorButton type="withoutBrackets" text="0" class="main-btn normal" />
                                    <CalculatorButton type="withoutBrackets" text="," class="sec-btn normal" />
                                    <CalculatorButton type="showResult" text="=" class="main-btn color-blue h4" />
                                </div>
                            </div>
                            <div className="hero-calculator--buttons__secondary">
                                <div className="separator">
                                    <CalculatorButton type="withoutBrackets" text="e" class="sec-btn normal" />
                                    <CalculatorButton type="withBrackets" text="sin" class="sec-btn double" />
                                    <CalculatorButton type="withBrackets" text="cos" class="sec-btn double" />
                                    <CalculatorButton type="withBrackets" text="tan" class="sec-btn double" />
                                    <CalculatorButton type="withBrackets" text="log" class="sec-btn double" />
                                    <CalculatorButton type="withBrackets" text="ln" class="sec-btn double" />
                                    <CalculatorButton type="withBrackets" text="&#8730;" class="sec-btn double" />
                                    <CalculatorButton type="withoutBrackets" text="&#x3C0;" class="sec-btn double" />
                                </div>
                                {functions}
                                {scripts}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pure-u-1-24">
                    <br/>
                </div>
                <div className="pure-u-7-24">
                    <FunctionCreatorContainer />
                </div>
            </div>
        )
    }

    _updateInput(event) {
        CalculatorActions.changeText(event.target.value)
    }

    _resizeCalculator() {
        CalculatorActions.resizeCalculator()
    }
}
