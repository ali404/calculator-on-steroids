import React from 'react'
import Base from '../_helpers/BaseComponent'

import FunctionScript from './FunctionScript.react'

import FunctionStore from '../../stores/FunctionStore'

export default class FunctionSriptsContainer extends Base {
    constructor() {
        super()
        this._bind(
            '_onChange',
            '_getFunctionScriptState'
        )

        this.state = this._getFunctionScriptState()
    }

    componentDidMount() {
        FunctionStore.addChangeListener(this._onChange)
    }

    componentWillUnmount() {
        FunctionStore.removeChangeListener(this._onChange)
    }

    _onChange() {
        this.setState(this._getFunctionScriptState())
    }

    _getFunctionScriptState() {
        return {
            functions: FunctionStore.getFunctions()
        }
    }

    render() {
        let functions = []
        for(let funcKey in this.state.functions) {
            let func = this.state.functions[funcKey]

            functions.push(
                <FunctionScript
                    key={func.id}
                    id={func.id}
                    fullBody={func.fullBody}
                />
            )
        }

        return (
            <div style={{display: 'none'}}>
                {functions}
            </div>
        )
    }
}
