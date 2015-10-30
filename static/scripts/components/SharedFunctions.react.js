import React from "react"
import AuthenticatedComponent from "./helpers/AuthenticatedComponent"

export default class Functions extends AuthenticatedComponent {

    constructor(props, context) {
        super(props, context)
    }

    render() {
        return (
            <div>Shared Functions</div>
        )
    }
}
