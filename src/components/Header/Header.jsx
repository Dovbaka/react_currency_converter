import {Navbar} from "react-bootstrap";
import React from "react";
import styles from "./Header.module.css"

function Header() {
    return (
        <div className="header">
            <Navbar className={styles.navBar} variant="dark">
                <Navbar.Brand>Text Logo</Navbar.Brand>
            </Navbar>
        </div>
    );
}

export default Header;
