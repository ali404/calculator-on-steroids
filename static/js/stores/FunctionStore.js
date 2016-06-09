import FluxStore from './FluxStore'
import FunctionConstants from '../constants/FunctionConstants'

import AppDispatcher from '../dispatcher/AppDispatcher'

class FunctionStore extends FluxStore {

    constructor() {
        super()
        this._functions = []
    }

    addFunction(functionName, functionBody) {
        var self = this
        let id = this._createRandId(10)
        this._functions.push({
            id: id,
            functionName: functionName,
            functionBody: functionBody,
            fullBody: "var " + functionName + " = " + functionBody,
            numOfParams: self._getParamsNum(functionBody)
        })
        console.log(this._functions)
    }

    _getParamsNum(functionBody) {
        //get param nums logic
        return 1
    }

    _createRandId(length) {
        let randId = ""
        for(let i=1; i<length; i++) {
            randId += Math.floor(Math.random() * 10)
        }

        return randId
    }

    getFunctions() {
        return this._functions
    }
}

let functionStore = new FunctionStore()

functionStore.dispatchToken = AppDispatcher.register(payload => {
    let actionType = payload.actionType

    switch(actionType) {
        case FunctionConstants.ADD_FUNCTION:
            functionStore.addFunction(
                payload.functionName,
                payload.functionBody
            )
            functionStore.emitChange()

            break
    }

    return true
})

export default functionStore
