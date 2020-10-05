import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Provider} from "react-redux";
import store from "./redux/store";
import {Container} from "react-bootstrap";
import Header from "./components/Header/Header";
import CurrencyTableContainer from "./components/CurrencyTable/CurrencyTableContainer";
import CurrencyConverterContainer from "./components/CurrencyConverter/CurrencyConverterContainer";
import Footer from "./components/Footer/Footer";
import styles from "./App.module.css"

function App() {

    return (
        <div className={styles.wrapper}>
            <Provider store={store}>
                <Header/>
                <Container>
                    <CurrencyTableContainer/>
                    <CurrencyConverterContainer/>
                </Container>
                <Footer/>
            </Provider>
        </div>
    );
}

export default App;
