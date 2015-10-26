import AppDispatcher from "../dispatcher/AppDispatcher"
import CalculatorConstants from "../constants/CalculatorConstants"

var CalculatorActions = {

    append: function(text) {
        AppDispatcher.dispatch({
            actionType: CalculatorConstants.APPEND,
            text: text
        })
    },

    changeText: function(text) {
        AppDispatcher.dispatch({
            actionType: CalculatorConstants.CHANGE_TEXT,
            text: text
        })
    },

    deleteOnlyLast: function() {
        AppDispatcher.dispatch({
            actionType: CalculatorConstants.DELETE_LAST
        })
    },

    addFunction: function(func) {
        AppDispatcher.dispatch({
            actionType: CalculatorConstants.ADD_FUNCTION,
            funcName: func.funcName,
            funcBody: func.funcBody,
        })
    }
}

module.exports = CalculatorActions
