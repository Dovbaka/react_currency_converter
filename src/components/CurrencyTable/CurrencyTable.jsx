import {Table} from "react-bootstrap";
import React from "react";
import TableRow from "./TableRow/TableRow.jsx";
import styles from "./CurrencyTable.module.css"

function CurrencyTable(props) {

    let TableItems = props.currency.map((el) => (<TableRow key={el.id} id={el.id} editCurrency={props.editCurrency}
                                                                  ccy={el.ccy} base_ccy={el.base_ccy}
                                                                  buy={el.buy} sale={el.sale}/>));

    return <Table bordered variant="dark" className={styles.table}>
        <thead>
        <tr>
            <th>Currency/Current Date</th>
            <th>Buy</th>
            <th>Sell</th>
        </tr>
        </thead>
        <tbody>
        {TableItems}
        </tbody>
    </Table>
}

export default CurrencyTable;