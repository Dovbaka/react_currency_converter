import {currencyAPI} from "../api/api";

const SET_CURRENCY = 'TABLE/SET-CURRENCY';
const SET_CURRENCY_NAMES = 'TABLE/SET-CURRENCY-NAMES';
const SET_CURRENCY_BASE = 'TABLE/SET-CURRENCY-BASE';
const EDIT_CURRENCY = 'TABLE/EDIT-CURRENCY';
const ERROR = 'TABLE/ERROR'

let initialState = {
    currency: [],  //for array of currencies from response
    currencyNames: [], //for all currency names (including base)
    base: [], //for base_ccy (without duplicates)
    error: false //response error flag to display error message in component
}

function currencyReducer(state = initialState, action) {

    switch (action.type) {
        case SET_CURRENCY: {
            return {
                ...state,
                currency: action.currency
            }
        }

        case SET_CURRENCY_NAMES: {
            return {
                ...state,
                currencyNames: (state.currency.map(el => el.ccy).concat([state.base[0]]))
            }
        }

        case SET_CURRENCY_BASE: {
            return {
                ...state,
                base: [...new Set(state.currency.map(el => el.base_ccy))]
            }
        }

        case EDIT_CURRENCY: {
            return {
                ...state,
                currency: state.currency.map(value => {
                    if (value.id === action.id) {
                        if (action.collumName === "buy")
                            return {...value, buy: action.value}
                        if (action.collumName === "sale")
                            return {...value, sale: action.value}
                    }
                    return value;
                })
            }
        }

        case ERROR: {
            return {
                ...state,
                error: true
            }
        }


        default:
            return state;
    }
}

export const actions = {
    setCurrency: function (currency) {
        return {
            type: SET_CURRENCY,
            currency
        }
    },

    setCurrencyNames: function () {
        return {
            type: SET_CURRENCY_NAMES
        }
    },

    setCurrencyBase: function () {
        return {
            type: SET_CURRENCY_BASE
        }
    },

    setError: function () {
        return {
            type: ERROR
        }
    }
}

export function editCurrency(id, value, collumName) {
    return {
        type: EDIT_CURRENCY,
        id,
        value,
        collumName
    }
}

export const requestCurrency = (makeError) => async (dispatch) => {
    try {
        const response = await currencyAPI.getCurrency(makeError);
        response.data.forEach((item, i) => {
            item.id = i + 1;
        });
        dispatch(actions.setCurrency(response.data)); //setting currency arr
        dispatch(actions.setCurrencyBase()); //setting all base_ccy (UAH & USD)
        dispatch(actions.setCurrencyNames()); //setting all currency names
    } catch (error) {
        dispatch(actions.setError()); // setting error flag
    }

}

export default currencyReducer;