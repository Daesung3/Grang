import React, { Component } from "react";
import ModifyPhoto from "./presenter";

class Container extends Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    // render이후에, props 또는 state가 바뀔 경우에, 작동함!
    // prevProps는 변화되기 이전의 값을 가지고 있고,
    // this.props는 현재 변화되기 위한 값을 가지고 있음
    if (prevProps.isFetching != this.props.isFetching) {
      this.props.getFeed();
      this.props.history.push("/");
    }
  }
  render() {
    const { getPhoto } = this.props.getDetails;
    const { postPhoto } = this.props;
    return (
      <ModifyPhoto
        getPhoto={this.props.getDetail}
        onSubmit={postPhoto}
        onClickModify={this.props.handleModifyClick}
      />
    );
  }
}

export default Container;
