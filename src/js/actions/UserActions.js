import React from "react"
import AppDispatcher from "../dispatcher/AppDispatcher"
import UserConstants from "../constants/UserConstants"

import $ from 'reqwest'

export default class UserActions {

    static login(user) {
        var _message
        var _user = {}

        $({
            url: '/api/user/login',
            method: 'post',
            data: user
        })
        .then(function(res) {
            _user = JSON.parse(res.response)
            _message = "success"
        })
        .fail(function(xhr, textStatus, errorThrown) {
            _message = "fail"
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

        $({
            url: '/api/user',
            method: 'post',
            data: user
        })
        .then(function(res) {
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

        $({
            url: '/api/user/login',
            type: 'delete'
        })
        .then((res) => {
            message = 'logout success'
        })
        .fail((res) => {
            message = 'error'
        })
        .always(() => {
            AppDispatcher.dispatch({
                actionType: UserConstants.LOGOUT,
                message: message
            })
        })
    }

    static getUserDetails() {
        var _user

        $({
            url: '/api/me',
            method: 'get'
        })
        .then(function(res) {
            _user = JSON.parse(res.response)
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
