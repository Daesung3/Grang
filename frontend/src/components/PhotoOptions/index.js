import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as photoActions } from "redux/modules/photos";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handlePencilClick: () => {
      dispatch(photoActions.photoModify(ownProps.photoId));
    },
    getDetail: () => {
      dispatch(photoActions.getDetail(ownProps.photoId));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Container);

// 컨테이너를 import하는 index는 컨테이너와 redux를 연결하는 역할을 한다.
