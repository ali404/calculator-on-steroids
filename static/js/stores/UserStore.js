import AppDispatcher from "../dispatcher/AppDispatcher"
import UserConstants from "../constants/UserConstants"
import FluxStore from './FluxStore'

class UserStore extends FluxStore {
    cosntructor() {
        this._username =  ""
        this._id =  ""
        this._functions =  []
        this._isLoggedIn =  false
        this._message =  ""
        this._loginState =  ""
        this._logoutState =  ""
        this._signupState =  ""
        this._signupMessage =  ""
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
        user = JSON.parse(user)
        console.log(user)
        this._id = user.id
        this._username = user.username
        this._functions = user.functions
        this._isLoggedIn = user.isLoggedIn
    }

    getLoginState() {
        return this._loginState
    }

    getLoginMessage() {
        return this._message
    }

    getSignupState() {
        return this._signupState
    }

    getSignupMessage() {
        return this._signupMessage
    }

    _sendSignupSuccessMessage() {
        this._signupMessage = "user signup up & logged in"
        this._signupState = "success"
    }

    _sendSignupErrorMessage() {
        this._signupMessage = "user failed to sign up"
        this._signupState = "fail"
    }

    _sendSuccessMessage() {
        this._message = "user logged in"
        this._loginState = "success"
    }

    _sendError() {
        this._message = "user failed to log in"
        this._loginState = "fail"
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
        this._message = ""
        this._loginState = ""
        this._logoutState = ""
        this._signupMessage = ""
    }

    _addFunction(func) {
        this._functions.push(func)
    }

    getFunctions() {
        return this._functions
    }

}

let userStore = new UserStore()

userStore.dispatchToken = AppDispatcher.register(payload => {
    let actionType = payload.actionType

    switch(actionType) {

        case UserConstants.LOGIN:
            if("success" === payload.data.message) {
                userStore._sendSuccessMessage()
                userStore._updateUserDetails(payload.data.user)
            }
            else if("fail" === payload.data.message) {
                userStore._sendErrorMessage()
            }
            userStore.emitChange()

            break

        case UserConstants.LOGOUT:
            if("logout success" === payload.message) {
                UserStore._logout()
                UserStore.emitChange()
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
            if( undefined === payload.user ) {
                return new Error()
            }
            else {
                userStore._updateUserDetails(payload.user)
                userStore.emitChange()
            }

            break

        case UserConstants.ADD_FUNCTION:
            userStore._addFunction(payload.func)
            userStore.emitChange()

            break
    }
})

export default userStore
