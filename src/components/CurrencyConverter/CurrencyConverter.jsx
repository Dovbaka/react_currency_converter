import React, {useEffect, useState} from "react";
import CurrencyInputField from "./CurrencyInputField/CurrencyInputField";
import styles from "./CurrencyConverter.module.css"
import swapIcon from "../../assets/images/swap.svg"

function CurrencyConverter(props) {

    const [fromCurrency, setFromCurrency] = useState();
    const [toCurrency, setToCurrency] = useState();
    const [amount, setAmount] = useState(1);
    const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
    const [exchangeRate, setExchangeRate] = useState(1)
    let toAmount, fromAmount;

    if (amountInFromCurrency) {
        fromAmount = amount
        const newAmount = amount * exchangeRate;
        newAmount % 1 !== 0 ? toAmount = Number(newAmount.toFixed(6)) : toAmount = newAmount

    } else {
        toAmount = amount
        const newAmount = amount / exchangeRate;
        newAmount % 1 !== 0 ? fromAmount = Number(newAmount.toFixed(6)) : fromAmount = newAmount
    }

    useEffect(() => {
        setFromCurrency(props.base);
        setToCurrency(props.currencyNames[0]);
    }, [props.currencyNames, props.base])

    useEffect(() => {
        onRateChange()
    }, [fromCurrency, toCurrency, props.currency])

    const onRateChange = () => {

        if (fromCurrency === toCurrency) {
            setExchangeRate(1)
        }

        if (fromCurrency === props.base && toCurrency !== props.base) {
            props.currency.forEach(value => {
                if (toCurrency === value.ccy) {
                    if (value.base_ccy === props.base) {
                        setExchangeRate(Number(1 / value.buy))
                    } else {
                        props.currency.forEach(value2 => {
                            if(value2.ccy === props.base2) setExchangeRate(1/(value.buy*value2.buy));
                        })
                    }
                }
            })
        }

        if (toCurrency === props.base && fromCurrency !== props.base) {
            props.currency.forEach(value => {
                if (fromCurrency === value.ccy) {
                    if (value.base_ccy === props.base) {
                        setExchangeRate(Number(value.buy))
                    } else {
                        props.currency.forEach(value2 => {
                            if(value2.ccy === props.base2) setExchangeRate(value.buy*value2.buy);
                        })
                    }
                }
            })
        }

        props.currency.forEach(value => {
            props.currency.forEach(value2 => {
                if (toCurrency === value.ccy && fromCurrency === value2.ccy) {
                    if (value.base_ccy === props.base && value2.base_ccy === props.base) {
                        setExchangeRate(value2.buy / value.buy);
                    } else {
                        if (value2.base_ccy !== props.base) {
                            props.currency.forEach(value3 => {
                                if(value3.ccy === props.base2)
                                    setExchangeRate((value3.buy*value2.buy)/value.buy);
                            })
                        }
                        if (value.base_ccy !== props.base) {
                            props.currency.forEach(value3 => {
                                if(value3.ccy === props.base2) //console.log("v1 ", value.buy, "v2 ", value2.buy, "v3 ", value3.buy)
                                    setExchangeRate(1/((value3.buy*value.buy)/value2.buy));
                            })
                        }
                    }
                }
            })
        })
    }

    function handleFromAmountChange(e) {
        setAmount(e.target.value)
        setAmountInFromCurrency(true)
    }

    function handleToAmountChange(e) {
        setAmount(e.target.value)
        setAmountInFromCurrency(false)
    }

    function onSwapCurrencyClick() {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    }


    return <div className={styles.converter}>
        <CurrencyInputField currencyNames={props.currencyNames}
                            selectedCurrency={fromCurrency}
                            amount={fromAmount}
                            onChangeAmount={handleFromAmountChange}
                            onChangeCurrency={(e) => {
                                setFromCurrency(e.currentTarget.value);
                            }}/>

        <img src={swapIcon} className={styles.swapCurrencyIcon} alt={"swap"} onClick={onSwapCurrencyClick}/>

        <CurrencyInputField currencyNames={props.currencyNames}
                            selectedCurrency={toCurrency}
                            amount={toAmount}
                            onChangeAmount={handleToAmountChange}
                            onChangeCurrency={(e) => {
                                setToCurrency(e.currentTarget.value)
                            }}/>
    </div>
}

export default CurrencyConverter;