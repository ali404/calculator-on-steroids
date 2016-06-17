import React from 'react'
import Base from '../_helpers/BaseComponent'

import classnames from 'classnames'

export default class FunctionCreator extends Base {
    constructor() {
        super()
    }

    render() {
        // initialise message
        let message = ''
        let messageClasses

        if(this.props.shouldMessageShow) {
            message = {
                true: 'Function added',
                false: 'The function name should be unique'
            }[this.props.isCreationSuccessful]

            messageClasses = classnames({
                'color-green': this.props.isCreationSuccessful === true,
                'color-red': this.props.isCreationSuccessful === false,
                'float-left': true,
                'h6': true
            })
        }

        // initialise validation icons
        let functionNameValidationIcon = ''
        let functionBodyValidationIcon = ''

        if(
            this.props.isFunctionNameValid
            && this.props.functionName.length !== 0
        ) {
            functionNameValidationIcon = (
                <i
                className="material-icons color-green function-validation-name">
                    done
                </i>
            )
        }
        else if(this.props.functionName.length !== 0) {
            functionNameValidationIcon = (
                <i
                className="material-icons color-red function-validation-name hint--top"
                aria-label="should be less than 15 character">
                    error_outline
                </i>
            )
        }

        if(
            this.props.isFunctionBodyValid
            && this.props.functionBody.length !== 0
        ) {
            functionBodyValidationIcon = (
                <i
                className="material-icons color-green function-validation-body">
                    done
                </i>
            )
        }
        else if(this.props.functionBody.length !== 0) {
            functionBodyValidationIcon = (
                <i
                className="material-icons color-red function-validation-body hint--top"
                aria-label="should be a valid javascript function">
                    error_outline
                </i>
            )
        }

        // initialise button
        let isCreationDisabled = !this.props.isFunctionNameValid
            || !this.props.isFunctionBodyValid

        let buttonOptions = {
            className: 'form-submit float-left h6',
            onClick: this.props.onSave
        }

        if(isCreationDisabled) {
            buttonOptions['disabled'] = 'disabled'
        }

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
                    {functionNameValidationIcon}
                    {functionBodyValidationIcon}
                </div>
                <p className={messageClasses}>
                    {message}
                </p>
                <button {...buttonOptions}>
                    add function
                </button>
            </div>
        )
    }
}
