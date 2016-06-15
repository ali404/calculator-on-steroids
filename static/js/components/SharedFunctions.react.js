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
            <section>
                <div className="grid">
                    <div className="h6">Your functions: </div>
                    </div>
                <div className="grid">
                    <FunctionsDisplayerContainer />
                </div>
            </section>
        )
    }
}
