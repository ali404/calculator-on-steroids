import React from "react"
import AppDispatcher from "../dispatcher/AppDispatcher"
import UserConstants from "../constants/UserConstants"
import $ from "jquery"

var UserActions = {

    login: function(user) {
        var _message
        var _username

        $.post("/api/user/login", user)
            .done(function(response) {
                _message = "success"
                _username = user.username
            })
            .fail(function(response) {
                _message = "fail"
                _username = undefined
            })
            .then(function(){
                AppDispatcher.dispatch({
                    actionType: UserConstants.LOGIN,
                    data: {
                        message: _message,
                        username: _username
                    }
                })
            })
    },

    signup: function(user) {
        var message = ""

        $.post("/api/user", user)
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
    },

    getUserDetails: function(username) {
        var user

        $.get("/api/user", username || {})
            .done(function(response) {
                user = response
            })
            .fail(function(response) {
                user = undefined
            })
            .then(function(){
                AppDispatcher.dispatch({
                    actionType: UserConstants.GET,
                    user: {
                        username: user.username,
                        functions: user.functions,
                        isLoggedIn: user.isLoggedIn,
                    }
                })
            })
    }
}

module.exports = UserActions
