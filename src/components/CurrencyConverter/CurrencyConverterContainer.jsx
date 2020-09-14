import {connect} from "react-redux";
import React from "react";
import CurrencyConverter from "./CurrencyConverter";
import {requestCurrency} from "../../redux/currencyReducer";

class CurrencyTableContainer extends React.Component {
    render() {
        return <CurrencyConverter {...this.props}/>
    }
}

const mapStateToProps = (state) => {
    return {
        currency: state.currencyBase.currency,
        currencyNames: state.currencyBase.currencyNames,
        base: state.currencyBase.base[0], //main base_ccy (UAH)
        base2: state.currencyBase.base[1] //second base_cct (USD)
    }
};

export default connect(mapStateToProps, {requestCurrency})(CurrencyTableContainer)