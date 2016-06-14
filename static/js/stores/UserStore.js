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
        this._message =  ''
        this._loginState =  ''
        this._logoutState =  ''
        this._signupState =  ''
        this._signupMessage =  ''
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
            user = JSON.parse(user)
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
        return this._loginState
    }

    getLoginMessage() {
        return this._message
    }

    deleteLoginMessage() {
        this._message = ''
    }

    getSignupState() {
        return this._signupState
    }

    getSignupMessage() {
        return this._signupMessage
    }

    deleteSignupMessage() {
        this._signupMessage = ''
    }

    _sendSignupSuccessMessage() {
        this._signupMessage = "Account created!"
        this._signupState = "success"
    }

    _sendSignupErrorMessage() {
        this._signupMessage = "Something went wrong. Please create account again"
        this._signupState = "fail"
    }

    _sendSuccessMessage() {
        this._message = "User logged in"
        this._loginState = "success"
    }

    _sendErrorMessage() {
        this._message = "Something went wrong, please login again."
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
        console.log("something went wrong")
        this._functions.push(func)
        console.log(this._functions)
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
