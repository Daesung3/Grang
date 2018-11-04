import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as userAction } from "redux/modules/user"; 

const mapStateToProps = (state, ownProps) => {
    return {
        category : state.user.category
    };
  };

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getCategory: () => {
            dispatch(userAction.getCategory())
        }
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Container);
