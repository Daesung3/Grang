import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import LoginForm from "components/LoginForm";
import SignupForm from "components/SignupForm";

const auth = (props, context) => (
    <main className={styles.auth}>
        <img id={styles.logo} src={require("images/logo.png")} alt="Logo" />
        <ul className={styles.scrollNavi}>
            <li><span><em>grang</em></span></li>
            <li><span onClick={props.signupAction}><em>start</em></span></li>
            <li><span onClick={props.loginAction}><em>login</em></span></li>
        </ul>
        <div className={`${styles.whiteBox} ${styles.formBox}`}>
                {props.action === "login" && <LoginForm />}
                {props.action === "signup" && <SignupForm />}
        </div>
        <div className={styles.intro}>
            <img id={styles.heart} src={require("images/heart.png")} alt="checkout our app. is cool" />
            <h2>그랑은 사람들과 동그랗게 어울려 살려는 순 우리말입니다.</h2>
        </div>
        <figure className={styles.time}>
            <p>
                <span>00</span> : <span>00</span> : <span>00</span>
            </p>
        </figure>
        {/* <section> */}
           {/*  <article className={styles.start}>
                <h2>그랑 시작하기</h2>
                {props.action === "signup" && <signupform />}
                {props.action === "login" && <loginform />}
            </article>
            <div className={styles.whitebox}>
                {props.action === "signup" && (
                    <p>
                        have an account?{" "}
                        <span className={styles.changelink} onclick={props.changeaction}>
                            log in
                        </span>
                    </p>
                )}
                {props.action === "login" && (
                    <p>
                        don't have an account?{" "}
                        <span className={styles.changelink} onclick={props.changeaction}>
                            sign up
                        </span>
                    </p>
                    </div>
                )}
             */}
       {/*  </section> */}
    </main>
        );
     
auth.contexttypes = {
            t: PropTypes.func.isrequired
    };
    
export default auth;