import {applyMiddleware, combineReducers, createStore} from "redux";
import currencyReducer from "./currencyReducer";
import thunkMiddleware from "redux-thunk"

let reducers = combineReducers({
    currencyBase: currencyReducer
})

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;