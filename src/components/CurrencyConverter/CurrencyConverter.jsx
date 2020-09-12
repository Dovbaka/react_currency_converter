import React, {useEffect, useState} from "react";
import CurrencyInputField from "./CurrencyInputField/CurrencyInputField";
import styles from "./CurrencyConverter.module.css"
import swapIcon from "../../assets/images/swap.svg"

function CurrencyConverter(props) {

    const [fromCurrency, setFromCurrency] = useState();
    const [toCurrency, setToCurrency] = useState();
    let exchangeRate = 1;

    useEffect(() => {
        setFromCurrency(props.base);
        setToCurrency(props.currencyNames[0]);
    }, [props.currencyNames, props.base])

    useEffect(() => {
        onRateChange()
    }, [fromCurrency, toCurrency])

    const onRateChange = () => {
        if (fromCurrency === props.base) {
            props.currency.forEach(value => {
                if (toCurrency === value.ccy) {
                    exchangeRate = Number(1/value.buy);
                }
            })
        }

        if (toCurrency === props.base) {
            props.currency.forEach(value => {
                if (fromCurrency === value.ccy) {
                    exchangeRate = Number(value.buy);
                }
            })
        }
        props.currency.forEach(value => {
            props.currency.forEach(value2 => {
                if (toCurrency === value.ccy && fromCurrency === value2.ccy) {
                    exchangeRate = value2.buy / value.buy;
                }
            })
        })
        console.log(exchangeRate)
    }


    return <div className={styles.converter}>
        <CurrencyInputField currencyNames={props.currencyNames} selectedCurrency={fromCurrency}
                            onChangeCurrency={(e) => {
                                setFromCurrency(e.currentTarget.value);
                            }}/>

        <img src={swapIcon} className={styles.swapCurrencyIcon} alt={"swap"} onClick={onRateChange}/>

        <CurrencyInputField currencyNames={props.currencyNames} selectedCurrency={toCurrency}
                            onChangeCurrency={(e) => {
                                setToCurrency(e.currentTarget.value)
                            }}/>
    </div>
}

export default CurrencyConverter;