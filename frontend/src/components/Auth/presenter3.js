import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import LoginForm from "components/LoginForm";
import SignupForm from "components/SignupForm";
import { Helmet } from "react-helmet";



const Auth = (props, context) => (
    <main className={styles.auth}>
        <div className={styles.column}>
            <img src={require("images/heart.png")} alt="Checkout our app. Is cool" />
        </div>
        <div className={styles.column}>
                <img src={require("images/logo.png")} alt="Logo" />
            <div className={`${styles.whiteBox} ${styles.formBox}`}>
                {props.action === "login" && <LoginForm />}
                {props.action === "signup" && <SignupForm />}
            </div>
            <div className={styles.whiteBox}>
                {props.action === "signup" && (
                    <p>
                        Have an account?{" "}
                        <span className={styles.changeLink} onClick={props.changeAction}>
                            Log in
            </span>
                    </p>
                )}
                {props.action === "login" && (
                    <p>
                        Don't have an account?{" "}
                        <span className={styles.changeLink} onClick={props.changeAction}>
                            Sign up
            </span>
                    </p>
                )}
            </div>
        </div>
    </main>
);

Auth.contextTypes = {
    t: PropTypes.func.isRequired
};

export default Auth;