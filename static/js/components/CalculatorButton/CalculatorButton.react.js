import React from 'react'
import Base from '../_helpers/BaseComponent'

export default class CalculatorButton extends Base {
    constructor() {
        super()
    }

    render() {
        return (
            <div
                onClick={this.props.clickFunction}
                className={this.props.buttonClassName}
                id={this.props.buttonId}
            >
                {this.props.buttonText}
            </div>
        )
    }
}
