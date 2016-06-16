import React from 'react'
import Base from '../_helpers/BaseComponent'

import FunctionDisplayer from './FunctionDisplayer.react'

export default class FunctionsDisplayer extends Base {
    constructor() {
        super()
    }

    render() {
        let functions = []
        this.props.functions.forEach((func) => {
            functions.push(
                <FunctionDisplayer
                    key={func.id}
                    functionName={func.functionName}
                    functionBody={func.functionBody}
                />
            )
        })

        return (
            <div>
                {functions}
            </div>
        )
    }
}
