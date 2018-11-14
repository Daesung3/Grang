import React, { Component } from "react";
import FeedPhoto from "./presenter";

class Container extends Component {
  state = {
    seeingLikes: false
  };
  render() {
    console.log(this.state);
    console.log(this.props);
    return (
      <FeedPhoto
        {...this.props}
        {...this.state}
        openLikes={this._openLikes}
        closeLikes={this._closeLikes}
        openDetail={this._openDetail}
        closeDetail={this._closeDetail}
      />
    );
  }
  _openLikes = () => {
    const { getPhotoLikes } = this.props;
    this.setState({
      seeingLikes: true
    });
    getPhotoLikes();
  };
  _closeLikes = () => {
    this.setState({
      seeingLikes: false
    });
  };
}

export default Container;
