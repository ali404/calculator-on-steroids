import React from 'react'
import Base from '../_helpers/BaseComponent'

export default class FunctionDisplayer extends Base {
    constructor() {
        super()
    }

    render() {
        let functions = []
        this.props.functions.forEach((func) => {
            functions.push(
                <div key={func.id}>
                    <p className="h4">{func.functionName}</p>
                    <pre>{func.functionBody}</pre>
                </div>
            )
        })

        return (
            <div>
                {functions}
            </div>
        )
    }
}
