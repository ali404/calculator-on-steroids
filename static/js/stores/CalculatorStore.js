import React from "react"
import FluxStore from './FluxStore'

import AppDispatcher from "../dispatcher/AppDispatcher"

import CalculatorConstants from "../constants/CalculatorConstants"
import UserConstants from '../constants/UserConstants'

class CalculatorStore extends FluxStore {

    constructor() {
        super()

        this._queryResult =  0
        this._queryText =  ""
        this._isCalculatorResized =  false

        Math.radians = function(degrees) {
            return degrees * Math.PI / 180;
        }

        Math.sin2 = function(a) {
            return Math.sin(Math.radians(a))
        }

        Math.cos2 = function(a) {
            return Math.cos(Math.radians(a))
        }

        Math.tan2 = function(a) {
            return Math.tan(Math.radians(a))
        }
    }

    getQueryText() {
        return this._queryText
    }

    getQueryResult() {
        return this._queryResult || 0
    }

    appendToQuery(text) {
        this._queryText = this._queryText + text
        this._queryResult = QueryComputer.calculateQuery(this._queryText)
    }

    deleteLastFromQuery() {
        this._queryText = this._queryText.slice(0, -1)
        this._queryResult = QueryComputer.calculateQuery(this._queryText)
    }

    changeQueryText(text) {
        this._queryText = text
        this._queryResult = QueryComputer.calculateQuery(this._queryText)
    }

    resizeCalculator() {
        this._isCalculatorResized = !(this._isCalculatorResized)
    }

    getCalculatorResizedState() {
        return this._isCalculatorResized
    }
}

let calculatorStore = new CalculatorStore()

calculatorStore.dispatchToken = AppDispatcher.register(payload => {

    let actionType = payload.actionType

    switch(actionType) {

        case CalculatorConstants.APPEND:
            calculatorStore.appendToQuery(payload.text)
            calculatorStore.emitChange()

            break

        case CalculatorConstants.DELETE_LAST:
            calculatorStore.deleteLastFromQuery()
            calculatorStore.emitChange()

            break

        case CalculatorConstants.CHANGE_TEXT:
            calculatorStore.changeQueryText(payload.text)
            calculatorStore.emitChange()

            break

        case CalculatorConstants.RESIZE:
            calculatorStore.resizeCalculator()
            calculatorStore.emitChange()

            break

        case UserConstants.LOGOUT:
            calculatorStore.changeQueryText('')
            calculatorStore.emitChange()

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
    _functionCollection: [
        ['sin', 'Math.sin2'],
        ['cos', 'Math.cos2'],
        ['tan', 'Math.tan2'],
        ['ln', 'Math.log'],
        ['log', 'Math.log10']
    ],

    calculateQuery: function(query) {
        this._initialiseVariables(query)

        if(this._isInCache(query)) {
            return this._cache[query]
        }
        else {
            this._replaceFunctions()
            this._replaceConstants()
            this._replaceSymbols()
            this._addMultipliers()

            this._computeResult()
            this._stripResult()
            this._addToCache()

            return this._result
        }
    },

    _initialiseVariables: function (query) {
        this._initialQuery = query
        this._query = query
        this._result = ''
    },

    _isInCache: function (query) {
        if ( this._cache[query] )
            return true
        else
            return false
    },

    _addToCache: function() {
        this._cache[this._initialQuery] = this._result
    },

    _replaceFunctions: function () {
        var query = this._query

        this._functionCollection.forEach((func) => {
            query = query.replace(func[0], func[1])
        })

        this._query = query
    },

    _replaceConstants: function () {
        this._replaceWith("π", "(Math.PI)")
        this._replaceWith("e", "(Math.E)")
    },

    _replaceSymbols: function () {
        this._replaceWith('×', '*')
        this._replaceWith('÷', '/')
        this._replaceWith('−', '-')
        this._replaceWith('√', 'Math.sqrt')
    },

    _replaceNumbers: function () {
        var query = this._query

        query.replace(/([0-9]+|[0-9]*\.{1}[0-9]+)/, "($1)")

        this._query = query
    },

    _addMultipliers: function () {
        this._query = this._query.replace(')(', ')*(')
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

    _computeResult: function() {
        //i have to catch errors here
        //more importantly, if there are errors
        //how do i send them to the view?
        try {
            this._result = eval(this._query)
        }
        catch(e) {

        }
    },

    _stripResult() {
        this._result = Math.round(this._result * 100000) / 100000
    }
}
