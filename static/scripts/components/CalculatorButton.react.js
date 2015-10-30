import React from "react"
import CalculatorActions from "../actions/CalculatorActions"
import BaseComponent from "./helpers/BaseComponent"

export default class CalculatorButton extends BaseComponent {

    constructor(props, context) {
        super(props, context)
        this._bind(
            "getClickFunctionType",
            "_onClickNormalButton",
            "_onClickDoubleButton",
            "_onClickShowResultButton",
            "_onClickDeleteButton"
        )

        this.buttonTypes = {
            NORMAL_BUTTON: "withoutBrackets",
            DOUBLE_BUTTON: "withBrackets",
            DELETE_BUTTON: "delete",
            SHOW_RESULT_BUTTON: "showResult"
        }

        this.buttonType = this.props.type
        this.buttonText = this.props.text
        this.buttonClassName = this.props.class || ""
        this.buttonId = this.props.id || ""
        this._clickFunction = undefined
        this.getClickFunctionType()
    }

    render() {
        return (
            <div
            onClick={this._clickFunction}
            className={this.buttonClassName}
            id={this.buttonId}>
                {this.buttonText}
            </div>
        )
    }

    getClickFunctionType() {
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
    }

    _onClickNormalButton() {
        CalculatorActions.append(this.buttonText)
    }

    _onClickDoubleButton() {
        CalculatorActions.append(this.buttonText + "(")
    }

    _onClickShowResultButton() {
        //nothing for now
        //it will be added later an interaction
    }

    _onClickDeleteButton() {
        CalculatorActions.deleteOnlyLast()
    }
}
