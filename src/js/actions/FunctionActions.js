import FunctionConstants from '../constants/FunctionConstants'
import AppDispatcher from '../dispatcher/AppDispatcher'

import $ from 'reqwest'

export default class FunctionActions {

    static addFunction(func) {
        let _func

        $({
            url: '/api/function',
            method: 'post',
            data: func
        })
        .then((res) => {
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
        .always(() => {
            AppDispatcher.dispatch({
                actionType: FunctionConstants.ADD_DATABASE_FUNCTION,
                functionName: func.functionName,
                functionBody: func.functionBody
            })
        })
    }

    static getFunctions() {
        let _functions

        $({
            url: '/api/functions',
            method: 'get'
        })
        .then((res) => {
            _functions = res
        })
        .fail((xhr, textStatus, errorThrown) => {

        })
        .always(() => {
            AppDispatcher.dispatch({
                actionType: FunctionConstants.GET_FUNCTIONS,
                functions: _functions
            })
        })
    }
}
