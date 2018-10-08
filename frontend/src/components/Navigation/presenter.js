import React from "react";
import Ionion from "react-ionicons";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./styles.scss";

const Navigation = (props, context) => (
    <div className={styles.navigation}>
        <div className={styles.inner}>
            <div className={styles.column}>
                <Link to="/">
                <img
                 src={require("images/logo.png")}
                 className={styles.logo}
                 alt={context.t("logo")}
                 />
                 </Link>
            </div>
            <div className={styles.column}>
                <input
                 type="text"
                 placeholder={context.t("Search")}
                 className={styles.searchInput}
                />
            </div>
            <div className={styles.column}>
                <div className={styles.navIcon}>
                    <Link to="/explore">
                        <Ionion icon="ios-compass-outline" fontSize="28px" color="black" />
                    </Link>
                </div>
                <div className={styles.navIcon}>
                        <Ionion icon="ios-heart-outline" fontSize="28px" color="black" />
                </div>
                <div className={styles.navIcon}>
                    <Link to="/profile">
                        <Ionion icon="ios-person-outline" fontSize="32px" color="black" />
                    </Link>
                </div>
            </div>
        </div>
        
    </div>
);




Navigation.contextTypes = {
    t: PropTypes.func.isRequired //context는 번역을 위한 것
}

export default Navigation;