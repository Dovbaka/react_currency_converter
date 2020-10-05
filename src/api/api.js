import * as axios from "axios"

export const instance = axios.create({
    baseURL: 'https://api.privatbank.ua/p24api/',
});

export const currencyAPI = {
    getCurrency() {
        return instance.get(`pubinfo?json&exchange&coursid=5`);
    },
}