import React from "react"
import AppDispatcher from "../dispatcher/AppDispatcher"
import UserConstants from "../constants/UserConstants"
import assign from "object-assign"
import {EventEmitter} from "events"

const CHANGE_EVENT = "change"

var UserStore = assign({}, EventEmitter.prototype, {

    _username: "",
    _id: "",
    _functions: [],
    _isLoggedIn: false,
    _message: "",
    _loginState: "",
    _logoutState: "",

    getUserDetails: function() {
        return {
            username: this._username,
            id: this._id,
            functions: this._functions,
            isLoggedIn: this._isLoggedIn
        }
    },

    _updateUserDetails: function(user) {
        user = JSON.parse(user)
        console.log(user)
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

    _sendSuccessMessage: function() {
        this._message = "user logged in"
        this._loginState = "success"
    },

    _sendError: function() {
        this._message = "user failed to log in"
        this._loginState = "fail"
    },

    isLoggedIn: function() {
        return this._isLoggedIn
    },

    _logout: function() {
        this._username = ""
        this._id = ""
        this._isLoggedIn = false
        this._functions = []
    },

    _addFunction: function(func) {
        this._functions.push(func)
    },

    getFunctions: function() {
        return this._functions
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
                UserStore._sendSuccessMessage()
                UserStore._updateUserDetails(action.data.user)
                UserStore.emitChange()
            }
            else if("fail" === action.data.message) {
                UserStore._sendErrorMessage()
                UserStore.emitChange()
            }

            break

        case UserConstants.LOGOUT:
            if("logout success" === action.message) {
                UserStore._logout()
                UserStore.emitChange()
            }
            else {
                console.log("logout failed")
            }

            break

        case UserConstants.SIGNUP:

            break

        case UserConstants.GET:
            if( undefined === action.user ) {
                return new Error()
            }
            else {
                UserStore._updateUserDetails(action.user)
                UserStore.emitChange()
            }

        case UserConstants.ADD_FUNCTION:
            UserStore._addFunction(action.func)
            UserStore.emitChange()
    }
})

module.exports = UserStore
