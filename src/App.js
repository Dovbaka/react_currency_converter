import React from 'react';
//import styles from "./App.module.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from "./components/Header/Header";
import CurrencyTableContainer from "./components/CurrencyTable/CurrencyTableContainer";
import store from "./redux/store";
import {Provider} from "react-redux";
import {Container} from "react-bootstrap";

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <Header/>
                <Container>
                    <CurrencyTableContainer/>
                </Container>
            </Provider>
        </div>
    );
}

export default App;
