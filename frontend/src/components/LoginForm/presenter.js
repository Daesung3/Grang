import React from "react";
import PropTypes from "prop-types";
import FacebookLogin from "react-facebook-login";
import formStyles from "shared/formStyles.scss";

const LoginForm = (props, context) => (
    <div className={formStyles.formComponent}>
        <form className={formStyles.form} onSubmit={props.handleSubmit}>
            <input
                type="text"
                placeholder={context.t("Username")}
                className={formStyles.textInput}
                onChange={props.handleInputChange}
                name="username"
                value={props.usernameValue}
            />
            <input
                type="password"
                placeholder={context.t("Password")}
                className={formStyles.textInput}
                onChange={props.handleInputChange}
                name="password"
                value={props.passwordValue}
            />
            <input type="submit" value={context.t("Log in")} className={formStyles.button} />
        </form>
        <div className={formStyles.FacebookLogin}>
            <FacebookLogin
                appId="317296515746406"
                autoLoad={false}
                fields="name,email,picture"
                callback={props.handleFacebookLogin}
                cssClass={formStyles.facebookLink}
                icon="fa-facebook-official"
                textButton={context.t("페이스북으로 로그인")}
            />
        </div>
    </div>
        );
        
LoginForm.propTypes = {
        handleInputChange: PropTypes.func.isRequired,
        usernameValue: PropTypes.string.isRequired,
        passwordValue: PropTypes.string.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        handleFacebookLogin: PropTypes.func.isRequired
    };
    
LoginForm.contextTypes = {
            t: PropTypes.func.isRequired
    };
    
    export default LoginForm;
    
