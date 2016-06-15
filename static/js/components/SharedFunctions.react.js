import React from "react"
import Base from './_helpers/BaseComponent'

import FunctionDisplayerContainer
    from './FunctionDisplayer/FunctionDisplayerContainer.react'

export default class Functions extends Base {

    constructor() {
        super()
    }

    render() {
        return (
            <div className="pure-g">
                <div className="h6">Functions</div>
                <FunctionDisplayerContainer />
            </div>
        )
    }
}
