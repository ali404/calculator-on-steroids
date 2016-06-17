import React from 'react'
import Base from '../_helpers/BaseComponent'

import FunctionDisplayer from './FunctionDisplayer.react'
import {Link} from 'react-router'

export default class FunctionsDisplayer extends Base {
    constructor() {
        super()
    }

    render() {
        let functions = []
        functions.push(
            <p className="h6">Your functions:</p>
        )

        if(this.props.functions.length !== 0) {
            this.props.functions.forEach((func) => {
                functions.push(
                    <FunctionDisplayer
                        key={func.id}
                        functionName={func.functionName}
                        functionBody={func.functionBody}
                    />
                )
            })
        }
        else {
            functions = (
                <p>
                    <p className="h6">You seem to don't have any functions</p>
                    <Link to="/">
                        Click here to go to homepage and add function
                    </Link>
                </p>
            )
        }

        return (
            <div>
                {functions}
            </div>
        )
    }
}
