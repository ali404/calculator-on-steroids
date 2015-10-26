import React from "react"
import CalculatorButton from "./CalculatorButton.react"
import FunctionInput from "./FunctionInput.react"
import CalculatorStore from "../stores/CalculatorStore"
import CalculatorActions from "../actions/CalculatorActions"

var getCalculatorState = function() {
    return {
        queryText: CalculatorStore.getQuery(),
        queryResult: CalculatorStore.getQueryResult(),
        functions: CalculatorStore.getFunctions()
    }
}

var Calculator = React.createClass({

    getInitialState: function() {
        return getCalculatorState()
    },

    componentDidMount: function() {
        CalculatorStore.addChangeListener(this._onChange)
    },

    componentWillUnmount: function() {
        CalculatorStore.removeChangeListener(this._onChange)
    },

    _onChange: function() {
        this.setState(getCalculatorState())
    },

    render: function() {
        var functions = []
        var scripts = []
        this.state.functions.forEach(function(func) {
            functions.push(<CalculatorButton key={func.funcName} type="withBrackets" text={func.funcName} className=""/>)
            scripts.push(<script id={func.funcName} key={func.funcName}>{func.funcBody}</script>)
        })

        return (
            <div className="pure-g calculator">
                <div className="pure-u-16-24">
                    <div className="hero-calculator--input">
                        <input className="hero-calculator--input__query" id="input" value={this.state.queryText} onChange={this._updateInput} />
                        <div className="hero-calculator--input__result" id="input-rez">{this.state.queryResult}</div>
                    </div>
                    <div className="hero-calculator--buttons">
                        <div className="hero-calculator--buttons__main">
                            <div className="hero-calculator--buttons__row-small">
                                <CalculatorButton type="delete" text="DEL" class="main-btn" />
                                <CalculatorButton type="withoutBrackets" text="(" class="sec-btn normal" />
                                <CalculatorButton type="withoutBrackets" text=")" class="sec-btn normal" />
                                <CalculatorButton type="withoutBrackets" text="," class="sec-btn normal" />
                                <CalculatorButton type="withBrackets" text="&#8730;" class="sec-btn double" />
                                <CalculatorButton type="withoutBrackets" text="&#x3C0;" class="sec-btn double" />
                            </div>
                            <div className="hero-calculator--buttons__row">
                                <CalculatorButton type="withoutBrackets" text="1" class="main-btn normal" />
                                <CalculatorButton type="withoutBrackets" text="4" class="main-btn normal" />
                                <CalculatorButton type="withoutBrackets" text="7" class="main-btn normal" />
                                <CalculatorButton type="withoutBrackets" text="." class="main-btn normal" />
                            </div>
                            <div className="hero-calculator--buttons__row">
                                <CalculatorButton type="withoutBrackets" text="2" class="main-btn normal" />
                                <CalculatorButton type="withoutBrackets" text="5" class="main-btn normal" />
                                <CalculatorButton type="withoutBrackets" text="8" class="main-btn normal" />
                                <CalculatorButton type="withoutBrackets" text="0" class="main-btn normal" />
                            </div>
                            <div className="hero-calculator--buttons__row">
                                <CalculatorButton type="withoutBrackets" text="3" class="main-btn normal" />
                                <CalculatorButton type="withoutBrackets" text="5" class="main-btn normal" />
                                <CalculatorButton type="withoutBrackets" text="9" class="main-btn normal" />
                                <CalculatorButton type="showResult" text="=" class="main-btn" />
                            </div>
                            <div className="hero-calculator--buttons__row">
                                <CalculatorButton type="withoutBrackets" text="x" class="main-btn normal" />
                                <CalculatorButton type="withoutBrackets" text="&#247;" class="main-btn normal" />
                                <CalculatorButton type="withoutBrackets" text="-" class="main-btn normal" />
                                <CalculatorButton type="withoutBrackets" text="+" class="main-btn normal" />
                            </div>
                            <div className="hero-calculator--buttons__column">
                                <CalculatorButton type="withoutBrackets" text="e" class="sec-btn normal" />
                                <CalculatorButton type="withBrackets" text="sin" class="sec-btn double" />
                                <CalculatorButton type="withBrackets" text="cos" class="sec-btn double" />
                                <CalculatorButton type="withBrackets" text="tan" class="sec-btn double" />
                                <CalculatorButton type="withBrackets" text="log" class="sec-btn double" />
                                <CalculatorButton type="withBrackets" text="ln" class="sec-btn double" />
                            </div>
                        </div>
                        <div className="hero-calculator--buttons__secondary">
                            {functions}
                            {scripts}
                        </div>
                    </div>
                </div>
                <div className="pure-u-1-24">
                    <br/>
                </div>
                <div className="pure-u-7-24">
                    <FunctionInput />
                </div>
            </div>
        )
    },

    _updateInput: function(event) {
        CalculatorActions.changeText(event.target.value)
    }
})

module.exports = Calculator
