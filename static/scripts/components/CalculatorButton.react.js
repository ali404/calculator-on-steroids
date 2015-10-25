import React from "react"
import CalculatorActions from "../actions/CalculatorActions"

var CalculatorButton = React.createClass({

    buttonTypes: {
        NORMAL_BUTTON: "withoutBrackets",
        DOUBLE_BUTTON: "withBrackets",
        DELETE_BUTTON: "delete",
        SHOW_RESULT_BUTTON: "showResult"
    },

    buttonType: "",
    buttonClassName: "",
    buttonId: "",
    buttonText: "",
    _clickFunction: undefined,

    setInitialState: function() {
        this.buttonType = this.props.type
        this.buttonText = this.props.text
        this.buttonClassName = this.props.class || ""
        this.buttonId = this.props.id || ""
        this.getClickFunctionType()
    },

    render: function() {
        this.setInitialState()

        return (
            <div
            onClick={this._clickFunction}
            className={this.buttonClassName}
            id={this.buttonId}>
                {this.buttonText}
            </div>
        )
    },

    getClickFunctionType: function() {
        switch (this.buttonType) {

            case this.buttonTypes.NORMAL_BUTTON:
                this._clickFunction = this._onClickNormalButton

                break

            case this.buttonTypes.DOUBLE_BUTTON:
                this._clickFunction = this._onClickDoubleButton

                break

            case this.buttonTypes.DELETE_BUTTON:
                this._clickFunction = this._onClickDeleteButton

                break

            case this.buttonTypes.SHOW_RESULT_BUTTON:
                this._clickFunction = this._onClickShowResultButton

                break
        }
    },

    _onClickNormalButton: function() {
        CalculatorActions.append(this.buttonText)
    },

    _onClickDoubleButton: function() {
        CalculatorActions.append(this.buttonText + "(")
    },

    _onClickShowResultButton: function() {
        //nothing for now
        //it will be added later an interaction
    },

    _onClickDeleteButton: function() {
        CalculatorActions.deleteOnlyLast()
    }
})

module.exports = CalculatorButton
