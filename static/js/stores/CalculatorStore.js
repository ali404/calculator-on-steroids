import React from "react"
import AppDispatcher from "../dispatcher/AppDispatcher"
import CalculatorConstants from "../constants/CalculatorConstants"
import FluxStore from './FluxStore'

class CalculatorStore extends FluxStore {

    constructor() {
        super()
        this._queryResult =  ""
        this._queryText =  ""
        this._isCalculatorResized =  false
        this._functions =  []
    }

    getQuery() {
        return this._queryText
    }

    getQueryResult() {
        return this._queryResult
    }

    appendToQuery(text) {
        this._queryText = this._queryText + text
        //this._queryResult = QueryComputer.calculateQuery(this._queryText)
    }

    deleteLastFromQuery() {
        this._queryText = this._queryText.slice(0, -1)
        //this._queryResult = QueryComputer.calculateQuery(this._queryText)
    }

    changeQueryText(text) {
        this._queryText = text
    }

    resizeCalculator() {
        this._isCalculatorResized = !(this._isCalculatorResized)
    }

    getCalculatorResizedState() {
        return this._isCalculatorResized ? "large" : "small"
    }

    getFunctions() {
        return this._functions
    }

    addFunction(funcName, funcBody) {
        var self = this
        this._functions.push({
            funcName: funcName,
            funcBody: funcBody,
            fullBody: "var " + funcName + " = " + funcBody,
            numOfParams: self._getParamsNum(funcBody)
        })
        console.log(this._functions)
    }

    _getParamsNum(funcBody) {
        //get param nums logic
        return 1
    }
}

let calculatorStore = new CalculatorStore()

calculatorStore.dispatchToken = AppDispatcher.register(payload => {

    let actionType = payload.actionType

    switch(actionType) {

        case CalculatorConstants.APPEND:
            CalculatorStore.appendToQuery(payload.text)
            CalculatorStore.emitChange()

            break

        case CalculatorConstants.DELETE_LAST:
            CalculatorStore.deleteLastFromQuery()
            CalculatorStore.emitChange()

            break

        case CalculatorConstants.CHANGE_TEXT:
            CalculatorStore.changeQueryText(payload.text)
            CalculatorStore.emitChange()

            break

        case CalculatorConstants.ADD_FUNCTION:
            CalculatorStore.addFunction(payload.funcName, payload.funcBody)
            CalculatorStore.emitChange()

            break

        case CalculatorConstants.RESIZE:
            CalculatorStore.resizeCalculator()
            CalculatorStore.emitChange()

            break
    }

    return true
})

export default calculatorStore

// TODO
// change into IIFE
// (private variables should be real private!)

var QueryComputer = {

    // we need this because if the current query gives error
    // we will get back to the initialQuery and delete the last
    // digit(which should be in the cache)
    // also we need this becouse after we got to a result,
    // we save to cache (which has a query key index)
    _initialQuery: undefined,
    _query: undefined,
    _cache: {},
    _result: undefined,

    calculateQuery: function(query) {
        this._initialiseVariables(query)

        if( this._isInCache(query) ) {
            return this._cache[query]
        }
        else {
            this._replaceFunctions()
            this._replaceConstants()
            this._replaceSymbols()
            this._addMultipliers()
            this._computeResult()
            this._addToCache()
            return this._result
        }
    },

    _initialiseVariables: function (query) {
        this._initialQuery = query
        this._query = query
        this._result = ""
    },

    _isInCache: function (query) {
        if ( this._cache[query] )
            return true
        else
            return false
    },

    _addToCache: function () {
        this._cache[this._initialQuery] = this._result
    },

    _replaceFunctions: function () {
        var query = this._query

        //i will have an array named functionCollection = []
        // functionCollection.forEach(function(func) {
        //     //func.numOfParams
        //     //func.funcRegex
        //
        // })

        this._query = query
    },

    _replaceConstants: function () {
        this._replaceWith("PI", "(Math.PI)")
        this._replaceWith("e", "(Math.E)")
    },

    _replaceSymbols: function () {
        this._replaceWith("x", "*")
        this._replaceWith("÷", "/")
    },

    _replaceNumbers: function () {
        var query = this._query

        query.replace(/([0-9]+|[0-9]*\.{1}[0-9]+)/, "($1)")

        this._query = query
    },

    _addMultipliers: function () {
        this._replaceWith(")(", ")*(")
    },

    _replaceWith: function (initialChar, replacedChar) {
        var query = this._query
        var currPos = 0
        while(currPos < query.length) {
            if(query[currPos] == initialChar) {
                query = query.slice(0, currPos) + replacedChar + query.slice(-1*(length-currPos) + 1)
                currPos += replacedChar.length
            }
            else {
                currPos += 1
            }
        }
        this._query = query
    },

    _computeResult: function () {
        //i have to catch errors here
        //more importantly, if there are errors
        //how do i send them to the view?
        this._result = eval(this._query)
    }
}
