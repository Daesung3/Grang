import React, { Component } from "react";
import PhotoOptions from "./presenter";

class Container extends Component {
  render() {
    return (
      <PhotoOptions
        onClickDelete={this.props.handlePencilClick}
        getDetail={this.props.getDetail}
      />
    );
  }
}

export default Container;

// props가 필요한가 ? - Component 클래스 생성
// state로 충분한가 ? - const 함수 생성
// 수정의 경우 이전의 내용을 가져와야 하기 때문에 class 생성
// 근데 왜 PhotoActions 컨테이너에선 props를 사용했지? const인데 ?
