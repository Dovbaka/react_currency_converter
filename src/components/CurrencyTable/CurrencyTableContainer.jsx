import React from "react";
import {connect} from "react-redux";
import CurrencyTable from "./CurrencyTable";
import styles from "./CurrencyTable.module.css"
import {editCurrency, requestCurrency} from "../../redux/currencyReducer";


class CurrencyTableContainer extends React.Component {

    componentDidMount() {
        this.props.requestCurrency();
    }


    render() {
        if (this.props.error === true) return <div className={styles.error}>
            <h2>Sorry, an error occupied :(</h2>
        </div>
        return <CurrencyTable {...this.props}/>
    }
}

const mapStateToProps = (state) => {
    return {
        currency: state.currencyBase.currency,
        error: state.currencyBase.error
    }
};

export default connect(mapStateToProps, {requestCurrency, editCurrency})(CurrencyTableContainer)