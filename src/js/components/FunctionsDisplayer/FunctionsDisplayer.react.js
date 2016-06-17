import React from 'react'
import Base from '../_helpers/BaseComponent'

import FunctionDisplayer from './FunctionDisplayer.react'
import {Link} from 'react-router'

export default class FunctionsDisplayer extends Base {
    constructor() {
        super()
    }

    render() {
        let functions = ''

        if(this.props.functions.length !== 0) {
            functions = []
            functions.push(
                <p className="h6" key="title">Your functions:</p>
            )
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
                <div>
                    <p className="h6">You seem to don't have any functions</p>
                    <Link to="/" className="color-blue link">
                        Go to homepage and add a function
                    </Link>
                </div>
            )
        }

        return (
            <section>
                {functions}
            </section>
        )
    }
}
