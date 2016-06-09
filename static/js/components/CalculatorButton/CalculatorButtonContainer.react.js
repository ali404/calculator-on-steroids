import React from 'react'
import Base from '../_helpers/BaseComponent'

import CalculatorStore
    from '../../stores/CalculatorStore'

export default class CalculatorButtonContainer extends Base {
    constructor() {
        super()

        this._bind(
            '_onClick',
            'getClickFunctionType',
            '_onClickNormalButton',
            '_onClickDoubleButton',
            '_onClickShowResultButton',
            '_onClickDeleteButton'
        )

        this.buttonTypes = {
            NORMAL_BUTTON: 'withoutBrackets',
            DOUBLE_BUTTON: 'withBrackets',
            DELETE_BUTTON: 'delete',
            SHOW_RESULT_BUTTON: 'showResult'
        }

        this.buttonType = this.props.type
        this.buttonText = this.props.text
        this.buttonClassName = this.props.class || ''
        this.buttonId = this.props.id || ''
        this._onClick = undefined

        this.getClickFunctionType()
    }

    render() {
        return (
            <CalculatorButton
                onClick={this._onClick}
                buttonClassName={this.buttonClassName}
                buttonId={this.buttonId}
                buttonText={this.buttonText}
            />
        )
    }

    getClickFunctionType() {
        switch (this.buttonType) {

            case this.buttonTypes.NORMAL_BUTTON:
                this._onClick = this._onClickNormalButton

                break

            case this.buttonTypes.DOUBLE_BUTTON:
                this._onClick = this._onClickDoubleButton

                break

            case this.buttonTypes.DELETE_BUTTON:
                this._onClick = this._onClickDeleteButton

                break

            case this.buttonTypes.SHOW_RESULT_BUTTON:
                this._onClick = this._onClickShowResultButton

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
