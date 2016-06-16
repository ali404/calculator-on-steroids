import React from 'react'
import Base from '../_helpers/BaseComponent'

import CalculatorButton from './CalculatorButton.react'

import CalculatorActions from '../../actions/CalculatorActions'

export default class CalculatorButtonContainer extends Base {
    constructor(props) {
        super(props)

        this._bind(
            '_getClickFunctionType',
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

        this.buttonType = props.type
        this.buttonText = props.text
        this.buttonClassName = props.class || ''

        this._onClick = this._getClickFunctionType()
    }

    render() {
        return (
            <CalculatorButton
                onClick={this._onClick}
                buttonClassName={this.buttonClassName}
                buttonText={this.buttonText}
            />
        )
    }

    _getClickFunctionType() {
        switch (this.buttonType) {

            case this.buttonTypes.NORMAL_BUTTON:
                return this._onClickNormalButton

                break

            case this.buttonTypes.DOUBLE_BUTTON:
                return this._onClickDoubleButton

                break

            case this.buttonTypes.DELETE_BUTTON:
                return this._onClickDeleteButton

                break

            case this.buttonTypes.SHOW_RESULT_BUTTON:
                return this._onClickShowResultButton

                break
        }
    }

    _onClickNormalButton(text) {
        CalculatorActions.append(text)
    }

    _onClickDoubleButton(text) {
        CalculatorActions.append(text + "(")
    }

    _onClickShowResultButton(text) {
        //nothing for now
        //it will be added later an interaction
    }

    _onClickDeleteButton(text) {
        CalculatorActions.deleteOnlyLast()
    }

}
