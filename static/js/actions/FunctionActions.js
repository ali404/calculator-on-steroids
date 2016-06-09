import FunctionConstants from '../constants/FunctionConstants'
import AppDispatcher from '../dispatcher/AppDispatcher'

export default class FunctionActions {

    static addFunction(func) {
        AppDispatcher.dispatch({
            actionType: FunctionConstants.ADD_FUNCTION,
            functionName: func.functionName,
            functionBody: func.functionBody
        })
    }
}
