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

    updateUserDetails: function(username) {
        var user
        var _username = username || ""

        $.get("/api/user", {username: _username})
            .done(function(response) {
                user = response
            })
            .fail(function(response) {
                user = undefined
            })
            .then(function(){
                console.log(user)
                AppDispatcher.dispatch({
                    actionType: UserConstants.GET,
                    user: user
                })
            })
    }
}

module.exports = UserActions
