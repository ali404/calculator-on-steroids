import React from "react"
import {EventEmitter} from "events"
import assign from "object-assign"
import AppDispatcher from "../dispatcher/AppDispatcher"
import AppConstants from "../constants/AppConstants"

const CHANGE_EVENT = "change"

var AppStore = assign({}, EventEmitter.prototype, {

    _isNavigationExpanded: false,
    _navClass: "nav-collapsed",

    getAppState: function() {
        return {
            isNavigationExpanded: this._isNavigationExpanded,
            navClass: this._navClass
        }
    },

    changeNavigationState: function() {
        if(this._isNavigationExpanded) {
            this._navClass = "nav-collapsed"
        }
        else {
            this._navClass = "nav-expanded"
        }
        this._isNavigationExpanded = !this._isNavigationExpanded
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
    switch (action.actionType) {
        case AppConstants.REVEAL_NAV:
                AppStore.changeNavigationState()
                AppStore.emitChange()
            break;

    }
})

module.exports = AppStore
