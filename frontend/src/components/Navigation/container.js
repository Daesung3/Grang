import React, { Component } from "react";
import Navigation from "./presenter";

class Container extends Component {
    render() {
        return <Navigation onClickLogout={this.props.logouthandler}/>;
    }
}

export default Container;
