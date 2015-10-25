import AppDispatcher from "../dispatcher/AppDispatcher"
import CalculatorConstants from "../constants/CalculatorConstants"

var CalculatorActions = {

    append: function(text) {
        AppDispatcher.dispatch({
            actionType: CalculatorConstants.CALCULATOR_APPEND,
            text: text
        })
    },

    deleteOnlyLast: function() {
        AppDispatcher.dispatch({
            actionType: CalculatorConstants.CALCULATOR_DELETE_LAST
        })
    }
}

module.exports = CalculatorActions
