import {applyMiddleware, combineReducers, createStore} from "redux";
import tableReducer from "./tableReducer";
import thunkMiddleware from "redux-thunk"

let reducers = combineReducers({
    currencyTable: tableReducer
})

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;