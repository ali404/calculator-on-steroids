import React from "react"
import CalculatorActions from "../actions/CalculatorActions"
import CalculatorStore from "../stores/CalculatorStore"
import UserStore from "../stores/UserStore"
import UserActions from "../actions/UserActions"
import BaseComponent from "./helpers/BaseComponent"

var getFunctionInputState = function() {
    return {
        funcName: "",
        funcBody: ""
    }
}

export default class FunctionInput extends BaseComponent {

    constructor(props, context) {
        super(props, context)
        this._bind("_onChange",
                    "_updateFuncName",
                    "_updateFuncBody",
                    "_addFunc")
        this.state = getFunctionInputState()
    }

    componentDidMount() {
        CalculatorStore.addChangeListener(this._onChange)
    }

    componentWillUnmount() {
        CalculatorStore.removeChangeListener(this._onChange)
    }

    _onChange() {
        this.setState(getFunctionInputState())
    }

    render() {
        return (
            <div className="hero-calculator--form">
                <div className="hero-calculator--form__container">
                    <input onChange={this._updateFuncName} value={this.state.funcName} className="hero-calculator--form__name h6" id="func-name" placeholder="function name" />
                    <textarea onChange={this._updateFuncBody} value={this.state.funcBody} className="hero-calculator--form__body h6" id="func-code" placeholder="function body" />
                </div>
                <div className="hero-calculator--form__submit h6" id="func-btn" onClick={this._addFunc}>add function</div>
            </div>
        )
    }

    _updateFuncName(event) {
        this.setState({funcName: event.target.value})
    }

    _updateFuncBody(event) {
        this.setState({funcBody: event.target.value})
    }

    _addFunc(event) {
        var funcName = this.state.funcName
        var funcBody = this.state.funcBody

        if(UserStore.isLoggedIn()) {
            UserActions.addFunction({
                funcName: funcName,
                funcBody: funcBody
            })
        }
        CalculatorActions.addFunction({
            funcName: funcName,
            funcBody: funcBody
        })
    }
}
