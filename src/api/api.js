import * as axios from "axios"

export const instance = axios.create({
    baseURL: 'https://api.privatbank.ua/p24api/',
});

export const currencyAPI = {
    getCurrency(makeError = "") {
        return instance.get(`pub${makeError}info?json&exchange&coursid=5`);
    },
}