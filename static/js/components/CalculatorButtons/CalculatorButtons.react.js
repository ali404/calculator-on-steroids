import React from 'react'
import Base from '../_helpers/BaseComponent'

import CalculatorButtonContainer
    from '../CalculatorButton/CalculatorButtonContainer.react'

export default class CalculatorButtons extends Base {
    constructor() {
        super()
        this._bind()
    }

    render() {
        let functions = []

        this.props.functions.forEach((func) => {
            if(!!func) {
                functions.push(
                    <CalculatorButtonContainer
                        key={func.id}
                        type="withBrackets"
                        text={func.functionName}
                        class="sec-btn double"
                    />
                )
            }
        })

        return (
            <div className="hero-calculator--buttons">
                <div className="hero-calculator--buttons__main">
                    <div className="hero-calculator--buttons__column">
                        <CalculatorButtonContainer
                            type="delete"
                            text="ac"
                            class="main-btn color-blue h4"
                        />
                        <CalculatorButtonContainer
                            type="withoutBrackets"
                            text="("
                            class="sec-btn normal color-blue h4"
                        />
                        <CalculatorButtonContainer
                            type="withoutBrackets"
                            text=")"
                            class="sec-btn normal color-blue h4"
                        />
                        <CalculatorButtonContainer
                            type="withoutBrackets"
                            text="&#247;"
                            class="main-btn normal color-blue h4"
                        />
                    </div>
                    <div className="hero-calculator--buttons__column">
                        <CalculatorButtonContainer
                            type="withoutBrackets"
                            text="1"
                            class="main-btn normal"
                        />
                        <CalculatorButtonContainer
                            type="withoutBrackets"
                            text="2"
                            class="main-btn normal"
                        />
                        <CalculatorButtonContainer
                            type="withoutBrackets"
                            text="3"
                            class="main-btn normal"
                        />
                        <CalculatorButtonContainer
                            type="withoutBrackets"
                            text="&#215;"
                            class="main-btn normal color-blue h4"
                        />
                    </div>
                    <div className="hero-calculator--buttons__column">
                        <CalculatorButtonContainer
                            type="withoutBrackets"
                            text="4"
                            class="main-btn normal"
                        />
                        <CalculatorButtonContainer
                            type="withoutBrackets"
                            text="5"
                            class="main-btn normal"
                        />
                        <CalculatorButtonContainer
                            type="withoutBrackets"
                            text="6"
                            class="main-btn normal"
                        />
                        <CalculatorButtonContainer
                            type="withoutBrackets"
                            text="&#8722;"
                            class="main-btn normal color-blue h4"
                        />
                    </div>
                    <div className="hero-calculator--buttons__column">
                        <CalculatorButtonContainer
                            type="withoutBrackets"
                            text="7"
                            class="main-btn normal"
                        />
                        <CalculatorButtonContainer
                            type="withoutBrackets"
                            text="8"
                            class="main-btn normal"
                        />
                        <CalculatorButtonContainer
                            type="withoutBrackets"
                            text="9"
                            class="main-btn normal"
                        />
                        <CalculatorButtonContainer
                            type="withoutBrackets"
                            text="+"
                            class="main-btn normal color-blue h4"
                        />
                    </div>
                    <div className="hero-calculator--buttons__column">
                        <CalculatorButtonContainer
                            type="withoutBrackets"
                            text="."
                            class="main-btn normal"
                        />
                        <CalculatorButtonContainer
                            type="withoutBrackets"
                            text="0"
                            class="main-btn normal"
                        />
                        <CalculatorButtonContainer
                            type="withoutBrackets"
                            text=","
                            class="sec-btn normal"
                        />
                        <CalculatorButtonContainer
                            type="showResult"
                            text="="
                            class="main-btn color-blue h4"
                        />
                    </div>
                </div>
                <div className="hero-calculator--buttons__secondary">
                    <div className="separator">
                        <CalculatorButtonContainer
                            type="withoutBrackets"
                            text="e"
                            class="sec-btn normal"
                        />
                        <CalculatorButtonContainer
                            type="withBrackets"
                            text="sin"
                            class="sec-btn double"
                        />
                        <CalculatorButtonContainer
                            type="withBrackets"
                            text="cos"
                            class="sec-btn double"
                        />
                        <CalculatorButtonContainer
                            type="withBrackets"
                            text="tan"
                            class="sec-btn double"
                        />
                        <CalculatorButtonContainer
                            type="withBrackets"
                            text="log"
                            class="sec-btn double"
                        />
                        <CalculatorButtonContainer
                            type="withBrackets"
                            text="ln"
                            class="sec-btn double"
                        />
                        <CalculatorButtonContainer
                            type="withBrackets"
                            text="&#8730;"
                            class="sec-btn double"
                        />
                        <CalculatorButtonContainer
                            type="withoutBrackets"
                            text="&#x3C0;"
                            class="sec-btn double"
                        />
                    </div>
                    {functions}
                </div>
            </div>
        )
    }
}
