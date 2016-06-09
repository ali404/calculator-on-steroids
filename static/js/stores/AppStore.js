import AppDispatcher from "../dispatcher/AppDispatcher"
import AppConstants from "../constants/AppConstants"
import FluxStore from './FluxStore.js'

const CHANGE_EVENT = "change"

class AppStore extends FluxStore {

    constructor() {
        super()
        this._isNavigationExpanded = false
        this._navClass = 'nav-collapsed'
    }

    getAppState() {
        return {
            navClass: this._navClass,
            isNavigationExpanded: this._isNavigationExpanded
        }
    }

    changeNavigationState() {
        this._isNavigationExpanded = !this._isNavigationExpanded
        this._navClass = this._isNavigationExpanded ? 'nav-expanded' : 'nav-collapsed'
    }
}

let appStore = new AppStore()

appStore.dispatchToken = AppDispatcher.register(payload => {
    let actionType = payload.actionType

    switch(actionType) {
        case AppConstants.REVEAL_NAV:
            appStore.changeNavigationState()
            appStore.emitChange()

            break
    }
})

export default appStore
