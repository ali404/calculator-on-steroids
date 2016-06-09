import AppDispatcher from "../dispatcher/AppDispatcher"
import CalculatorConstants from "../constants/CalculatorConstants"

export default class CalculatorActions {

    static append(text) {
        AppDispatcher.dispatch({
            actionType: CalculatorConstants.APPEND,
            text: text
        })
    }

    static changeText(text) {
        AppDispatcher.dispatch({
            actionType: CalculatorConstants.CHANGE_TEXT,
            text: text
        })
    }

    static deleteOnlyLast() {
        AppDispatcher.dispatch({
            actionType: CalculatorConstants.DELETE_LAST
        })
    }

    static addFunction(func) {
        AppDispatcher.dispatch({
            actionType: CalculatorConstants.ADD_FUNCTION,
            funcName: func.funcName,
            funcBody: func.funcBody,
        })
    }

    static resizeCalculator() {
        AppDispatcher.dispatch({
            actionType: CalculatorConstants.RESIZE
        })
    }
}
