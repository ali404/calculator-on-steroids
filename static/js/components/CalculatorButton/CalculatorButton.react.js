import React from 'react'
import Base from '../_helpers/BaseComponent'

export default class CalculatorButton extends Base {
    constructor() {
        super()
        this._bind(
            '_onClick'
        )
    }

    render() {
        return (
            <div
                onClick={this._onClick}
                className={this.props.buttonClassName}
            >
                {this.props.buttonText}
            </div>
        )
    }

    _onClick() {
        this.props.onClick(this.props.buttonText)
    }
}
