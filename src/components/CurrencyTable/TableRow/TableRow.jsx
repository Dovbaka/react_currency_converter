import React from "react";
//import styles from "../CurrencyTable.module.css"
import EditableTd from "./EditableTd/EditableTd";

function TableRow({id, ccy, base_ccy, buy, sale, editCurrency}) {

    return <tr>
        <td>{ccy + " / " + base_ccy}</td>
        <EditableTd id={id} value={buy} collumName={"buy"} editCurrency={editCurrency}/>
        <EditableTd id={id} value={sale} collumName={"sale"} editCurrency={editCurrency}/>
    </tr>
}

export default TableRow;