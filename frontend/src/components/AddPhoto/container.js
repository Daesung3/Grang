import React, { Component } from "react";
import AddPhoto from "./presenter";

class Container extends Component {
  render() {
    const { postPhoto } = this.props;
    return (
      <AddPhoto onSubmit={postPhoto}/>
    );
  }
}

export default Container;
