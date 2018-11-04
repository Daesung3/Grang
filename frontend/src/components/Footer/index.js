import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";

const Footer = (props, context) => (
    <footer className={styles.footer}>
        <div className={styles.column}>
            <span className={styles.copyright}>ⓒ 2018 Computer Science's Senior Project Yongin University </span>
        </div>
        <div className={styles.column}>
            <span className={styles.product}>KIM DAESUNG / JEONG JIHYEOK / HYEON YUJIN / PARK HANSU</span>
        </div>
    </footer>
);

Footer.contextTypes = {
    t: PropTypes.func.isRequired
}

export default Footer;