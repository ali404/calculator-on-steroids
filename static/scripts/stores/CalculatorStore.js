import React from "react"
import AppDispatcher from "../dispatcher/AppDispatcher"
import CalculatorConstants from "../constants/CalculatorConstants"
import assign from "object-assign"
var EventEmitter = require("events").EventEmitter


const CHANGE_EVENT = "change"

var CalculatorStore = assign({}, EventEmitter.prototype, {

    _queryResult: "",
    _queryText: "",

    getQuery: function() {
        return this._queryText
    },

    getQueryResult: function() {
        return this._queryResult
    },

    appendToQuery: function(text) {
        this._queryText = this._queryText + text
        this._queryResult = QueryComputer.calculateQuery(this._queryText)
    },

    deleteLastFromQuery: function() {
        this._queryText = this._queryText.slice(0, -1)
        this._queryResult = QueryComputer.calculateQuery(this._queryText)
    },

    getQueryResult: function() {
        return this._queryResult
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback)
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback)
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT)
    },
})

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
        _initialiseVariables(query)

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

    _initialiseVariables: function(query) {
        this._initialQuery = query
        this._query = query
        this._result = ""
    },

    _isInCache: function(query) {
        if ( _cache[query] )
            return true
        else
            return false
    },

    _addToCache: function() {
        _cache[this._initialQuery] = this._result
    },

    _replaceFunctions: function() {
        query = this._query

        //i will have an array named functionCollection = []
        functionCollection.forEach(function(func) {
            //func.numOfParams
            //func.funcRegex

        })

        this._query = query
    },

    _replaceConstants: function() {
        var query = this._query
        var currPos = 0
        // it is 3 becouse instead of 1 we add 2 more characters
        const SHIFT_TO_NEXT_WHEN_FOUND = 3
        const SHIFT_TO_NEXT_WHEN_NOT_FOUND = 1

        while( currPos < query.length ) {
            if( query[currPos] == 'PI' ) {
                currPos += SHIFT_TO_NEXT_WHEN_FOUND
                //replace currPos with PI
            }
            else if (query[currPos] == 'e') {
                currPos += SHIFT_TO_NEXT_WHEN_FOUND
                //repalce currPos with e
            }
            else {
                currPos += SHIFT_TO_NEXT_WHEN_NOT_FOUND
            }
        }

        this._query = query
    },

    _replaceSymbols: function() {
        var query = this._query

        query.replace("/(x)/", "*")
        query.replace("/(÷)/", "/")

        this._query = query
    },

    _replaceNumbers: function() {
        var query = this._query

        query.replace(..., "(&1)")

        this._query = query
    },

    _addMultipliers: function() {
        var query = this._query

        query.replace(")(", ")*(")

        this._query = query
    },

    _computeResult: function() {
        //i have to catch errors here
        //more importantly, if there are errors
        //how do i send them to the view?
        this._result = eval(this._query)
    }
}

AppDispatcher.register(function(action) {

    switch(action.actionType) {

        case CalculatorConstants.CALCULATOR_APPEND:
            CalculatorStore.appendToQuery(action.text)
            CalculatorStore.emitChange()

            break

        case CalculatorConstants.CALCULATOR_DELETE_LAST:
            CalculatorStore.deleteLastFromQuery()
            CalculatorStore.emitChange()

            break
    }
})

module.exports = CalculatorStore
