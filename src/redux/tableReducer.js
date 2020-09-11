import {currencyAPI} from "../api/api";

const CURRENCY_REQUEST = 'TABLE/CURRENCY-REQUEST';
const EDIT = 'EDIT'

let initialState = {
    currency: []
}

function tableReducer(state = initialState, action) {

    switch (action.type) {
        case CURRENCY_REQUEST: {
            return {
                ...state,
                currency: action.currency
            }
        }

        case EDIT:
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
            type: CURRENCY_REQUEST,
            currency
        }
    },
}

export function editCurrency(id, value, collumName) {
    return {
        type: EDIT,
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
    console.log(response); //LOG
    dispatch(actions.setCurrency(response.data));
}

export default tableReducer;