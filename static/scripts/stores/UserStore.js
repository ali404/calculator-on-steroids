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
    isLoggedIn: "",

    getUserDetails: function() {
        return {
            username: this._username,
            id: this._id,
            functions: this._functions,
            isLoggedIn: this._isLoggedIn
        }
    },


    emitChange: function() {
        this.emit(CHANGE_EVENT)
    }

})

AppDispatcher.register(function(action) {
    switch(action.actionType) {

        case UserConstants.LOGIN:
            if("success" === action.message) {

            }
            else if( "fail" === action.message ) {

            }

            break

        case UserConstants.SIGNUP:

            break
    }
})

module.exports = UserStore
