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

    _updateUserDetails: function(user) {
        this._id = user.id
        this._username = user.username
        this._functions = user.functions
        this._isLoggedIn = user.isLoggedIn
    },

    getLoginState: function() {
        return this._loginState
    },

    getLoginMessage: function() {
        return this._message
    },

    _sendSuccessMessage: function(username) {
        this._message = "user logged in"
        this._loginState = "success"
        this._username = username
        this._isLoggedIn = true
    },

    _sendError: function() {
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
            if("success" === action.data.message) {
                UserStore._sendSuccessMessage(action.data.username)
                UserStore.emitChange()
            }
            else if("fail" === action.data.message) {
                UserStore._sendErrorMessage()
                UserStore.emitChange()
            }

            break

        case UserConstants.SIGNUP:

            break

        case UserConstants.GET:
            if( undefined === actions.user ) {
                return new Error()
            }
            else {
                UserStore._updateUserDetails(actions.user)
                UserStore.emitChange()
            }
    }
})

module.exports = UserStore
