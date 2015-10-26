import React from "react"
import CalculatorActions from "../actions/CalculatorActions"
import CalculatorStore from "../stores/CalculatorStore"

var getFunctionInputState = function() {
    return {
        funcName: "",
        funcBody: ""
    }
}

var FunctionInput = React.createClass({

    getInitialState: function() {
        return getFunctionInputState()
    },

    componentDidMount: function() {
        CalculatorStore.addChangeListener(this._onChange)
    },

    componentWillUnmount: function() {
        CalculatorStore.removeChangeListener(this._onChange)
    },

    _onChange: function() {
        this.setState(getFunctionInputState())
    },

    render: function() {
        return (
            <div className="hero-calculator--form">
                <div className="hero-calculator--form__container">
                    <input onChange={this._updateFuncName} value={this.state.funcName} className="hero-calculator--form__name h6" id="func-name" placeholder="function name" />
                    <textarea onChange={this._updateFuncBody} value={this.state.funcBody} className="hero-calculator--form__body h6" id="func-code" placeholder="function body" />
                </div>
                <div className="hero-calculator--form__submit h6" id="func-btn" onClick={this._addFunc}>add function</div>
            </div>
        )
    },

    _updateFuncName: function(event) {
        this.setState({funcName: event.target.value})
    },

    _updateFuncBody: function(event) {
        this.setState({funcBody: event.target.value})
    },

    _addFunc: function(event) {
        var funcName = this.state.funcName
        var funcBody = this.state.funcBody

        CalculatorActions.addFunction({
            funcName: funcName,
            funcBody: funcBody
        })
    }
})

module.exports = FunctionInput
