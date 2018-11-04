import React, { Component } from "react";
import Auth from "./presenter";

class Container extends Component {
    state = {
        action: null
    };
    render() {
        const { action } = this.state;
        return <Auth action={action} changeAction={this._changeAction} signupAction={this._singupAction} loginAction={this._loginAction}/>
    }
    _changeAction = () => {
        this.setState(prevState => {
            const { action } = prevState;
            if(action ==="login"){
                return {
                    action: "signup"
                };
            } else if(action ==="signup"){
                return {
                    action: "login"
                };
            }
        });
    };

    _loginAction = () => {
        this.setState({action: "login"})
        }

    _singupAction = () => {
        this.setState({action: "signup"})
    }
}

export default Container;