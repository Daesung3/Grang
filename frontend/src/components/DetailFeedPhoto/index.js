import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as photoActions } from "redux/modules/photos";

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getDetail: () => { //getDetail함수를 부를떄마다 getDetail(photo.js의)를 디스패치함.
            dispatch(photoActions.getDetail(ownProps.photoId));
        }
    }
}

export default connect(null, mapDispatchToProps)(Container);