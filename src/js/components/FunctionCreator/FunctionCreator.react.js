import React from 'react'
import Base from '../_helpers/BaseComponent'

export default class FunctionCreator extends Base {
    constructor() {
        super()
    }

    render() {
        return (
            <div className="hero-calculator--form">
                <div className="hero-calculator--form__container">
                    <input
                        onChange={this.props.onChangeInput}
                        value={this.props.functionName}
                        name="functionName"
                        className="hero-calculator--form__name h6"
                        id="func-name"
                        placeholder="function name"
                    />
                    <textarea
                        onChange={this.props.onChangeInput}
                        value={this.props.functionBody}
                        name="functionBody"
                        className="hero-calculator--form__body h6"
                        id="func-body"
                        placeholder="function body"
                    />
                </div>
                <div
                    className="hero-calculator--form__submit h6"
                    id="func-btn"
                    onClick={this.props.onSave}>
                    add function
                </div>
            </div>
        )
    }
}
