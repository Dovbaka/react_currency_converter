import {currencyAPI} from "../api/api";

const SET_CURRENCY = 'TABLE/SET-CURRENCY';
const SET_CURRENCY_NAMES = 'TABLE/SET-CURRENCY-NAMES';
const EDIT_CURRENCY = 'TABLE/EDIT-CURRENCY';

let initialState = {
    currency: [],
    currencyNames: [],
    base: "UAH"
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
                currencyNames: state.currency.map(el => el.ccy).concat([state.base])
            }
        }

        case EDIT_CURRENCY:
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
}

export function editCurrency(id, value, collumName) {
    return {
        type: EDIT_CURRENCY,
        id,
        value,
        collumName
    }
}

export const requestCurrency = () => async (dispatch) => {
    const response = await currencyAPI.getCurrency();
    response.data.forEach((item, i) => {
        item.id = i + 1;
    });
    dispatch(actions.setCurrency(response.data));
    dispatch(actions.setCurrencyNames());
}

export default tableReducer;