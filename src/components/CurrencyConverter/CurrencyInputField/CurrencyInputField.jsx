import React from 'react';
import styles from '../CurrencyConverter.module.css';
import {Form} from "react-bootstrap";

function CurrencyInputField(props) {

    return (
        <div>
            <input type="number" className={styles.currencyInputField}/>
            <Form.Group className={styles.group}>

                <Form.Control as="select" className={styles.dropDown} value={props.selectedCurrency}
                              onChange={props.onChangeCurrency}>
                    {props.currencyNames.map((el, index) => (
                        <option key={index} value={el}>{el}</option>
                    ))}
                </Form.Control>
            </Form.Group>
        </div>
    )
}

//<Form.Label className={styles.labels}>Example select</Form.Label>

export default CurrencyInputField;