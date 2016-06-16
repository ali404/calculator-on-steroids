import React from 'react'
import Base from '../_helpers/BaseComponent'

export default class CalculatorControlButtons extends Base {
    constructor() {
        super()
    }

    render() {
        let icon = ''
        
        if(this.props.isCalculatorResized) {
            icon =  <i className="material-icons color-blue">fullscreen_exit</i>
        }
        else {
            icon = (
                <i className="material-icons color-blue">fullscreen</i>
            )
        }

        return (
            <div className="calculator-controls">
                <div className="calculator-controls--button"
                    onClick={this.props.onClick}>
                    {icon}
                </div>
            </div>
        )
    }
}
