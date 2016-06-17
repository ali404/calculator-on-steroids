import FunctionConstants from '../constants/FunctionConstants'
import AppDispatcher from '../dispatcher/AppDispatcher'

import $ from 'reqwest'

export default class FunctionActions {

    static addFunction(func) {
        let _func

        $({
            url: '/api/function',
            method: 'POST',
            data: func
        })
        .then((res) => {
            _func = JSON.parse(res.response)

            if(_func.length == 0) {
                AppDispatcher.dispatch({
                    actionType: FunctionConstants.ADD_LOCAL_FUNCTION,
                    functionName: func.functionName,
                    functionBody: func.functionBody
                })
            }
            else {
                AppDispatcher.dispatch({
                    actionType: FunctionConstants.ADD_DATABASE_FUNCTION,
                    functionName: _func.functionName,
                    functionBody: _func.functionBody
                })
            }
        })
        .fail((xhr, textStatus, errorThrown) => {
            console.log("error")
        })
    }

    static getFunctions() {
        let _functions

        $({
            url: '/api/functions',
            method: 'GET'
        })
        .then((res) => {
            _functions = JSON.parse(res.response)
            AppDispatcher.dispatch({
                actionType: FunctionConstants.GET_FUNCTIONS,
                functions: _functions
            })
        })
        .fail((xhr, textStatus, errorThrown) => {
            console.log("error")
        })
        .always(() => {})
    }
}
