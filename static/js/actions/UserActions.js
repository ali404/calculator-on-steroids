import React from "react"
import AppDispatcher from "../dispatcher/AppDispatcher"
import UserConstants from "../constants/UserConstants"
import $ from "jquery"

export default class UserActions {

    static login(user) {
        var _message
        var _user = {}

        $.post("/api/user/login", user)
            .done(function(res) {
                _user = JSON.parse(JSON.stringify(res))
                _message = "success"
            })
            .fail(function(res) {
                _message = "fail"
            })
            .then(function() {
                AppDispatcher.dispatch({
                    actionType: UserConstants.LOGIN,
                    message: _message,
                    user: _user
                })
            })
    }

    static signup(user) {
        var message = ""

        $.post("/api/user", user)
            .done(function(res) {
                message = "success"
            })
            .fail(function(res) {
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
        .done(function(res) {
            message = "logout success"
        })
        .fail(function(res) {
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
            .done(function(res) {
                if("no user found" == res) {
                    shouldDispatch = false
                }
                else {
                    shouldDispatch = true
                    user = res
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
