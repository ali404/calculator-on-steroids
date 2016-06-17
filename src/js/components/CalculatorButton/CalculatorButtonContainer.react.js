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
            '_onClickDeleteButton'
        )

        this.buttonTypes = {
            NORMAL_BUTTON: 'withoutBrackets',
            DOUBLE_BUTTON: 'withBrackets',
            DELETE_BUTTON: 'delete'
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
        let o = {}
        o[this.buttonTypes.NORMAL_BUTTON] = this._onClickNormalButton
        o[this.buttonTypes.DOUBLE_BUTTON] = this._onClickDoubleButton
        o[this.buttonTypes.DELETE_BUTTON] = this._onClickDeleteButton

        return o[this.buttonType]
    }

    _onClickNormalButton(text) {
        CalculatorActions.append(text)
    }

    _onClickDoubleButton(text) {
        CalculatorActions.append(text + "(")
    }

    _onClickDeleteButton(text) {
        CalculatorActions.deleteOnlyLast()
    }

}
