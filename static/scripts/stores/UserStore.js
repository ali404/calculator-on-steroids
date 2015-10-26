import React from "react"
import AppDispatcher from "../dispatcher/AppDispatcher"
import UserConstants from "../constants/UserConstants"
import assign from "object-assign"
import {EventEmitter} from "events"

const CHANGE_EVENT = "change"

var UserStore = assign({}, EventEmitter.prototype, {

    _username: "",
    _id: "",
    _functions: "",
    _isLoggedIn: false,
    _message: "",
    _loginState: "",

    getUserDetails: function() {
        return {
            username: this._username,
            id: this._id,
            functions: this._functions,
            isLoggedIn: this._isLoggedIn
        }
    },

    getLoginState: function() {
        return this._loginState
    },

    getLoginMessage: function() {
        return this._message
    },

    sendSuccessMessage: function() {
        this._message = "user logged in"
        this._loginState = "success"
        this._isLoggedIn = true
    },

    sendError: function() {
        this._message = "user failed to log in"
        this._loginState = "fail"
    },

    isLoggedIn: function() {
        return this._isLoggedIn
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback)
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback)
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT)
    }

})

AppDispatcher.register(function(action) {
    switch(action.actionType) {

        case UserConstants.LOGIN:
            if("success" === action.message) {
                UserStore.sendSuccessMessage()
                UserStore.emitChange()
            }
            else if("fail" === action.message) {
                UserStore.sendErrorMessage()
                UserStore.emitChange()
            }

            break

        case UserConstants.SIGNUP:

            break
    }
})

module.exports = UserStore
