import React from 'react'
import Base from '../_helpers/BaseComponent'

export default class FunctionDisplayer extends Base {
    constructor() {
        super()
    }

    render() {
        return (
            <div className="function">
                <p className="h4 function-title">{this.props.functionName}</p>
                <pre>{this.props.functionBody}</pre>
            </div>
        )
    }
}
