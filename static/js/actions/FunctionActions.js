import FunctionConstants from '../constants/FunctionConstants'
import AppDispatcher from '../dispatcher/AppDispatcher'

import $ from 'jquery'

export default class FunctionActions {

    static addFunction(func) {
        let _func

        $.post('/api/function', func)
            .done((res) => {
                console.log(res)
                _func = res
            })
            .fail((xhr, textStatus, errorThrown) => {
                console.log(func)
                AppDispatcher.dispatch({
                    actionType: FunctionConstants.ADD_LOCAL_FUNCTION,
                    functionName: func.functionName,
                    functionBody: func.functionBody
                })
            })
            .then(() => {
                console.log(_func)
                AppDispatcher.dispatch({
                    actionType: FunctionConstants.ADD_DATABASE_FUNCTION,
                    functionName: func.functionName,
                    functionBody: func.functionBody
                })
            })
    }

    static getFunctions() {
        let _functions

        $.get('/api/functions')
            .done((res) => {
                console.log(res)
                _functions = res
            })
            .fail((xhr, textStatus, errorThrown) => {

            })
            .then(() => {
                AppDispatcher.dispatch({
                    actionType: FunctionConstants.GET_FUNCTIONS,
                    functions: _functions
                })
            })
    }
}
