import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as userActions } from "redux/modules/user";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getPhotoLikes: () => {
      dispatch(userActions.getPhotoLikes(ownProps.id));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Container);
// export default connect(리덕스스테이트를 프롭으로 가져온다 , 액션을 프롭으로 가져온다 )(연결할 컨테이너);
// Key가 프롭의 이름이 되고, Value가 프롭의 값이 된다.
//<Container getPhotoLikes={()=>{dispatch(userActions.getPhotoLikes(ownProps.id))} />
