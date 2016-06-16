import React from 'react'
import Base from '../_helpers/BaseComponent'

import FunctionStore from '../../stores/FunctionStore'
import FunctionsDisplayer from './FunctionsDisplayer.react'

export default class FunctionsDisplayerContainer extends Base {
    constructor() {
        super()
        this._bind(
            '_onChange',
            '_getFunctionDisplayerState'
        )

        this.state = this._getFunctionDisplayerState()
    }

    _getFunctionDisplayerState() {
        return {
            functions: FunctionStore.getFunctions()
        }
    }

    componentDidMount() {
        FunctionStore.addChangeListener(this._onChange)
    }

    componentWillUnmount() {
        FunctionStore.removeChangeListener(this._onChange)
    }

    _onChange() {
        this.setState(this._getFunctionDisplayerState())
    }

    render() {
        return (
            <FunctionsDisplayer
                functions={this.state.functions}
            />
        )
    }
}
