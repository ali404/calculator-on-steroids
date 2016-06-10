import React from 'react'
import Base from '../_helpers/BaseComponent'

export default class CalculatorControlButtons extends Base {
    constructor() {
        super()
    }

    render() {
        // TODO: find a better way to pass the functions
        return (
            <div className="apple-buttons">
                <div
                    className="apple-buttons--red"></div>
                <div
                    className="apple-buttons--yellow"></div>
                <div
                    className="apple-buttons--green"
                    onClick={this.props.onClickFunctions[2]}
                >
                </div>
            </div>
        )
    }
}
