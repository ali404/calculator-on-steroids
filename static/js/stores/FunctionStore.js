import FluxStore from './FluxStore'
import FunctionConstants from '../constants/FunctionConstants'

import AppDispatcher from '../dispatcher/AppDispatcher'

import UserConstants from '../constants/UserConstants'

class FunctionStore extends FluxStore {

    constructor() {
        super()

        this._databaseFunctions = []
        this._localFunctions = []
        this._functions = []
    }

    addDatabaseFunction(functionName, functionBody) {
        this.addFunction('_databaseFunctions', functionName, functionBody)
    }

    addLocalFunction(functionName, functionBody) {
        this.addFunction('_localFunctions', functionName, functionBody)
    }

    addFunction(where, functionName, functionBody) {
        var self = this
        // be aware that functions in database have _id
        let id = this._createRandId(10)

        this[where].push({
            id: id,
            functionName: functionName,
            functionBody: functionBody,
            fullBody: "var " + functionName + " = " + functionBody,
            numOfParams: self._getParamsNum(functionBody)
        })

        this._mergeFunctions()

        console.log(this._functions)
    }

    // need to rewrite this
    addDatabaseFunctions(functions) {
        functions.forEach((func) => {
            this.addFunction(
                '_databaseFunctions',
                func.funcName,
                func.funcBody
            )
        })
    }

    // in response to a user logout
    deleteDatabaseFunctions() {
        this._databaseFunctions = []

        this._mergeFunctions()
    }

    _mergeFunctions() {
        this._functions = []

        this._databaseFunctions.forEach((func) => {
            this._functions.push(func)
        })

        this._localFunctions.forEach((func) => {
            this._functions.push(func)
        })
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
        case FunctionConstants.ADD_LOCAL_FUNCTION:
            functionStore.addLocalFunction(
                payload.functionName,
                payload.functionBody
            )
            functionStore.emitChange()

            break

        case FunctionConstants.ADD_DATABASE_FUNCTION:
            functionStore.addDatabaseFunction(
                payload.functionName,
                payload.functionBody
            )
            functionStore.emitChange()

            break

        case FunctionConstants.GET_FUNCTIONS:
            functionStore.addDatabaseFunctions(
                JSON.parse(payload.functions)
            )
            functionStore.emitChange()

            break

        case UserConstants.LOGOUT:

            functionStore.deleteDatabaseFunctions()
            functionStore.emitChange()

            break

        case UserConstants.LOGIN:
            functionStore.addDatabaseFunctions(
                JSON.parse(payload.user).functions
            )
            functionStore.emitChange()

            break
    }

    return true
})

export default functionStore
