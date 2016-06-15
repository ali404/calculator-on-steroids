import React from 'react'
import Base from '../_helpers/BaseComponent'

import FunctionStore from '../../stores/FunctionStore'
import FunctionDisplayer from './FunctionDisplayer.react'

export default class FunctionDisplayerContainer extends Base {
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
            <FunctionDisplayer
                functions={this.state.functions}
            />
        )
    }
}
