import React from "react";
import FacebookLogin from "react-facebook-login";
import PropTypes from "prop-types";
import formStyles from "shared/formStyles.scss";

const SignupForm = (props, context) => (
    <div className={formStyles.formComponent}>
        <FacebookLogin
                appId="317296515746406"
                autoLoad={false}
                fields="name,email,picture"
                callback={props.handleFacebookLogin}
                cssClass={formStyles.facebookLink}
                icon="fa-facebook-official"
                textButton={context.t("페이스북으로 시작하기")}
            />
        <span className={formStyles.divider}>or</span>
        <form className={formStyles.form} onSubmit={props.handleSubmit}>
            <input
                type="email"
                placeholder={context.t("Email")}
                className={formStyles.textInput}
                value={props.emailValue}
                onChange={props.handleInputChange}
                name="email"
            />
            <input
                type="text"
                placeholder={context.t("Full Name")}
                className={formStyles.textInput}
                value={props.nameValue}
                onChange={props.handleInputChange}
                name="name"
            />
            <input
                type="username"
                placeholder={context.t("Username")}
                className={formStyles.textInput}
                value={props.usernameValue}
                onChange={props.handleInputChange}
                name="username"
            />
            <input
                type="password"
                placeholder={context.t("Password")}
                className={formStyles.textInput}
                value={props.passwordValue}
                onChange={props.handleInputChange}
                name="password"
            />
            <input 
                type="submit" 
                value={context.t("Sign up")} 
                className={formStyles.button} 
                onChange={props.handleInputChange}
                />
        </form>
        <p className={formStyles.policy}>
            {context.t("가입하면 우리 이용 약관 및 개인 정보 보호 정책에 동의하는 것입니다.")}
        </p>
    </div>
);
SignupForm.propTypes = {
    emailValue: PropTypes.string.isRequired,
    nameValue: PropTypes.string.isRequired,
    usernameValue: PropTypes.string.isRequired,
    passwordValue: PropTypes.string.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleFacebookLogin: PropTypes.func.isRequired
};

SignupForm.contextTypes = {
    t: PropTypes.func.isRequired
};

export default SignupForm;