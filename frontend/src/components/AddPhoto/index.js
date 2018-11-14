import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as photoAction } from "redux/modules/photos";

//리덕스 스토어와 연결 와이? 사진을 추가하고, 카테고리를 넣을 것이기 때문.
const mapStateToProps = (state, ownProps) => {
  return {
    isFetching: state.photos.isFetching
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    postPhoto: formData => {
      dispatch(photoAction.postPhoto(formData));
    },
    getFeed: () => {
      dispatch(photoAction.getFeed());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
