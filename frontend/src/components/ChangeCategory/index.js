import { connect } from "react-redux";
import Container from "./container";
import { withRouter } from "react-router-dom";
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
        },
        changeCategory: category => { //카테고리를 받아서 리덕스의 changeCategory에 보냄!
            dispatch(userAction.changeCategory(category))
        }
    };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Container));
