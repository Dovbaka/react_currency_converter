import React, {useEffect, useState} from "react";
import CurrencyInputField from "./CurrencyInputField/CurrencyInputField";
import styles from "./CurrencyConverter.module.css"
import swapIcon from "../../assets/images/swap.svg"

function CurrencyConverter(props) {

    const [fromCurrency, setFromCurrency] = useState(); //1st selector option value
    const [toCurrency, setToCurrency] = useState(); //2nd selector option value
    const [amount, setAmount] = useState(1); //input value
    const [amountInField, setAmountInField] = useState(true);//which field the User is using
    const [exchangeRate, setExchangeRate] = useState(1)//rate of selected currency
    let toAmount, fromAmount;

    if (amountInField) {
        fromAmount = amount
        const newAmount = amount * exchangeRate;
        newAmount % 1 !== 0 ? toAmount = Number(newAmount.toFixed(6)) : toAmount = newAmount

    } else {
        toAmount = amount
        const newAmount = amount / exchangeRate;
        newAmount % 1 !== 0 ? fromAmount = Number(newAmount.toFixed(6)) : fromAmount = newAmount
    }

    useEffect(() => { //Sets default selected options
        setFromCurrency(props.base);
        setToCurrency(props.currencyNames[0]);
    }, [props.currencyNames, props.base])

    useEffect(() => { //changes current exchangeRate on options change or table values
        onRateChange()
    }, [fromCurrency, toCurrency, props.currency])

    const onRateChange = () => {

        if (fromCurrency === props.base && toCurrency !== props.base) {//if just first option is UAH
            props.currency.forEach(value => {
                if (toCurrency === value.ccy) {
                    if (value.base_ccy === props.base) { ////if base_ccy of second option is UAH
                        setExchangeRate(Number(1 / value.buy))
                    } else {
                        props.currency.forEach(value2 => {
                            if (value2.ccy === props.base2) setExchangeRate(1 / (value.buy * value2.buy));
                        })
                    }
                }
            })
        }

        if (toCurrency === props.base && fromCurrency !== props.base) {//if just second option is UAH
            props.currency.forEach(value => {
                if (fromCurrency === value.ccy) {
                    if (value.base_ccy === props.base) { //if base_ccy of first option is UAH
                        setExchangeRate(Number(value.buy))
                    } else {
                        props.currency.forEach(value2 => { ////if base_ccy is USD
                            if (value2.ccy === props.base2) setExchangeRate(value.buy * value2.buy);
                        })
                    }
                }
            })
        }

        props.currency.forEach(value => {
            props.currency.forEach(value2 => {
                if (toCurrency === value.ccy && fromCurrency === value2.ccy) {
                    if (value.base_ccy === props.base && value2.base_ccy === props.base) { //if both base_ccy is UAH
                        setExchangeRate(value2.buy / value.buy);
                    } else {
                        if (value2.base_ccy !== props.base) { //if first option is BTC witch base is USD
                            props.currency.forEach(value3 => {
                                if (value3.ccy === props.base2) //convert (BTC/USD * USD/UAG) / OTHER_CCY/UAH
                                    setExchangeRate((value3.buy * value2.buy) / value.buy);
                            })
                        }
                        if (value.base_ccy !== props.base) { //if second option is BTC witch base is USD
                            props.currency.forEach(value3 => {
                                if (value3.ccy === props.base2)
                                    setExchangeRate(1 / ((value3.buy * value.buy) / value2.buy));
                            })
                        }
                    }
                }
            })
        })

        if (fromCurrency === toCurrency) {
            setExchangeRate(1)
        }
    }

    function handleFromAmountChange(e) {
        setAmount(e.target.value)
        setAmountInField(true)
    }

    function handleToAmountChange(e) {
        setAmount(e.target.value)
        setAmountInField(false)
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