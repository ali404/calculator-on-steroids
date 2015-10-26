import React from "react"
import AppDispatcher from "../dispatcher/AppDispatcher"
import CalculatorConstants from "../constants/CalculatorConstants"
import assign from "object-assign"
import { EventEmitter } from "events"
import UserStore from "../stores/UserStore"

const CHANGE_EVENT = "change"

var CalculatorStore = assign({}, EventEmitter.prototype, {

    _queryResult: "",
    _queryText: "",
    _functions: [],

    getQuery: function() {
        return this._queryText
    },

    getQueryResult: function() {
        return this._queryResult
    },

    appendToQuery: function(text) {
        this._queryText = this._queryText + text
        //this._queryResult = QueryComputer.calculateQuery(this._queryText)
    },

    deleteLastFromQuery: function() {
        this._queryText = this._queryText.slice(0, -1)
        //this._queryResult = QueryComputer.calculateQuery(this._queryText)
    },

    changeQueryText: function(text) {
        this._queryText = text
    },

    getFunctions: function() {
        return this._functions
    },

    addFunction: function(funcName, funcBody) {
        var self = this
        this._functions.push({
            funcName: funcName,
            funcBody: funcBody,
            numOfParams: self._getParamsNum(funcBody)
        })
        console.log(this._functions)
    },

    _getParamsNum: function(funcBody) {
        //get param nums logic
        return 1
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

    _initialiseVariables: function(query) {
        this._initialQuery = query
        this._query = query
        this._result = ""
    },

    _isInCache: function(query) {
        if ( this._cache[query] )
            return true
        else
            return false
    },

    _addToCache: function() {
        this._cache[this._initialQuery] = this._result
    },

    _replaceFunctions: function() {
        var query = this._query

        //i will have an array named functionCollection = []
        // functionCollection.forEach(function(func) {
        //     //func.numOfParams
        //     //func.funcRegex
        //
        // })

        this._query = query
    },

    _replaceConstants: function() {
        this._replaceWith("PI", "(Math.PI)")
        this._replaceWith("e", "(Math.E)")
    },

    _replaceSymbols: function() {
        this._replaceWith("x", "*")
        this._replaceWith("÷", "/")
    },

    _replaceNumbers: function() {
        var query = this._query

        query.replace(/([0-9]+|[0-9]*\.{1}[0-9]+)/, "($1)")

        this._query = query
    },

    _addMultipliers: function() {
        this._replaceWith(")(", ")*(")
    },

    _replaceWith: function(initialChar, replacedChar) {
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
        this._result = eval(this._query)
    }
}

AppDispatcher.register(function(action) {

    switch(action.actionType) {

        case CalculatorConstants.APPEND:
            CalculatorStore.appendToQuery(action.text)
            CalculatorStore.emitChange()

            break

        case CalculatorConstants.DELETE_LAST:
            CalculatorStore.deleteLastFromQuery()
            CalculatorStore.emitChange()

            break

        case CalculatorConstants.CHANGE_TEXT:
            CalculatorStore.changeQueryText(action.text)
            CalculatorStore.emitChange()

            break

        case CalculatorConstants.ADD_FUNCTION:
            CalculatorStore.addFunction(action.funcName, action.funcBody)
            CalculatorStore.emitChange()

            break
    }
})

module.exports = CalculatorStore
