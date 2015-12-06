import AppDispatcher from "../dispatcher/AppDispatcher"
import AppConstants from "../constants/AppConstants"

export default class AppActions {
    static changeNavigationState() {
        AppDispatcher.dispatch({
            actionType: AppConstants.REVEAL_NAV
        })
    }
}
