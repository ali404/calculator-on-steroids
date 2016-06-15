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
                <div className="pure-g">
                    <div className="h6">Your functions: </div>
                    </div>
                <div className="pure-g">
                    <FunctionsDisplayerContainer />
                </div>
            </section>
        )
    }
}
