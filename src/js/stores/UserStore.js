import AppDispatcher from "../dispatcher/AppDispatcher"
import UserConstants from "../constants/UserConstants"
import FluxStore from './FluxStore'

class UserStore extends FluxStore {
    constructor() {
        super()

        this._username =  ''
        this._id =  ''
        this._functions =  []
        this._isLoggedIn =  false

        // init with undefined because false and true are valid states
        this._isLoginSuccessful = undefined
        this._logoutState =  ''

        this._isSignupSuccessful = undefined
    }

    getUserDetails() {
        return {
            username: this._username,
            id: this._id,
            functions: this._functions,
            isLoggedIn: this._isLoggedIn
        }
    }

    _updateUserDetails(user) {
        if(user) {
            this._id = user.id
            this._username = user.username
            this._functions = user.functions
            this._isLoggedIn = user.isLoggedIn
        }
        else {
            this._id = ''
            this._username = ''
            this._isLoggedIn = false
        }
    }

    getLoginState() {
        return this._isLoginSuccessful
    }

    deleteLoginState() {
        this._isLoginSuccessful = undefined
    }

    getSignupState() {
        return this._isSignupSuccessful
    }

    deleteSignupState() {
        this._isSignupSuccessful = undefined
    }

    _sendSignupSuccessMessage() {
        this._isSignupSuccessful = true
    }

    _sendSignupErrorMessage() {
        this._isSignupSuccessful = false
    }

    _sendSuccessMessage() {
        this._isLoginSuccessful = true
    }

    _sendErrorMessage() {
        this._isLoginSuccessful = false
    }

    isLoggedIn() {
        return this._isLoggedIn
    }

    _logout() {
        this._username = ""
        this._id = ""
        this._isLoggedIn = false
        this._functions = []
        this._signupState = ""

        this._isLoginSuccessful = undefined
        this._isSignupSuccessful = undefined

        this._logoutState = ""
    }

    validateUsername(username) {
        return !(/\W+/g.test(username))
    }

    validatePassword(password) {
        return !(/\W+/g.test(password))
    }
}

let userStore = new UserStore()

userStore.dispatchToken = AppDispatcher.register(payload => {
    let actionType = payload.actionType

    switch(actionType) {

        case UserConstants.LOGIN:
            if("success" === payload.message) {
                userStore._sendSuccessMessage()
                userStore._updateUserDetails(payload.user)
            }
            else if("fail" === payload.message) {
                userStore._sendErrorMessage()
            }
            userStore.emitChange()

            break

        case UserConstants.LOGOUT:
            if("logout success" === payload.message) {
                userStore._logout()
                userStore.emitChange()
            }
            else {
                console.log("logout failed")
            }

            break

        case UserConstants.SIGNUP:
            if("success" === payload.message) {
                userStore._sendSignupSuccessMessage()
            }
            else if("fail" === payload.message) {
                userStore._sendSignupErrorMessage()
            }
            userStore.emitChange()

            break

        case UserConstants.GET:
            userStore._updateUserDetails(payload.user)
            userStore.emitChange()

            break
    }
})

export default userStore
