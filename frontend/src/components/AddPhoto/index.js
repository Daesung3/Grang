import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as photoAction } from "redux/modules/photos";

//리덕스 스토어와 연결 와이? 사진을 추가하고, 카테고리를 넣을 것이기 때문.

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        postPhoto: formData => {
            dispatch(photoAction.postPhoto(formData))
        }
    };
};


export default connect(null, mapDispatchToProps)(Container);
