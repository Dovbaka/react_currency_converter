import {currencyAPI} from "../api/api";

const SET_CURRENCY = 'TABLE/SET-CURRENCY';
const SET_CURRENCY_NAMES = 'TABLE/SET-CURRENCY-NAMES';
const SET_CURRENCY_BASE = 'TABLE/SET-CURRENCY-BASE';
const EDIT_CURRENCY = 'TABLE/EDIT-CURRENCY';

let initialState = {
    currency: [],
    currencyNames: [],
    base: [],
    error: false
}

function tableReducer(state = initialState, action) {

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

        case "err": {
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
    setCurrency: function setCurrency(currency) {
        return {
            type: SET_CURRENCY,
            currency
        }
    },

    setCurrencyNames: function setCurrencyNames() {
        return {
            type: SET_CURRENCY_NAMES
        }
    },

    setCurrencyBase: function setCurrencyBase() {
        return {
            type: SET_CURRENCY_BASE
        }
    },

    setError: function () {
        return {
            type: "err"
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
        dispatch(actions.setCurrency(response.data));
        dispatch(actions.setCurrencyBase());
        dispatch(actions.setCurrencyNames());
    } catch (error) {
        console.log(error);
        dispatch(actions.setError());
    }

}

export default tableReducer;