import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import LoginForm from "components/LoginForm";
import SignupForm from "components/SignupForm";

const auth = (props, context) => (
  <main className={styles.auth}>
    <div className={styles.background} />
    <img id={styles.logo} src={require("images/logo.png")} alt="Logo" />
    <ul className={styles.scrollNavi}>
      <li>
        <button onClick={props.signupAction}>시작하기</button>
      </li>
      <li>
        <button onClick={props.loginAction}>로그인</button>
      </li>
    </ul>
    <div className={`${styles.whiteBox} ${styles.formBox}`}>
      {props.action === "login" && <LoginForm />}
      {props.action === "signup" && <SignupForm />}
    </div>
    <div className={styles.intro}>
      <h2>그랑은 사람들과 동그랗게 어울려 살려는 순 우리말입니다.</h2>
    </div>
  </main>
);

auth.contexttypes = {
  t: PropTypes.func.isrequired
};

export default auth;
