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

        this._isFunctionNameValid = false
        this._isFunctionBodyValid = false
        this._isCreationSuccessful = undefined
    }

    getFunctionNameState() {
        return this._isFunctionNameValid
    }

    getFunctionBodyState() {
        return this._isFunctionBodyValid
    }

    getFunctionCreationState() {
        return this._isCreationSuccessful
    }

    getFunctionState() {
        return this._isFunctionValid
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

        if(
            this.isFunctionNameValid(functionName)
            && this.isFunctionBodyValid(functionBody)
            && this.isFunctionUnique(functionName)
        ) {
            this[where].push({
                id: id,
                functionName: functionName,
                functionBody: functionBody,
                fullBody: "var " + functionName + " = " + functionBody
            })

            this._mergeFunctions()
            this._isCreationSuccessful = true
        }
        else {
            this._isCreationSuccessful = false
        }

        this._isFunctionNameValid = false
        this._isFunctionBodyValid = false
    }

    isFunctionNameValid(functionName) {
        this._isFunctionNameValid = false
        if(functionName.length > 15 || functionName.length === 0) {
            return false
        }
        else if(/[^a-zA-Z]+/g.test(functionName)) {
            return false
        }
        else {
            this._isFunctionNameValid = true
            return true
        }
    }

    isFunctionBodyValid(functionBody) {
        this._isFunctionBodyValid = false
        try {
            eval("var a = (" + functionBody.trim() + ")()")
        }
        catch (e) {
            return false
        }

        this._isFunctionBodyValid = true
        return true
    }

    isFunctionUnique(functionName) {
        let isUnique = true
        this._functions.forEach((func) => {
            if(func.functionName === functionName) {
                isUnique = false
            }
        })

        return isUnique
    }

    // need to rewrite this
    addDatabaseFunctions(functions) {
        if(functions) {
            functions.forEach((func) => {
                this.addFunction(
                    '_databaseFunctions',
                    func.funcName,
                    func.funcBody
                )
            })
        }
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
            console.log(2)
            functionStore.addDatabaseFunction(
                payload.functionName,
                payload.functionBody
            )
            functionStore.emitChange()

            break

        case FunctionConstants.GET_FUNCTIONS:
            functionStore.addDatabaseFunctions(
                payload.functions
            )
            functionStore.emitChange()

            break

        case UserConstants.LOGOUT:

            functionStore.deleteDatabaseFunctions()
            functionStore.emitChange()

            break

        case UserConstants.LOGIN:
            functionStore.addDatabaseFunctions(
                payload.user.functions
            )
            functionStore.emitChange()

            break
    }

    return true
})

export default functionStore
