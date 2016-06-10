import React from 'react'
import Base from '../_helpers/BaseComponent'

export default class CalculatorResult extends Base {
    constructor() {
        super()
    }

    render() {
        return (
            <div
                className="hero-calculator--input__result"
                id="input-rez"
            >
                {this.props.queryResult}
            </div>
        )
    }
}
