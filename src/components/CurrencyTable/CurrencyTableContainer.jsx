import React from "react";
import {connect} from "react-redux";
import CurrencyTable from "./CurrencyTable";
import {editCurrency, requestCurrency} from "../../redux/tableReducer";


class CurrencyTableContainer extends React.Component {

    componentDidMount() {
        this.props.requestCurrency();
    }

    render() {
        return <CurrencyTable {...this.props}/>
    }
}

const mapStateToProps = (state) => {
    return {
        currency: state.currencyTable.currency,
    }
};

export default connect(mapStateToProps, {requestCurrency, editCurrency})(CurrencyTableContainer)