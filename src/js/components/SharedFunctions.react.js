import React from "react"
import Base from './_helpers/BaseComponent'

import FunctionsDisplayerContainer
    from './FunctionsDisplayer/FunctionsDisplayerContainer.react'

export default class Functions extends Base {

    constructor() {
        super()
    }

    render() {
        return (
            <div className="grid">
                <div className="grid-narrow">
                    <div className="h6">Your functions: </div>
                    <FunctionsDisplayerContainer />
                </div>
            </div>
        )
    }
}
