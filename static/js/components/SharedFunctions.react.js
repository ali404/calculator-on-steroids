import React from "react"
import AuthenticatedComponent from "./_helpers/AuthenticatedComponent"

export default class Functions extends AuthenticatedComponent {

    constructor(props, context) {
        super(props, context)
    }

    render() {
        return (
            <div className="pure-g">
                <div className="h6">Shared Functions</div>
            </div>
        )
    }
}
