import {connect} from "react-redux";
import React from "react";
import CurrencyConverter from "./CurrencyConverter";
import {requestCurrency} from "../../redux/tableReducer";

class CurrencyTableContainer extends React.Component {
    render() {
        return <CurrencyConverter {...this.props}/>
    }
}

const mapStateToProps = (state) => {
    return {
        currency: state.currencyTable.currency,
        currencyNames: state.currencyTable.currencyNames,
        base: state.currencyTable.base[0],
        base2: state.currencyTable.base[1]
    }
};

export default connect(mapStateToProps, {requestCurrency})(CurrencyTableContainer)