import React from "react"
import AppDispatcher from "../dispatcher/AppDispatcher"
import UserConstants from "../constants/UserConstants"
import $ from "jquery"

var UserActions = {

    login: function(user) {
        var _message
        var _user = {}

        $.post("/api/user/login", user, "JSON")
            .done(function(response) {
                _user = response
                _message = "success"
            })
            .fail(function(response) {
                _message = "fail"
            })
            .then(function(){
                AppDispatcher.dispatch({
                    actionType: UserConstants.LOGIN,
                    data: {
                        message: _message,
                        user: _user
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
            .then(function() {
                AppDispatcher.dispatch({
                    actionType: UserConstants.SIGNUP,
                    message: message
                })
            })
    },

    logout: function() {
        var message

        $.ajax({
            url: "/api/user/login",
            type: "DELETE"
        })
        .done(function(response) {
            message = "logout success"
        })
        .fail(function(response) {
            message = "error"
        })
        .then(function() {
            AppDispatcher.dispatch({
                actionType: UserConstants.LOGOUT,
                message: message
            })
        })
    },

    getUserDetails: function(username) {
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
                AppDispatcher.dispatch({
                    actionType: UserConstants.GET,
                    user: user
                })
            })
    }
}

module.exports = UserActions
