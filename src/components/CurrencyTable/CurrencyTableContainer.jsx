import React from "react";
import {connect} from "react-redux";
import CurrencyTable from "./CurrencyTable";
import styles from "./CurrencyTable.module.css"
import {editCurrency, requestCurrency} from "../../redux/currencyReducer";


class CurrencyTableContainer extends React.Component {

    componentDidMount() {
        const localData = localStorage.getItem('Counter');
        let data = localData ? JSON.parse(localData) : 0;
        if (data >= 4) {
            data = 0;
            localStorage.setItem('Counter', JSON.stringify(data));
            this.props.requestCurrency("error"); //Simulating error
        }
        else {
            data++;
            localStorage.setItem('Counter', JSON.stringify(data));
            this.props.requestCurrency();
        }
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