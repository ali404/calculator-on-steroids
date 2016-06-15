import React from "react"
import AppDispatcher from "../dispatcher/AppDispatcher"
import UserConstants from "../constants/UserConstants"
import $ from "jquery"

export default class UserActions {

    static login(user) {
        var _message
        var _user = {}

        $.post("/api/user/login", user)
            .fail(function(xhr, textStatus, errorThrown) {
                _message = "fail"
            })
            .done(function(res) {
                _user = JSON.parse(JSON.stringify(res))
                _message = "success"
            })
            .always(function() {
                AppDispatcher.dispatch({
                    actionType: UserConstants.LOGIN,
                    message: _message,
                    user: _user
                })
            })
    }

    static signup(user) {
        var _message = ''

        $.post("/api/user", user)
            .done(function(res) {
                _message = "success"
            })
            .fail(function(res) {
                _message = "fail"
            })
            .always(function() {
                AppDispatcher.dispatch({
                    actionType: UserConstants.SIGNUP,
                    message: _message
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

    static getUserDetails() {
        var _user

        $.get("/api/me")
            .done(function(res) {
                _user = res
            })
            .fail(function(xhr, textStatus, errorThrown) {
                // catch the error maybe
                // anyway it will pass to the dispatcher an undefined user
            })
            .always(function() {
                AppDispatcher.dispatch({
                    actionType: UserConstants.GET,
                    user: _user
                })
            })
    }
}
