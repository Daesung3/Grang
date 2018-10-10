import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as userActions } from "redux/modules/user";

const mapDispatchToProps = (dispatch, ownProps) => {
    const { user } = ownProps
    return {
      handleClick: () => {
          if(user.subscribe){
            dispatch(userActions.unsubsribeUser(user.id))
          }
          else {
            dispatch(userActions.subsribeUser(user.id))
          }
      }
    };
  };

export default connect(null, mapDispatchToProps)(Container);