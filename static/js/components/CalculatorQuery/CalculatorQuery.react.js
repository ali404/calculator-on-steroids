import React from 'react'
import Base from '../_helpers/BaseComponent'

export default class CalculatorQuery extends Base {
    constructor() {
        super()
        this._bind(
            '_onChange'
        )
    }

    render() {
        return (
            <input
                className="hero-calculator--input__query"
                id="input"
                value={this.props.queryText}
                onChange={this._onChange}
            />
        )
    }

    _onChange(e) {
        this.props.onChange(e.target.value)
    }
}
