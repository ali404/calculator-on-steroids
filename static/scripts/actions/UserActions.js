import React from "react"
import AppDispatcher from "../dispatcher/AppDispatcher"
import UserConstants from "../constants/UserConstants"
import $ from "jquery"

var UserActions = {

    login: function(user) {
        var _message = ""

        $.post("/api/user/login", user)
            .done(function(response) {
                _message = "success"
            })
            .fail(function(response) {
                _message = "fail"
            })
            .then(function(){
                AppDispatcher.dispatch({
                    actionType: UserConstants.LOGIN,
                    message: _message
                })
            })
    },

    signup: function(user) {
        var message = ""

        $.post("api/user", user)
            .done(function(response) {
                message = "success"
            })
            .fail(function(response) {
                message = "fail"
            })

        AppDispatcher.dispatch({
            actionType: UserConstants.SIGNUP,
            message: _message
        })
    }
}

module.exports = UserActions
