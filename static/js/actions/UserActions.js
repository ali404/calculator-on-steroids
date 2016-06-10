import React from "react"
import AppDispatcher from "../dispatcher/AppDispatcher"
import UserConstants from "../constants/UserConstants"
import $ from "jquery"

export default class UserActions {

    static login(user) {
        var _message
        var _user = {}

        $.post("/api/user/login", user)
            .done(function(response) {
                _user = JSON.parse(JSON.stringify(response))
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
    }

    static signup(user) {
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
    }

    static logout() {
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
    }

    static getUserDetails(username) {
        var user
        var _username = username || ""
        var shouldDispatch = false

        $.get("/api/user", {username: _username})
            .done(function(response) {
                if("no user found" == response) {
                    shouldDispatch = false
                }
                else {
                    shouldDispatch = true
                    user = response
                }
            })
            .fail(function(response) {
                user = {}
            })
            .then(function() {
                if(shouldDispatch) {
                    AppDispatcher.dispatch({
                        actionType: UserConstants.GET,
                        user: user
                    })
                }
            })
    }
}
